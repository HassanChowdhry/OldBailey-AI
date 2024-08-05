"use client";
import { useParams } from "next/navigation"
import { useChat } from "@/context/ChatContext";
import ChatMessage from "@/components/ChatMessage";

const Chat = () => {
  const { threadId } = useParams();
  const { state, dispatch } = useChat();
  const { messages } = state;

  let messageList = null;
  if (messages) {
    messageList = messages.map((message, index) => <ChatMessage key={index} message={message.content} role={message.role} />)
  }

  return (
    <>
      {messageList}
    </>
  )
}

export default Chat