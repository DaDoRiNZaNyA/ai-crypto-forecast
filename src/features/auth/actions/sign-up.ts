"use server";
import { signUp } from "@/entitites/user/server";
import { routes } from "@/kernel/routes";
import { redirect } from "next/navigation";

export const signUpAction = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const createdUser = await signUp(email, password);

  if (createdUser.type === "right") {
    redirect(routes.signIn());
  }

  return { error: createdUser.error };
};
