import Markdown from 'react-markdown'
import { FaRegUser } from "react-icons/fa6";
import { FaBold } from "react-icons/fa";
import remarkGfm from "remark-gfm";
import "./ChatMessage.css";

type ChatMessageProps = {
  message: string;
  role: string;
}

export default function ChatMessage({ message, role }: ChatMessageProps) {
  const isUser = role === "user";
    return (
      <div className='flex-col mx-2 my-4 p-2 animate__bounceIn'>
          <section className='flex gap-2'>
          <div className="rounded-full h-8 w-8 bg-slate-600 flex items-center justify-center font-semibold shrink-0">
            {isUser ? (<FaRegUser />) : (<FaBold />)}
          </div>
            <p className="font-bold my-auto text-[20px] text-secondary">
              {isUser ? ("You") : ("Hassan AI")}
            </p>
          </section>
          <div className="ml-8 flex-col bg-card rounded-3xl py-3 px-5">
              <Markdown
                  className="text-white-100 markdown"
                  remarkPlugins={[remarkGfm]}
              >
                  {message}
              </Markdown>
          </div>
      </div>
    )
}