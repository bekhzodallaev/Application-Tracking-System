'use server';


import { FieldErrors, FormState } from '@/app/lib/definitons';
import clientPromise from '@/app/lib/mongodb';
import { redirect } from "next/navigation";
import bcrypt  from 'bcrypt';


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