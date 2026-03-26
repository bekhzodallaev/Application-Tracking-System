"use client";

import React, { useActionState } from "react";
import { MdEmail } from "react-icons/md";
import Link from "next/link";
import { resetPasswordLink } from "../actions";
import { AuthInput } from "./AuthInput";
import { Loader } from "@/components/ui/Loader";

export const ForgotPasswordForm = () => {
  const [state, action, pending] = useActionState(resetPasswordLink, undefined);

  if (state?.success) {
    return (
      <div className="text-center space-y-6">
        <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-900">Email Sent!</h3>
          <p className="text-gray-600">
            Check your inbox for instructions to reset your password.
          </p>
        </div>
        <Link
          href="/auth/signin"
          className="block w-full rounded-xl border border-gray-200 py-3.5 text-gray-700 font-bold hover:bg-gray-50 transition-colors"
        >
          Back to Login
        </Link>
      </div>
    );
  }

  return (
    <>
      {pending && <Loader text="Sending reset link..." />}

      <form action={action} className="space-y-6">
        <AuthInput
          label="Email Address"
          icon={MdEmail}
          type="email"
          name="email"
          id="email"
          placeholder="example@email.com"
          error={state?.errors?.email}
          required
        />

        <button
          className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 
            shadow-lg shadow-blue-500/30 transition-all duration-200 
            disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]"
          type="submit"
          disabled={pending}
        >
          Send Reset Link
        </button>

        <div className="text-center">
          <Link
            href="/auth/signin"
            className="text-sm text-blue-600 hover:text-blue-800 font-bold transition-colors"
          >
            ← Back to Login
          </Link>
        </div>
      </form>
    </>
  );
};
