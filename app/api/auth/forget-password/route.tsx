'use server'

import { FormState, FieldErrors } from "@/app/lib/definitons"
import clientPromise from '@/app/lib/mongodb';
import { sendResetEmail } from "@/app/lib/email";
import crypto from 'crypto';
import bcrypt from 'bcrypt';


export async function POST(state: FormState, formData: FormData){
    
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

  const resetLink = `${process.env.APP_URL}/reset-password?token=${token}`;

  await sendResetEmail(user.email, resetLink);
  
    console.log("Email sent");
  return {
    success: true,
  };
}
    