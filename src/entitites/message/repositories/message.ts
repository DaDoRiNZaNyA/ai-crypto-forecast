import { prisma } from "@/shared/lib/sse/db";
import { Prisma } from "@prisma/client";
import { CreateMessageData, GetMessagesParams } from "../types";

const createMessage = async (data: CreateMessageData) => {
  return prisma.message.create({
    data,
  });
};

const getMessages = async (params: GetMessagesParams) => {
  const { userId, asset, question, answer, limit = 20, sort = "desc" } = params;

  const where: Prisma.MessageWhereInput = {
    ...(userId && { userId }),
    ...(asset && {
      asset: {
        equals: asset,
      },
    }),
    ...(question && {
      question: {
        contains: question,
        mode: "insensitive",
      },
    }),
    ...(answer && {
      answer: {
        contains: answer,
        mode: "insensitive",
      },
    }),
  };

  return prisma.message.findMany({
    where,
    orderBy: {
      createdAt: sort,
    },
    take: limit,
  });
};

export const messageRepository = { createMessage, getMessages };
