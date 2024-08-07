import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { MdDeleteOutline } from "react-icons/md";
import Tip from "@/components/Tip";
import { cn } from "@/lib/utils";

type OptionsProps = {
  open: boolean;
  icon?: React.ReactNode;
};

const Options = ({ open, icon }: OptionsProps) => {
  return (
    <div className="text-white-2/50 pr-2 my-auto hover:text-white-1 duration-300 rounded-2xl cursor-pointer">
      <Popover>
        <PopoverTrigger>
          <Tip 
            TipContent="Options"
            TipSide="top"
            TipTrigger={
              <span className={cn("", 
                open ? "opacity-100" : "opacity-0",
              )}>
                {icon ? icon : ''}
              </span>
            }
          />
        </PopoverTrigger>
        <PopoverContent className="w-[125px] text-red-500">
          <div className="flex flex-col text-sm tracking-wider">
            <div className={cn("flex items-center tracking-wide gap-1.5 px-1 py-2 m-1 rounded-md transition-all duration-300 cursor-pointer hover:bg-white-2/10")}>
              <MdDeleteOutline size={20} />
              Delete
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default Options