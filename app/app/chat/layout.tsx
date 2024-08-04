"use client";

import { useState, useEffect, useRef, useContext } from "react";
import ChatHeader, { gptModels } from "@/components/ChatHeader";
import ChatInput from "@/components/ChatInput";
import ChatMessage from "@/components/ChatMessage";
import ChatStatus from "@/components/ChatStatus";
import useThread from "@/hooks/useThread";
import LeftSheet from "@/components/LeftSheet";
import { Run } from "@/hooks/useThread";
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserContext } from "@/context/UserContext"
import { useRouter } from "next/navigation";

//TODO: 
// auth guard
// make this into layout and threads as children/routes

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  const [run, setRun] = useState<Run | null>(null)
  const [status, setStatus] = useState<string>("")
  const [processing, setProcessing] = useState<boolean>(false)
  const [threadId, setThreadId] = useState<string>('') 
  const [gptModel, setGptModel] = useState<string>(gptModels[0])
  const { user } = useContext(UserContext) ?? {};
  const { first_name, last_name, threads } = user ?? {};
  const router = useRouter();
  
  const { messages, clearThread, sendMessage } = useThread(run, setRun, setProcessing, setStatus, threadId, setThreadId);
  
  const scrollViewportRef = useRef<HTMLDivElement | null>(null);

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
    if (threadId) {
      router.push(`/chat/${threadId}`)
    }
  }, [threadId, router])

  const messageList = messages
    .filter((message) => message.hidden !== true)
    .map((message) => <ChatMessage key={message.id} message={message.content} role={message.role} />)

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

        {status && <ChatStatus status={status} />}
        <ChatInput 
          onSend={async (message) => {
            await sendMessage(message, gptModel)
            scrollToBottom()
          }}
          disabled={processing}
        />
      </section>
    </main>
  );
}
