"use client";

import { useState, useEffect } from "react";
import ChatHeader from "@/components/ChatHeader";
import ChatInput from "@/components/ChatInput";
import ChatMessage from "@/components/ChatMessage";
import ChatStatus from "@/components/ChatStatus";
import useThread from "@/hooks/useThread";
import LeftSheet from "@/components/LeftSheet";
import { Run } from "@/hooks/useThread";

export default function Home() {
  const [run, setRun] = useState<null | Run>(null);
  const [status, setStatus] = useState<string>("Running...");
  const [processing, setProcessing] = useState<boolean>(true);
  const { threadId, messages, clearThread } = useThread(run, setRun, setProcessing, setStatus);

  useEffect(() => {
    if (threadId) {
      setStatus('');
      setProcessing(false);
      return;
    }
  }, [threadId, setStatus]);
  
  const messageList = messages
    .toReversed()
    .filter((message) => message.hidden !== true)
    .map((message) => <></>)

  return (
    <main className="flex min-h-screen w-full">
      <LeftSheet />
      
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

        <ChatInput />
      </section>
    </main>
  );
}
