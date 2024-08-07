"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

import { BsThreeDotsVertical } from "react-icons/bs";
import { IoIosAddCircleOutline, IoMdChatboxes } from "react-icons/io";

import { Sidebar, SidebarBody, SidebarButton, SidebarLink } from "@/components/ui/sidebar";
import { UserThread } from "@/models/User";
import { cn } from "@/lib/utils";
import PFP from '@/components/PFP';

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

export default function LeftSheet({ clearThread, disabled, firstName, lastName, threads }: LeftSheetProps) {
  const [open, setOpen] = useState(false);
  const fullName = `${firstName ?? ""} ${lastName ?? ""}`;

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
              {threads.toReversed().map((thread, index) => (
                  <SidebarLink
                    key={index}
                    link={{
                      label: thread.title,
                      href: `/chat/${thread.thread_id}`,
                      icon: <IoMdChatboxes className="h-5 w-5 flex-shrink-0"/>,
                      end: <BsThreeDotsVertical className="h-5 w-5 flex-shrink-0"/>
                    }}
                  />
                ))}
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
      className="font-normal flex space-x-2 items-center text-sm text-white-1 py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-white-1 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-white-1 whitespace-pre"
      >
        Old Bailey
      </motion.span>
    </div>
  );
};
const LogoIcon = () => {
  return (
    <div
      className="font-normal flex space-x-2 items-center text-sm text-white-1 py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-white-1 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </div>
  );
};
