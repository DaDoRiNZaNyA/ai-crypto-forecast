import { userRepository } from "../repositories/user";

export const resetPassword = async (email: string) => {
  return await userRepository.resetPassword(email);
};
