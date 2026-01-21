'use server';

import { SignupFormSchema, FormState, FieldErrors } from '@/app/lib/definitons';
import bcrypt from 'bcrypt';
import clientPromise from '@/app/lib/mongodb';
import { redirect } from 'next/navigation';
import { sendResetEmail } from "@/app/lib/email";
import crypto from 'crypto';
import { createSession, getSession } from '../session'; // ← make sure you export getSession too
import { getUsersCollection } from '../db.server';

// ── SIGNUP ────────────────────────────────────────────────
export async function signup(state: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const client = await clientPromise;
  const db = client.db();
  const users =  await getUsersCollection();

  const existingUser = await users.findOne({ email });
  if (existingUser) {
    return {
      errors: { email: ['Email already in use'] }
    };
  }

  // Insert and get result in one step
  const result = await users.insertOne({
    name,
    email,
    password: hashedPassword,
    passwordResetTokenHash: null,
    passwordResetExpiresAt: null,
    createdAt: new Date()
  });

  const userId = result.insertedId.toString();

  await createSession(userId);

  // Important: go to dashboard, not signin!
  redirect('/auth/signin');
}

// ── SIGNIN ────────────────────────────────────────────────
export async function signin(state: FormState, formData: FormData) {
  const email = formData.get('email')?.toString() || '';
  const password = formData.get('password')?.toString() || '';

  const errors: FieldErrors = {};

  if (!email) errors.email = ['Email is required'];
  if (!password) errors.password = ['Password is required'];

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const client = await clientPromise;
  const db = client.db();
  const users = await getUsersCollection();

  const user = await users.findOne({ email });
  if (!user) {
    return { errors: { email: ['No account found with this email'] } };
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    return { errors: { password: ['Incorrect password'] } };
  }

  // ← This was missing!
  const userId = user._id.toString();
  await createSession(userId);

  redirect('/dashboard');
}

// ── PASSWORD RESET (looks mostly fine, minor cleanup) ─────
export async function resetPasswordLink(state: FormState, formData: FormData) {
  const email = formData.get('email')?.toString() || '';

  const errors: FieldErrors = {};
  if (!email) errors.email = ['Email is required'];

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const client = await clientPromise;
  const db = client.db();
  const users =  await getUsersCollection();

  const user = await users.findOne({ email });
  if (!user) {
    return { errors: { email: ['No account found with this email'] } };
  }

  const token = crypto.randomBytes(32).toString('hex');
  const tokenHash = await bcrypt.hash(token, 10);

  await users.updateOne(
    { _id: user._id },
    {
      $set: {
        passwordResetTokenHash: tokenHash,
        passwordResetExpiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 min
      },
    }
  );

  const resetLink = `${process.env.APP_URL}/auth/reset-password?token=${token}`;

  await sendResetEmail(user.email, resetLink);

  return { success: true, message: 'Reset link sent to your email' };
}