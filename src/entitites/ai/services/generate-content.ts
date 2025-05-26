"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatMessage } from "../types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

export async function generateContent(
  prompt: string,
  history: ChatMessage[] = []
) {
  const chat = model.startChat({
    history: [...history],
  });

  const response = await chat.sendMessage(prompt);
  return response.response.text();
}
