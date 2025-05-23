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
        <Link href={routes.signUp()} className="underline text-blue-700">
          Sign up
        </Link>
      }
      form={<LoginFormFields />}
    />
  );
};
