"use client";
import { useParams } from "next/navigation"

const Chat = () => {
  const { threadId } = useParams();
  return (
    <div>{ threadId }</div>
  )
}

export default Chat