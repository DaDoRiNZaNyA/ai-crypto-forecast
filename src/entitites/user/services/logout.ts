"use server";
import { userRepository } from "../repositories/user";

export const logout = async () => {
  await userRepository.logout();
};
