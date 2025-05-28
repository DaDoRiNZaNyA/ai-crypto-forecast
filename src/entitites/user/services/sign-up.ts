import { left, right } from "@/shared/lib/sse/either";
import { userRepository } from "../repositories/user";

export const signUp = async (email: string, password: string) => {
  const { user, error } = await userRepository.signUp(email, password);

  if (user) {
    return right(user);
  }

  return left({ error });
};
