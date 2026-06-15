"use server";

import bcrypt from "bcrypt";
import crypto from "crypto";
import { redirect } from "next/navigation";
import clientPromise from "@/lib/db/mongodb";
import { sendResetEmail } from "@/lib/services/mailer";
import { createSession } from "@/lib/auth/session";
import { getUsersCollection } from "@/lib/db/server";
import { SignupFormSchema } from "@/lib/validation/auth";
import { AuthFormState, FieldErrors } from "../types";

// ── SIGNUP ────────────────────────────────────────────────
export async function signup(state: AuthFormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors as FieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const users = await getUsersCollection();

  const existingUser = await users.findOne({ email });
  if (existingUser) {
    return {
      errors: { email: ["Email already in use"] },
    };
  }

  const result = await users.insertOne({
    name,
    email,
    password: hashedPassword,
    passwordResetTokenHash: null,
    passwordResetExpiresAt: null,
    createdAt: new Date(),
  });

  const userId = result.insertedId.toString();

  await createSession(userId);

  // Redirect to signin after successful signup (or dashboard directly)
  redirect("/auth/signin");
}

// ── SIGNIN ────────────────────────────────────────────────
export async function signin(state: AuthFormState, formData: FormData) {
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  const errors: FieldErrors = {};

  if (!email) errors.email = ["Email is required"];
  if (!password) errors.password = ["Password is required"];

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const users = await getUsersCollection();

  const user = await users.findOne({ email });
  if (!user) {
    return { errors: { email: ["No account found with this email"] } };
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    return { errors: { password: ["Incorrect password"] } };
  }

  const userId = user._id.toString();
  await createSession(userId);

  redirect("/dashboard");
}

// ── PASSWORD RESET ─────
export async function resetPasswordLink(
  state: AuthFormState,
  formData: FormData,
) {
  const email = formData.get("email")?.toString() || "";

  const errors: FieldErrors = {};
  if (!email) errors.email = ["Email is required"];

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const users = await getUsersCollection();

  const user = await users.findOne({ email });
  if (!user) {
    return { errors: { email: ["No account found with this email"] } };
  }

  const token = crypto.randomBytes(32).toString("hex");
  const tokenHash = await bcrypt.hash(token, 10);

  await users.updateOne(
    { _id: user._id },
    {
      $set: {
        passwordResetTokenHash: tokenHash,
        passwordResetExpiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 min
      },
    },
  );

  const resetLink = `${process.env.APP_URL}/auth/reset-password?token=${token}`;

  await sendResetEmail(user.email, resetLink);

  return { success: true, message: "Reset link sent to your email" };
}
