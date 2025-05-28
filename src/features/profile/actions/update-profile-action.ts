"use server";
import { updateUser } from "@/entitites/user/server";

export const updateProfileAction = async ({
  email,
  password,
}: {
  email: string;
  password?: string;
}) => {
  return await updateUser({ email, password });
};
