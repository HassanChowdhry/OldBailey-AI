"use client";

import { useState } from "react";
import ChatHeader from "@/components/ChatHeader";
import ChatInput from "@/components/ChatInput";
import ChatMessage from "@/components/ChatMessage";
import ChatStatus from "@/components/ChatStatus";
import useThread from "@/hooks/useThread";
import LeftSheet from "@/components/LeftSheet";
import { Run } from "@/hooks/useThread";
import * as api from "../hooks/api";
import { useToast } from "@/components/ui/use-toast";

export default function Home() {
  const [run, setRun] = useState<Run | null>(null)
  const [status, setStatus] = useState<string>("")
  const [processing, setProcessing] = useState<boolean>(false)
  const [threadId, setThreadId] = useState<string>('') 
  const { toast } = useToast();
  
  const { messages, clearThread } = useThread(run, setRun, setProcessing, setStatus, threadId, setThreadId);

  const messageList = messages
    .toReversed()
    .filter((message) => message.hidden !== true)
    .map((message) => <ChatMessage key={message.id} message={message.content} role={message.role} />)
  
  const createThread = async () => {
    try {
      const thread_id = await api.createNewThread();
      setThreadId(thread_id);
      return thread_id;
    } catch (err) {
      console.error(err);
      toast({
        title: "Error creating thread",
        variant: "destructive",
      });
    }
  }
  const sendMessage = async (message: string) => {
    setStatus("Running...")
    setProcessing(true)
    let thread_id = threadId;

    if (!thread_id) {
      thread_id = await createThread();
    }

    try {
      if (thread_id) {
        const run = await api.postMessage(thread_id, message);
        setRun(run);
        toast({
          title: "Message sent",
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Error sending message",
        variant: "destructive",
      });
    }

    setStatus("");
    setProcessing(false);
  };

  return (
    <main className="flex min-h-screen w-full">
      <LeftSheet 
        clearThread={clearThread}
      />
      
      <section className="flex flex-1 flex-col w-full text-center text-white-1">
        <header className="max-h-[75px] p-5">
          <ChatHeader />
        </header>

        <div className="flex flex-col-reverse grow overflow-scroll pb-4">
            {status && (
                <ChatStatus status={status} />
            )}
              {messageList}
        </div>

        <ChatInput 
          onSend={(message) => sendMessage(message)}
          disabled={processing}
        />
      </section>
    </main>
  );
}
