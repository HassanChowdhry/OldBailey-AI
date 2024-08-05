"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarButton, SidebarLink } from "./ui/sidebar";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { IoIosAddCircleOutline, IoMdChatboxes } from "react-icons/io";
import { UserThread } from "@/models/User";
import { BsThreeDotsVertical } from "react-icons/bs";

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
  const initials = `${firstName ? firstName[0] : ''}${lastName ? lastName[0] : ''}`;

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
              {threads.map((thread, index) => (
                  <SidebarLink
                    key={index}
                    link={{
                      label: thread.title,
                      href: "#",
                      icon: <IoMdChatboxes className="text-neutral-500 h-5 w-5 flex-shrink-0"/>,
                      end: <BsThreeDotsVertical className="text-neutral-500 hover:text-white-5 h-5 w-5 flex-shrink-0"/>
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
                  <Avatar className="hover:cursor-pointer h-8 w-8 hover:scale-110 hover:shadow-sm transition-all duration-500">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
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
