import { useState, useEffect } from "react"
import { createNewThread, fetchThread, runStates } from "./api"

export interface Thread {
  thread_id: string;
  messages: Message[];
}

export interface Message {
  created_at: number;
  hidden?: boolean;
}

export interface Run {
  thread_id: string;
  status: string;
}

export default function useThread(run: Run | null, setRun: (run: Run | null) => void, setProcessing: (processing: boolean) => void, setStatus: (status: string) => void) {
  const [threadId, setThreadId] = useState<string>("");
  const [thread, setThread] = useState<Thread | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!threadId) {
      const storedThreadId = localStorage.getItem("thread_id");
      if (storedThreadId) {
        setThreadId(storedThreadId);
        fetchThread(storedThreadId).then(setThread);
      } else {
        createNewThread().then((data: Run) => {
          setRun(data);
          setThreadId(data.thread_id);
          localStorage.setItem("thread_id", data.thread_id);
        });
      }
    }
  }, [threadId, setThreadId, setThread, setRun]);

  useEffect(() => {
    if (!run || !runStates.includes(run.status)) {
      return;
    }
    fetchThread(run.thread_id)
      .then((threadData: Thread) => {
        setThread(threadData);
      });
  }, [run, setThread]);

  useEffect(() => {
    if (!thread) {
      return;
    }
    let newMessages = [...thread.messages]
      .sort((a, b) => a.created_at - b.created_at)
      .filter((message) => message.hidden !== true);
    setMessages(newMessages);
  }, [thread, setMessages]);

  const clearThread = () => {
    setStatus("Processing...");
    setProcessing(true);
    localStorage.removeItem("thread_id");
    setThreadId("");
    setThread(null);
    setMessages([]);
  };

  return { 
    threadId, 
    messages, 
    clearThread,
  };
}