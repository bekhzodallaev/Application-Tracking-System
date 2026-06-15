"use client";

import React, { useActionState } from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import Link from "next/link";
import { signin } from "../actions";
import { AuthInput } from "./AuthInput";
import { SocialAuth } from "./SocialAuth";
import { Loader } from "@/components/ui/Loader";

export const SignInForm = () => {
  const [state, action, pending] = useActionState(signin, undefined);

  return (
    <>
      {pending && <Loader text="Logging in..." />}

      <form action={action} className="space-y-5">
        <AuthInput
          label="Email"
          icon={MdEmail}
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          error={state?.errors?.email}
          required
        />

        <div className="space-y-1">
          <div className="flex items-center justify-between px-1">
            <span />
            <Link
              href="/auth/forget-password"
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <AuthInput
            label="Password"
            icon={RiLockPasswordFill}
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            error={state?.errors?.password}
            required
          />
        </div>

        <button
          className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 
            shadow-lg shadow-blue-500/30 transition-all duration-200 
            disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99] mt-2"
          type="submit"
          disabled={pending}
        >
          Sign In
        </button>

        <SocialAuth label="sign in" />

        <p className="text-center text-sm text-gray-600 pt-2">
          Don't have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-blue-600 hover:text-blue-800 font-bold"
          >
            Create an account
          </Link>
        </p>
      </form>
    </>
  );
};
