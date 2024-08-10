"use client";

import { useState, useEffect, useRef } from "react";
import ChatHeader, { gptModels } from "@/components/ChatHeader";
import ChatInput from "@/components/ChatInput";
import ChatStatus from "@/components/ChatStatus";
import useThread from "@/hooks/useThread";
import LeftSheet from "@/components/LeftSheet";
import { ScrollArea } from "@/components/ui/scroll-area"
import { useUserContext } from "@/context/UserContext"
import { useChat } from "@/context/ChatContext";
import { useThreadContext } from "@/context/ThreadContext";

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  const scrollViewportRef = useRef<HTMLDivElement | null>(null);
  
  const { user, threadsState } = useUserContext();
  const { first_name, last_name } = user ?? {};
  const { threads } = threadsState;
  
  const { threadId, setThreadId } = useThreadContext();
  
  const { state, dispatch } = useChat();
  const { messages } = state;

  const [processing, setProcessing] = useState<boolean>(false)
  const [gptModel, setGptModel] = useState<string>(gptModels[0])

  const { clearThread, sendMessage } = useThread(setProcessing, threadId, setThreadId, dispatch);
  
  const scrollToBottom = () => {
    if (scrollViewportRef.current) {
      setTimeout(() => {
        scrollViewportRef.current?.scrollIntoView({ block: "end", behavior: 'smooth' });
      }, 500);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  return (
    <main className="flex min-h-screen w-full">
      <LeftSheet 
        firstName={first_name!}
        lastName={last_name!}
        threads={threads}
        clearThread={clearThread}
        disabled={!threadId}
      />
      
      <section className=" text-white-1 w-full md:mx-auto h-screen flex flex-col">
        <ChatHeader setGptModel={setGptModel} />

        <ScrollArea className="h-screen w-full">
          <div ref={scrollViewportRef} className="flex w-[800px] mx-auto flex-col grow pb-4">
            {children}
          </div>
        </ScrollArea>

        {processing && <ChatStatus />}
        <ChatInput 
          onSend={async (message) => {
            const newMessage = { content: message, role: "user", created_at: Date.now() }
            dispatch({ type: 'addMessage', payload: newMessage });
            await sendMessage(message, gptModel)
            scrollToBottom()
          }}
          disabled={processing}
        />
      </section>
    </main>
  );
}
