"use server";
// import { redirect } from "next/navigation";
import { userRepository } from "../repositories/user";

export const logout = async () => {
  await userRepository.logout();
  //   redirect("/");
};
