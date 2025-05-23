import { left, right } from "@/shared/lib/sse/either";
import { userRepository } from "../repositories/user";

export const signUp = async (email: string, password: string) => {
  const existingUser = await userRepository.findUserByEmail(email);

  if (existingUser) {
    return left({ error: "User already exists" });
  }

  const supabaseUser = await userRepository.signUp(email, password);

  if (supabaseUser.user) {
    const user = await userRepository.createUser(supabaseUser.user);
    return right(user);
  }

  return left({ error: supabaseUser.error });
};
