"use client";

import { useState, useEffect, useRef, useContext } from "react";
import ChatHeader, { gptModels } from "@/components/ChatHeader";
import ChatInput from "@/components/ChatInput";
import ChatStatus from "@/components/ChatStatus";
import useThread from "@/hooks/useThread";
import LeftSheet from "@/components/LeftSheet";
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserContext } from "@/context/UserContext"
import { useRouter } from "next/navigation";
import { useChat } from "@/context/ChatContext";

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  const router = useRouter();
  const { user } = useContext(UserContext) ?? {};
  const { first_name, last_name, threads } = user ?? {};
  const scrollViewportRef = useRef<HTMLDivElement | null>(null);

  const [processing, setProcessing] = useState<boolean>(false)
  const [threadId, setThreadId] = useState<string>('') 
  const [gptModel, setGptModel] = useState<string>(gptModels[0])

  const { state, dispatch } = useChat();
  const { messages } = state;
  
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

  useEffect(() => {
    if (threadId && threadId !== '' && threadId !== 'undefined') {
      router.push(`/chat/${threadId}`)
    }``
  }, [threadId, router])
  
  return (
    <main className="flex min-h-screen w-full">
      <LeftSheet 
        firstName={first_name!}
        lastName={last_name!}
        threads={threads ?? []}
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
