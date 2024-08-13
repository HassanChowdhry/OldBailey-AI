"use client";

import Markdown from 'react-markdown'
import { RiBardLine } from "react-icons/ri";
import { LuCopy } from "react-icons/lu";
import { MdDone } from "react-icons/md";
import remarkGfm from "remark-gfm";
import rehypeHighlight from 'rehype-highlight';
import PFP from '@/components/Pfp';
import Tip from '@/components/Tip';

import "./ChatMessage.scss";
import 'highlight.js/styles/obsidian.css';  
import { cn } from '@/lib/utils';
import { useState } from 'react';

type ChatMessageProps = {
  message: string;
  role: string;
}

export default function ChatMessage({ message, role }: ChatMessageProps) {
  const [isCopied, setIsCopied] = useState(false);
  const isUser = role === "user";
  const userStyles = "bg-maroon-2 max-w-[70%] w-fit h-full rounded-3xl px-5 py-2.5"
  
  return (
    <div className='flex mx-2 my-4 p-2 gap-6 text-white-2'>
        <div className="rounded-full h-8 min-w-8 mt-1 bg-tranparent border border-white-2/30 shadow-inner shadow-white-2/20 text-white-1 flex items-center justify-center">
          {isUser ? (<PFP disabled={true}/>) : (<RiBardLine />)}
        </div>
        <div className={`${isUser ? userStyles: "px-2.5"} text-white-1/90 gap-1 flex flex-col h-full my-auto ml-1 max-w-full overflow-x-scroll`}>
            <Markdown
                className={cn("text-white-100 markdown", !isUser && "p-1")}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
            >
              {message}
            </Markdown>

            {!isUser && (
                <Tip 
                  TipContent="Copy"
                  TipSide="left"
                  TipTrigger={

                    <button 
                      onClick={() => {
                        setIsCopied(true)
                        navigator.clipboard.writeText(message)
                        setTimeout(() => {
                          setIsCopied(false);
                        }, 5000);
                      }}
                      className={cn('p-2 ml-[-2px] cursor-pointer rounded-lg w-max hover:bg-maroon-2 duration-300 hover:text-white-1', isCopied && "bg-maroon-2 text-white-1")}>
                      {!isCopied ? <LuCopy /> : <MdDone />}
                    </button>
                  }
                />
            )}
        </div>
    </div>
  )
}