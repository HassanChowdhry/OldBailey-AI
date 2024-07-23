import { useState } from "react";
import { Textarea } from "@/components/ui/textarea"
import { Button } from "./ui/button"
import { IoIosSend } from "react-icons/io";

type ChatInputProps = {
  onSend: (message: string) => void,
  disabled: boolean,
}
const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState<string>("")

  return (
    <div className="flex-center flex-col bottom-0 w-full pb-4">
      <form
        className="flex flex-1 justify-end items-end gap-2 max-w-[780px] bg-maroon-2 py-2 px-3 rounded-[26px]"
        onSubmit={(e) => {
          e.preventDefault();
          onSend(message);
          setMessage("");
        }}
      >
        <div className="flex flex-1">
          <Textarea
            className="text-white-1 w-[650px] text-[15px] py-2 px-2 resize-none overflow-y-auto bg-transparent border-none max-h-[25dvh]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message Old Bailey AI"
            dir="auto"
            rows={1}
            required
          />
        </div>

        <Button
          variant="default"
          disabled={disabled}
          className="rounded-full hover:bg-white-2 text-black-1 disabled:bg-text-white-3 disabled:bg-white-2"
        >
          <IoIosSend size={20} />
        </Button>
      </form>
     
      <em className="text-gray-1 text-12 m-2">
        Old Bailey AI can make mistakes. Check important info.
      </em>
    </div>
  )
}

export default ChatInput