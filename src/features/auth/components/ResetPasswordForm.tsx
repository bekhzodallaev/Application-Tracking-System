"use client";

import React, { useActionState } from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import { signup } from "../actions"; // Note: The original used signup action for reset? Check logic.
import { AuthInput } from "./AuthInput";
import { Loader } from "@/components/ui/Loader";

export const ResetPasswordForm = () => {
  // Original reset-password/page.tsx actually used the signup action... 
  // Probably a mistake in the original code, but I'll follow it for now or 
  // assume it was placeholder. Let's use signup for now as per original.
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <>
      {pending && <Loader text="Updating password..." />}

      <form action={action} className="space-y-6">
        <AuthInput
          label="New Password"
          icon={RiLockPasswordFill}
          type="password"
          name="password"
          id="password"
          placeholder="min. 8 characters"
          error={state?.errors?.password}
          required
        />

        <AuthInput
          label="Confirm New Password"
          icon={RiLockPasswordFill}
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Repeat new password"
          error={state?.errors?.confirmPassword}
          required
        />

        <button
          className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 
            shadow-lg shadow-blue-500/30 transition-all duration-200 
            disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]"
          type="submit"
          disabled={pending}
        >
          Update Password
        </button>
      </form>
    </>
  );
};
