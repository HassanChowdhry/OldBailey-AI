import { useUserContext } from "@/context/UserContext"
import { useRouter } from "next/navigation";
import { MdDeleteOutline } from "react-icons/md";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { deleteThread } from "@/controllers/threads";
import Tip from "@/components/Tip";
import { cn } from "@/lib/utils";
import { useToast } from "./ui/use-toast";
import { useThreadContext } from "@/context/ThreadContext";

type OptionsProps = {
  open: boolean;
  icon?: React.ReactNode;
  thisThreadId?: string;
};

const Options = ({ open, icon, thisThreadId }: OptionsProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const { threadsDispatch } = useUserContext();
  const { threadId: currThreadId, setThreadId } = useThreadContext();

  const handleDelete = async () => {
    if (!thisThreadId) return;
    const res = await deleteThread(thisThreadId);

    if (res && res.error) {
      return toast({ title: res.error, variant: "destructive" });
    }
    
    toast({ title: "Thread deleted", variant: "success" });
    threadsDispatch({ type: "removeThread", payload: thisThreadId});
    if (thisThreadId == currThreadId) {
      router.push("/chat");
      setThreadId("");
    }
  }
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
        <PopoverTrigger>
          <PopoverContent onClick={handleDelete} className="w-[125px] text-red-500">
            <div className="flex flex-col text-sm tracking-wider">
              <div className={cn("flex items-center tracking-wide gap-1.5 px-1 py-2 m-1 rounded-md transition-all duration-300 cursor-pointer hover:bg-white-2/10")}>
                <MdDeleteOutline size={20} />
                Delete
              </div>
            </div>
          </PopoverContent>
      </PopoverTrigger>
      </Popover>
    </div>
  )
}

export default Options