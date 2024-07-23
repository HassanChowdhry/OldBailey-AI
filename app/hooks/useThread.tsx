import { useState, useEffect, SetStateAction, Dispatch } from "react"
import { fetchThread, runStates } from "./api"

export interface Thread {
  thread_id: string;
  messages: Message[];
}

export interface Message {
  id: string;
  content: string;
  role: string;
  created_at: number;
  hidden?: boolean;
}

export interface Run {
  thread_id: string;
  status: string;
}

export default function useThread(
    run: Run | null, 
    setRun: Dispatch<SetStateAction<Run | null>>, 
    setProcessing: (processing: boolean) => void, 
    setStatus: (status: string) => void,
    threadId: string,
    setThreadId: Dispatch<SetStateAction<string>>) {

  const [thread, setThread] = useState<Thread | null>();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!threadId) {
      const storedThreadId = localStorage.getItem("thread_id");
      if (storedThreadId) {
        setThreadId(storedThreadId);
        fetchThread(storedThreadId).then(setThread);
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
    const newMessages = [...thread.messages]
      .sort((a, b) => a.created_at - b.created_at)
      .filter((message) => message.hidden !== true);
    setMessages(newMessages);
  }, [thread, setMessages]);

  const clearThread = () => {
    setStatus('');
    setProcessing(false);
    localStorage.removeItem("thread_id");
    setThreadId('');
    setThread(null);
    setMessages([]);
  };

  return { 
    threadId, 
    messages, 
    clearThread,
  };
}