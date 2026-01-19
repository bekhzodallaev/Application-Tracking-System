'use server';

import { SignupFormSchema, FormState, FieldErrors } from '@/app/lib/definitons'
import bcrypt from 'bcrypt';
import clientPromise from '@/app/lib/mongodb';
import { redirect } from 'next/navigation';
import { sendResetEmail } from "@/app/lib/email";
import crypto from 'crypto';


export async function signup(state: FormState, formData: FormData) {
    
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
     password: formData.get('password'),
    confirmPassword:formData.get('confirmPassword'),
  })
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
    
    const { name, email, password } = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 10);
  
    const client = await clientPromise
    const db = client.db()
    const users = db.collection('users')
        
    const existingUser = await users.findOne({ email });

    if (existingUser) {
        return {
            errors: {email: ['Email already in use']}
        }
    }

    
    await users.insertOne({
        name,
        email,
      password: hashedPassword,
     passwordResetTokenHash: null,
     passwordResetExpiresAt: null,
     createdAt: new Date()
    })

    redirect('/signin');

 
}

export async function signin(state: FormState, formData: FormData) {
    
    const email = formData.get('email')?.toString() || '';
    const password = formData.get('password')?.toString() || '';
    
    const errors: FieldErrors = {};

    if (!email) errors.email = ['Email is required'];
    if (!password) errors.password = ['Password is required'];

    if (Object.keys(errors).length) {
        return { errors };
    }
     
  const client = await clientPromise
  const db = client.db()
  const users = db.collection('users')

  const user = await users.findOne({ email })
  if (!user) {
    return { errors: { email: ['No account found with this email'] } }
  }

  const passwordMatches = await bcrypt.compare(password, user.password)
  if (!passwordMatches) {
    return { errors: { password: ['Incorrect password'] } }
  }

  redirect('/dashboard') // or wherever
}

export async function resetPasswordLink(state: FormState, formData: FormData){
    
    const email = formData.get('email')?.toString() || '';

      const errors: FieldErrors = {};
   
       if (!email) errors.email = ['Email is required'];
   
       if (Object.keys(errors).length) {
           return { errors };
       }
        
     const client = await clientPromise
     const db = client.db()
     const users = db.collection('users')
   
     const user = await users.findOne({ email })
     if (!user) {
       return { errors: { email: ['No account found with this email'] } }
     }
    
    const token = crypto.randomBytes(32).toString('hex');

    const tokenHash = await bcrypt.hash(token, 10);

     await users.updateOne(
    { _id: user._id },
    {
      $set: {
        passwordResetTokenHash: tokenHash,
        passwordResetExpiresAt: new Date(Date.now() + 15 * 60 * 1000),
      },
    }
  );

  const resetLink = `${process.env.APP_URL}/auth/reset-password?token=${token}`;

  await sendResetEmail(user.email, resetLink);
  
    console.log("Email sent");
  return {
    success: true,
  };
}
