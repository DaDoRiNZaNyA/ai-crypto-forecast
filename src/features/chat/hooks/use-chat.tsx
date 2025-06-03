import { useState, ChangeEvent, useEffect } from "react";
import { Message } from "@/shared/components/ui/chat-message";
import { Message as PrismaMessage } from "@prisma/client";
import { sendMessageAction } from "../actions/send-message-action";
import { useQueryClient } from "@tanstack/react-query";

export function useChat({
  messageHistory,
  asset,
}: {
  messageHistory?: PrismaMessage[];
  asset: string;
}) {
  const queryClient = useQueryClient();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (messageHistory) {
      setMessages(
        messageHistory
          .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
          .flatMap((msg) => [
            {
              id: msg.id + "user",
              role: "user",
              content: msg.question,
              createdAt: new Date(msg.createdAt),
            },
            {
              id: msg.id + "assistant",
              role: "assistant",
              content: msg.answer,
              createdAt: new Date(msg.createdAt),
            },
          ])
      );
    }
  }, [messageHistory]);

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    setLoading(true);

    const newMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
      createdAt: new Date(),
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInput("");

    (async () => {
      try {
        const response = await sendMessageAction({
          message: newMessage.content,
          asset,
        });

        const botMessage: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: response,
          createdAt: new Date(),
        };

        setMessages((prev) => [...prev, botMessage]);
        queryClient.setQueryData(
          ["chat-messages", asset],
          [
            ...(messageHistory ?? []),
            {
              question: newMessage.content,
              answer: response,
              id: crypto.randomUUID(),
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ].reverse()
        );
      } catch (error) {
        console.error("Ошибка отправки сообщения:", error);
      } finally {
        setLoading(false);
      }
    })();
  };

  return {
    messages,
    input,
    loading,
    handleInputChange,
    sendMessage,
  };
}
