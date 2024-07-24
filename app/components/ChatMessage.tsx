import Markdown, { Components } from 'react-markdown'
import { FaRegUser } from "react-icons/fa6";
import { FaBold } from "react-icons/fa";
import remarkGfm from "remark-gfm";
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/obsidian.css';  
import "./ChatMessage.scss";

type ChatMessageProps = {
  message: string;
  role: string;
}

export default function ChatMessage({ message, role }: ChatMessageProps) {
  const isUser = role === "user";
  const userStyles = "bg-maroon-2 max-w-[70%] w-fit h-full rounded-3xl px-5 py-2.5"

    return (
      <div className='flex mx-2 my-4 p-2 text-white-1/85'>
          <div className="rounded-full h-8 min-w-8 bg-tranparent border border-white-2/30 shadow-sm shadow-white-1 text-white-1 flex items-center justify-center">
            {isUser ? (<FaRegUser />) : (<FaBold />)}
          </div>
          <div className={`${isUser && userStyles} flex flex-col h-full my-auto ml-3  max-w-full overflow-x-scroll`}>
              <Markdown
                  className="text-white-100 markdown"
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
              >
                  {message}
              </Markdown>
          </div>
      </div>
    )
}