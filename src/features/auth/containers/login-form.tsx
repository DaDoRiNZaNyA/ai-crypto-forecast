"use client";

import Link from "next/link";
import { AuthFormLayout } from "../ui/auth-form-layout";
import { LoginFormFields } from "../ui/login-form-fields";
import { routes } from "@/kernel/routes";

export const LoginForm = () => {
  return (
    <AuthFormLayout
      title="Login"
      description=""
      link={
        <div className="flex flex-row w-full justify-between">
          <Link href={routes.signUp()} className="underline text-blue-700">
            Sign up
          </Link>
          <Link
            href={routes.forgotPassword()}
            className="underline text-blue-700"
          >
            Forgot password
          </Link>
        </div>
      }
      form={<LoginFormFields />}
    />
  );
};
