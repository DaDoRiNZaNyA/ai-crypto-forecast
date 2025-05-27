import { left, right } from "@/shared/lib/sse/either";
import { userRepository } from "../repositories/user";

export const signIn = async (email: string, password: string) => {
  const supabaseUser = await userRepository.signIn(email, password);

  if (supabaseUser.user?.email) {
    const user = await userRepository.findUserByEmail(supabaseUser.user.email);
    return right(user);
  }

  return left({ error: supabaseUser.error });
};
