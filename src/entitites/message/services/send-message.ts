"use server";
import { getCurrentUser } from "@/entitites/user/server";
import { left, right } from "@/shared/lib/sse/either";
import { getMessages } from "./get-messages";
import {
  getCryptocompareCoinInfo,
  getCryptocompareHistory,
} from "@/entitites/cryptocompare/server";
import { generateContent } from "@/entitites/ai/server";
import { ChatMessage } from "@/entitites/ai/types";
import { createMessage } from "./create-message";
import { SendMessageResult } from "../types";

export const sendMessage = async ({
  question,
  asset,
}: {
  question: string;
  asset: string;
}): Promise<SendMessageResult> => {
  const currentUser = await getCurrentUser();

  if (currentUser.type === "left")
    return left({ errors: { unauthorized: "Unathorized" } });

  const [messages, info, history] = await Promise.allSettled([
    getMessages({
      userId: currentUser.value.id,
      asset,
      limit: 10,
    }),
    getCryptocompareCoinInfo({ asset, currency: "USD" }),
    getCryptocompareHistory({ asset, currency: "USD", limit: 24 }),
  ]);

  const historyText =
    history.status === "fulfilled"
      ? history.value
          .map(
            (item) =>
              `Time: ${item.time.toISOString()}, Closing Price: ${item.price.toFixed(
                2
              )}`
          )
          .join("\n")
      : "";

  const generalInfoText =
    info.status === "fulfilled"
      ? JSON.stringify(info.value.DISPLAY[asset]?.USD, null, 2)
      : "";

  const messagesHistory: ChatMessage[] =
    messages.status === "fulfilled"
      ? messages.value.reverse().flatMap((item) => [
          {
            role: "user",
            parts: [{ text: item.question }],
          },
          {
            role: "model",
            parts: [{ text: item.answer }],
          },
        ])
      : [];

  const prompt = `
You are a professional financial analyst specializing in cryptocurrency markets. Provide clear, factual, and unbiased answers to user questions about the cryptocurrency ${asset.toUpperCase()}. Explain complex concepts simply when needed.
You have access to the following data about ${asset.toUpperCase()}:
General Information:
${generalInfoText}
Price History for the last 24 hours:
${historyText}
Use the provided data to answer the user's questions as accurately as possible. If the information is insufficient to answer, clearly state that and avoid guessing.
Provide answers in a concise and structured manner. Use bullet points if applicable.
User question: "${question}"
      `;

  const answer = await generateContent(prompt, messagesHistory);

  const createdMessage = await createMessage({
    asset,
    question,
    answer,
    userId: currentUser.value.id,
  });

  return right(createdMessage);
};
