"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarButton, SidebarLink } from "./ui/sidebar";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button" 
import { IoIosAddCircleOutline } from "react-icons/io";

type LeftSheetProps = {
  clearThread: () => void,
  disabled: boolean,
}

const NewChatButton = {
  label: "New Chat",
  icon: <IoIosAddCircleOutline size={22.5} />,
}

export default function LeftSheet({ clearThread, disabled } : LeftSheetProps) {
  const [open, setOpen] = useState(false);
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
            <div className={cn("mt-8 flex flex-col gap-2 text-white-5 border-none")}>
              <SidebarButton content={NewChatButton} clearThread={clearThread} disabled={disabled} />
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Hassan Chowdhry",
                href: "#",
                icon: (
                  <Avatar className="hover:cursor-pointer h-8 w-8 hover:scale-110 hover:shadow-sm hover:shadow-white-4 transition-all duration-500">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>YOU</AvatarFallback>
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
      className="font-normal flex space-x-2 items-center text-sm relative z-20"
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold text-xl whitespace-pre"
      >
        Old Bailey
      </motion.span>
    </div>
  );
};

const LogoIcon = () => {
  return (
    <div className="font-bold text-xl">
      OB
    </div>
  );
};

