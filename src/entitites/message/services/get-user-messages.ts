"use server";

import { getCurrentUser } from "@/entitites/user/server";
import { getMessages } from "./get-messages";
import { Message } from "@prisma/client";

export const getUserMessages = async (asset: string): Promise<Message[]> => {
  const currentUser = await getCurrentUser();

  if (currentUser.type === "left") throw Error("Unauthorized");

  const messages = await getMessages({ userId: currentUser.value.id, asset });
  return messages;
};
