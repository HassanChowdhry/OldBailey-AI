import { Button } from "./ui/button" 
import { IoIosAddCircleOutline } from "react-icons/io";

type LeftSheetProps = {
  clearThread: () => void
}
export default function LeftSheet({ clearThread } : LeftSheetProps) {
  return (
    <div className="left_sidebar">
        <Button
          className="font-semibold justify-start pl-5 py-5 w-full rounded-r-md gap-1 text-[16px] text-white-5"
          variant="outline"
          onClick={clearThread}
        >
         <IoIosAddCircleOutline size={22.5} />&nbsp;New Chat
        </Button>
    </div>
  )
}