"use server";

import { sendMessage } from "@/entitites/message/server";

export const sendMessageAction = async ({
  message,
  asset,
}: {
  message: string;
  asset: string;
}) => {
  const createdMessage = await sendMessage({ question: message, asset });

  if (createdMessage.type === "left") return "Error";
  return createdMessage.value.answer;
};
