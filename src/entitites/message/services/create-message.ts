"use server";

import { messageRepository } from "../repositories/message";
import { CreateMessageData } from "../types";

export const createMessage = async (data: CreateMessageData) => {
  return await messageRepository.createMessage(data);
};
