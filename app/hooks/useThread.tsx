import { useState, useEffect, SetStateAction, Dispatch } from "react"
import { fetchThread, runStates } from "./threads"
import { useToast } from "@/components/ui/use-toast";
import * as api from "./threads";

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
    setThreadId: Dispatch<SetStateAction<string>>) 
  {
  
  const { toast } = useToast();
  const [thread, setThread] = useState<Thread | null>();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!threadId) {
      const storedThreadId = sessionStorage.getItem("thread_id");
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
    sessionStorage.removeItem("thread_id");
    setThreadId('');
    setThread(null);
    setMessages([]);
    toast({
      title: "New Chat Created"
    })
  };

  const createThread = async () => {
    try {
      const thread_id = await api.createNewThread();
      setThreadId(thread_id);
      sessionStorage.setItem("thread_id", thread_id);
      return thread_id;
    } catch (err) {
      console.error(err);
      toast({
        title: "Error creating thread",
        variant: "destructive",
      });
    }
  }

  const sendMessage = async (message: string, gptModel: string) => {
    setStatus("Running...")
    setProcessing(true)
    let thread_id = threadId;

    if (!thread_id) {
      thread_id = await createThread();
    }

    try {
      if (thread_id) {
        const run = await api.postMessage(thread_id, message, gptModel);
        setRun(run);
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

  return { 
    threadId, 
    messages, 
    clearThread,
    createThread,
    sendMessage,
  };
}