"use server";
import { resetPassword } from "@/entitites/user/server";

export const resetPasswordAction = async (email: string) => {
  const { data, error } = await resetPassword(email);

  return { data, error };
};
