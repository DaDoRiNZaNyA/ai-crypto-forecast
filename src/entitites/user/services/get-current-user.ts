import { left, right } from "@/shared/lib/sse/either";
import { userRepository } from "../repositories/user";

export const getCurrentUser = async () => {
  const supabaseUser = await userRepository.getCurrentUser();

  if (supabaseUser?.email) {
    const user = await userRepository.findUserByEmail(supabaseUser.email);

    return right(user);
  }

  return left({ error: "Unauthorized" });
};
