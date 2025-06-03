import { Left, Right } from "@/shared/lib/sse/either";
import { Message } from "@prisma/client";

export type CreateMessageData = {
  asset: string;
  question: string;
  answer: string;
  userId: string;
};

export type GetMessagesParams = {
  userId?: string;
  asset?: string;
  question?: string;
  answer?: string;
  limit?: number;
  sort?: "asc" | "desc";
};

export type SendMessageErrors = {
  unauthorized?: string;
};

export type SendMessageResult =
  | Left<{ errors: SendMessageErrors }>
  | Right<Message>;
