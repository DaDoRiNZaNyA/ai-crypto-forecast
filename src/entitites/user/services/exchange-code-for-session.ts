import { userRepository } from "../repositories/user";

export const exchangeCodeForSession = async (code: string) => {
  return await userRepository.exchangeCodeForSession(code);
};
