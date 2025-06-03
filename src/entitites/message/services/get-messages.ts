"use server";

import { messageRepository } from "../repositories/message";
import { GetMessagesParams } from "../types";

export const getMessages = async (params: GetMessagesParams) => {
  return await messageRepository.getMessages(params);
};
