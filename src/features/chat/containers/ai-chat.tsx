"use client";

import { Chat } from "@/shared/components/ui/chat";
import { useChat } from "../hooks/use-chat";
import { Message as PrismaMessage } from "@prisma/client";
import Link from "next/link";
import { routes } from "@/kernel/routes";

export const AiChat = ({
  asset,
  isError,
  isLoading,
  messageHistory,
}: {
  asset: string;
  isError: boolean;
  isLoading: boolean;
  messageHistory?: PrismaMessage[];
}) => {
  const { messages, input, handleInputChange, sendMessage, loading } = useChat({
    messageHistory,
    asset,
  });
  return isError ? (
    <div className="flex items-center justify-center h-full w-full text-xl font-semibold">
      <Link href={routes.signIn()} className="underline text-blue-700 mr-1">
        Login
      </Link>{" "}
      to access the chat
    </div>
  ) : (
    <Chat
      className="max-h-[calc(100dvh-(--spacing(16)))] h-full"
      messages={messages}
      input={input}
      handleInputChange={handleInputChange}
      handleSubmit={sendMessage}
      isGenerating={loading || isLoading}
    />
  );
};
