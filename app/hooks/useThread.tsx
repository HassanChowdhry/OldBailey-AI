import { useEffect, SetStateAction, Dispatch } from "react"
import { fetchThread } from "../controllers/threads"
import { useToast } from "@/components/ui/use-toast";
import * as api from "../controllers/threads";
import { useRouter } from "next/navigation";
import {  Message } from "@/models/Thread";

export default function useThread(
    setProcessing: (processing: boolean) => void, 
    threadId: string,
    setThreadId: Dispatch<SetStateAction<string>>,
    dispatch: Dispatch<{ type: 'addMessage' | 'setMessages'; payload: Message | Message[] }>
  ) {
  
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {

    const loadMessages = async (id: string) => {
      try {
        const messages = await fetchThread(id);
        dispatch({ type: 'setMessages', payload: messages });
      } catch (error) {
        console.error('Failed to fetch messages', error);
      }
    };
  
    // Check for threadId in sessionStorage
    const storedThreadId = sessionStorage.getItem("thread_id");
    if (storedThreadId && !threadId) {
      setThreadId(storedThreadId);
      router.push(`/chat/${storedThreadId}`);
      loadMessages(storedThreadId);
    }
  }, [threadId, setThreadId, dispatch, router]); // Ensure dispatch is included if used


  const clearThread = () => {
    setProcessing(true);
    sessionStorage.removeItem("thread_id");
    setThreadId('');
    router.push('/chat');
    dispatch({ type: 'setMessages', payload: [] });
    toast({
      title: "New Chat Created"
    })
    setProcessing(false);
  };

  const createThread = async (message: string) => {
    try {
      const thread_id = await api.createNewThread(message);
      setThreadId(thread_id);
      sessionStorage.setItem("thread_id", thread_id);
      console.log("here I am bro", thread_id);
      router.push(`/chat/${thread_id}`);
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
    setProcessing(true)
    let thread_id = threadId;

    if (!thread_id || thread_id === '' || thread_id === 'undefined') {
      thread_id = await createThread(message);
    }

    try {
      if (thread_id) {
        const response: Message = await api.postMessage(thread_id, message, gptModel);
        dispatch({ type: 'addMessage', payload: response });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Error sending message",
        variant: "destructive",
      });
    }
    setProcessing(false);
  };

  return { 
    clearThread,
    sendMessage,
  };
}