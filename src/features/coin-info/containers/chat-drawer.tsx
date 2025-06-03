"use client";
import { AiChat } from "@/features/chat";
import { useChatMessages } from "@/features/chat/hooks/use-chat-messages";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";
import { MessageSquare, X } from "lucide-react";
import { useState } from "react";

export const ChatDrawer = ({ asset }: { asset: string }) => {
  const [isOpened, setIsOpened] = useState(false);
  const {
    data: messageHistory,
    isLoading,
    isError,
  } = useChatMessages({ asset });

  return (
    <Drawer direction="right">
      <DrawerTrigger
        className={
          "fixed bottom-8 right-8 z-10 cursor-pointer hover:scale-110 transition-transform  bg-purple-400 p-2 rounded-xl " +
          (isOpened ? "" : "animate-bounce")
        }
        onClick={() => setIsOpened(true)}
      >
        <MessageSquare size={40} color="white" />
      </DrawerTrigger>
      <DrawerContent className="lg:w-1/2 w-full h-screen">
        <DrawerHeader>
          <DrawerTitle className="flex flex-row items-center justify-between">
            AI Chat
            <DrawerClose className="cursor-pointer">
              <X />
            </DrawerClose>
          </DrawerTitle>
        </DrawerHeader>
        <AiChat
          asset={asset}
          isError={isError}
          isLoading={isLoading}
          messageHistory={messageHistory}
        />
      </DrawerContent>
    </Drawer>
  );
};
