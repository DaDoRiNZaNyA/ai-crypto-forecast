"use client";

import Link from "next/link";
import { AuthFormLayout } from "../ui/auth-form-layout";
import { RegisterFormFields } from "../ui/register-form-fields";
import { routes } from "@/kernel/routes";

export const RegisterForm = () => {
  return (
    <AuthFormLayout
      title="Register"
      description="Create an account"
      link={
        <Link href={routes.signIn()} className="underline text-blue-700">
          Sign in
        </Link>
      }
      form={<RegisterFormFields />}
    />
  );
};
