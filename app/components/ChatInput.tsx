import { Textarea } from "@/components/ui/textarea"
import { Button } from "./ui/button"
import { IoIosSend } from "react-icons/io";

const ChatInput = () => {
  return (
    //TODO: change the absolute
    <div className="flex-center flex-col absolute bottom-0 w-full pb-4">
      <section
        className="flex flex-1 justify-end items-end gap-2 max-w-[780px] bg-maroon-2 py-2 px-3 rounded-[26px]"
      >
        <div className="flex flex-1">
          <Textarea
            className="text-white-1 w-[650px] py-2 px-2 resize-none overflow-y-auto bg-transparent border-none max-h-[25dvh]"
            placeholder="Message Old Bailey AI"
            dir="auto"
            rows={1}
          />
        </div>

        <Button
          variant="default"
          className="rounded-full hover:bg-white-2"
        >
          <IoIosSend size={20} />
        </Button>
      </section>
     
      <em className="text-gray-1 text-12 m-2">
        Old Bailey AI can make mistakes. Check important info.
      </em>
    </div>
  )
}

export default ChatInput