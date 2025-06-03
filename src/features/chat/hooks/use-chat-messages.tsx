import { getUserMessages } from "@/entitites/message/server";
import { useQuery } from "@tanstack/react-query";

export const useChatMessages = ({ asset }: { asset: string }) => {
  return useQuery({
    queryKey: ["chat-messages", asset],
    queryFn: async () => getUserMessages(asset),
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 0,
  });
};
