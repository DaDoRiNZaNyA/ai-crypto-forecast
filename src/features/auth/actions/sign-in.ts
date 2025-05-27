"use server";
import { signIn } from "@/entitites/user/server";
import { routes } from "@/kernel/routes";
import { redirect } from "next/navigation";

export const signInAction = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await signIn(email, password);
  if (user.type === "right") {
    redirect(routes.home());
  }

  return { error: user.error };
};
