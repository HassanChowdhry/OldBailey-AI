"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation"
import { useThreadContext } from "@/context/ThreadContext";
import ChatMessage from "@/components/ChatMessage";
import { useChat } from "@/context/ChatContext";
import { fetchThread } from "@/controllers/threads";

const Chat = () => {
  const { threadId: paramThreadId } = useParams();

  const { threadId: contextThreadId, setThreadId } = useThreadContext();
  const { state, dispatch } = useChat();
  const { messages } = state;

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchMessages = async () => {
      if (paramThreadId !== contextThreadId) {
        setLoading(true);
        try {
          const fetchedMessages = await fetchThread(paramThreadId.toString());
          dispatch({ type: 'setMessages', payload: fetchedMessages });
          setThreadId(paramThreadId.toString());
        } catch (error) {
          console.error('Failed to fetch messages', error);
        }
        setLoading(false);
      }
    };

    fetchMessages();
  }, [paramThreadId]);

  let messageList = null;
  if (messages) {
    messageList = messages.map((message, index) => <ChatMessage key={index} message={message.content} role={message.role} />)
  }

  return (
    <>
      {loading ? <p>Loading messages...</p> : messageList}
    </>
  )
}

export default Chat