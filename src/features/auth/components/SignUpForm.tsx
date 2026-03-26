"use client";

import React, { useActionState } from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { signup } from "../actions";
import { AuthInput } from "./AuthInput";
import { SocialAuth } from "./SocialAuth";
import { Loader } from "@/components/ui/Loader";

export const SignUpForm = () => {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <>
      {pending && <Loader text="Creating account..." />}

      <form action={action} className="space-y-4">
        <AuthInput
          label="Full Name"
          icon={FaUser}
          type="text"
          name="name"
          id="name"
          placeholder="Enter your full name"
          error={state?.errors?.name}
          required
        />

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

        <AuthInput
          label="Password"
          icon={RiLockPasswordFill}
          type="password"
          name="password"
          id="password"
          placeholder="Create a password"
          error={state?.errors?.password}
          required
        />

        <AuthInput
          label="Confirm Password"
          icon={RiLockPasswordFill}
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Repeat your password"
          error={state?.errors?.confirmPassword}
          required
        />

        <div className="pt-2">
          <button
            className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 
              shadow-lg shadow-blue-500/30 transition-all duration-200 
              disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]"
            type="submit"
            disabled={pending}
          >
            Create Account
          </button>
        </div>

        <SocialAuth label="sign up" />

        <p className="text-center text-sm text-gray-600 pt-2">
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="text-blue-600 hover:text-blue-800 font-bold"
          >
            Sign In
          </Link>
        </p>
      </form>
    </>
  );
};
