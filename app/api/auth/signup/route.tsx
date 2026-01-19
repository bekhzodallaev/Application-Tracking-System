'use server';

import { SignupFormSchema, FormState } from '@/app/lib/definitons'
import bcrypt from 'bcrypt';
import clientPromise from '@/app/lib/mongodb';
import { redirect } from 'next/navigation';

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