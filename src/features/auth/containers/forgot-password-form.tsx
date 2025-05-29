"use client";

import Link from "next/link";
import { AuthFormLayout } from "../ui/auth-form-layout";
import { routes } from "@/kernel/routes";
import { ForgotPasswordFormFields } from "../ui/forgot-password-form-fields";

export const ForgotPasswordForm = () => {
  return (
    <AuthFormLayout
      title="Forgot password"
      description=""
      link={
        <Link href={routes.signIn()} className="underline text-blue-700">
          Sign in
        </Link>
      }
      form={<ForgotPasswordFormFields />}
    />
  );
};
