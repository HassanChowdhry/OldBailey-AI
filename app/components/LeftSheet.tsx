import { Button } from "./ui/button" 
import { IoIosAddCircleOutline } from "react-icons/io";

type LeftSheetProps = {
  clearThread: () => void,
  disabled: boolean,
}
export default function LeftSheet({ clearThread, disabled } : LeftSheetProps) {
  return (
    <div className="left_sidebar">
      <header className="flex flex-col w-[95%] mx-auto ">
        <h1 className="text-white-1/90 text-center ml-[-20px] font-bold text-2xl">
          Old Bailey AI
        </h1>
        <Button
          className="font-semibold justify-start py-5 w-full rounded-r-md text-[16px] text-white-5 disabled:text-white-2"
          variant="outline"
          onClick={clearThread}
          disabled={disabled}
        >
         <IoIosAddCircleOutline size={22.5} />&nbsp;New Chat
        </Button>
      </header>
    </div>
  )
}