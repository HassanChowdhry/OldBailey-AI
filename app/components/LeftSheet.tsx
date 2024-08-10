"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { BsThreeDots } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";
import { PiChatsLight } from "react-icons/pi";

import { Sidebar, SidebarBody, SidebarButton, SidebarLink } from "@/components/ui/sidebar";
import { UserThread } from "@/models/User";
import { cn } from "@/lib/utils";
import PFP from '@/components/PFP';
import { useUserContext } from "@/context/UserContext";

type LeftSheetProps = {
  clearThread: () => void;
  disabled: boolean;
  firstName: string;
  lastName: string;
  threads: UserThread[];
}

const NewChatButton = {
  label: "New Chat",
  icon: <IoIosAddCircleOutline size={22.5} />,
}

export default function LeftSheet({ clearThread, disabled, firstName, lastName }: LeftSheetProps) {
  const [open, setOpen] = useState(false);
  const fullName = `${firstName ?? ""} ${lastName ?? ""}`;
  const [renderedThreads, setRenderedThreads] = useState<JSX.Element[]>([]);
  const { threadsState, threadsDispatch } = useUserContext();
  const { threads  } = threadsState;
  
  useEffect(() => {
    setRenderedThreads(
      threads.toReversed().map((thread, index) => (
        <SidebarLink
          key={index}
          threadId={thread.thread_id}
          link={{
            label: thread.title,
            href: `/chat/${thread.thread_id}`,
            icon: <PiChatsLight className="h-5 w-5 flex-shrink-0" />,
            end: <BsThreeDots size={25} className="h-5 w-5 flex-shrink-0" />,
          }}
        />
      ))
    );
  }, [threads, threadsDispatch]);
  
  return (
    <div
      className={cn(
        "rounded-md h-screen pt-2 flex flex-col md:flex-row border-maroon-1 bg-maroon-3 text-white-5 min-w-max w-full flex-1 mx-auto overflow-hidden",
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 bg-maroon-3">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            
            <div className="mt-8 flex flex-col gap-2">
              <SidebarButton content={NewChatButton} clearThread={clearThread} disabled={disabled} />
            </div>

            <div className="mt-8 flex flex-col gap-2">
              {renderedThreads}
            </div>

          </div>

          <div>
            <SidebarLink
              link={{
                label: fullName,
                href: "#",
                icon: (
                  <PFP />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}

const Logo = () => {
  return (
    <div
      className="font-normal h-[35px] flex space-x-2 items-center text-[18px] text-white-1 py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-white-1 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-semibold text-white-1 whitespace-pre"
      >
        Old Bailey
      </motion.span>
    </div>
  );
};
const LogoIcon = () => {
  return (
    <div
      className="font-normal h-[35px] flex space-x-2 items-center text-sm text-black-0 py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-white-1 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </div>
  );
};
