import { userRepository } from "../repositories/user";

export const updateUser = async ({
  email,
  password,
}: {
  email: string;
  password?: string;
}) => {
  return await userRepository.updateUser({ email, password });
};
