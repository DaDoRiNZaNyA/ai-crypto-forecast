import { left, right } from "@/shared/lib/sse/either";
import { userRepository } from "../repositories/user";

export const getCurrentUser = async () => {
  const user = await userRepository.getCurrentUser();
  if (user) {
    return right(user);
  }

  return left({ error: "Unauthorized" });
};
