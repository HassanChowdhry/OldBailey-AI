"use client";

import { useState } from "react";
import ChatHeader, { gptModels } from "@/components/ChatHeader";
import ChatInput from "@/components/ChatInput";
import ChatMessage from "@/components/ChatMessage";
import ChatStatus from "@/components/ChatStatus";
import useThread from "@/hooks/useThread";
import LeftSheet from "@/components/LeftSheet";
import { Run } from "@/hooks/useThread";
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Home() {
  const [run, setRun] = useState<Run | null>(null)
  const [status, setStatus] = useState<string>("")
  const [processing, setProcessing] = useState<boolean>(false)
  const [threadId, setThreadId] = useState<string>('') 
  const [gptModel, setGptModel] = useState<string>(gptModels[0])
  
  const { messages, clearThread, sendMessage } = useThread(run, setRun, setProcessing, setStatus, threadId, setThreadId);

  const messageList = messages
    .filter((message) => message.hidden !== true)
    .map((message) => <ChatMessage key={message.id} message={message.content} role={message.role} />)

  return (
    <main className="flex min-h-screen w-full">
      <LeftSheet 
        clearThread={clearThread}
        disabled={!threadId}
      />
      
      <section className=" text-white-1 w-full md:mx-auto h-screen flex flex-col">
        <ChatHeader setGptModel={setGptModel} />

        <ScrollArea className="h-screen w-full">
          <div className="flex w-[800px] mx-auto flex-col grow pb-4">
              {messageList}
          </div>
        </ScrollArea>

        {status && <ChatStatus status={status} />}
        <ChatInput 
          onSend={(message) => sendMessage(message, gptModel)}
          disabled={processing}
        />
      </section>
    </main>
  );
}
