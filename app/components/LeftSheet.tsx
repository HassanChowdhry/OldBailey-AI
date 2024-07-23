import { Button } from "./ui/button" 
import { IoIosAddCircleOutline } from "react-icons/io";

type LeftSheetProps = {
  clearThread: () => void,
  disabled: boolean,
}
export default function LeftSheet({ clearThread, disabled } : LeftSheetProps) {
  return (
    <div className="left_sidebar">
        <Button
          className="font-semibold justify-start pl-5 py-5 w-full rounded-r-md gap-1 text-[16px] text-white-5 disabled:text-white-2"
          variant="outline"
          onClick={clearThread}
          disabled={disabled}
        >
         <IoIosAddCircleOutline size={22.5} />&nbsp;New Chat
        </Button>
    </div>
  )
}