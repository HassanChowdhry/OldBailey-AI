import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserContext } from "@/context/UserContext";
import Tip from "@/components/Tip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { IoMdSettings, IoIosLogOut } from "react-icons/io";
import { cn } from "@/lib/utils";

type PFPprops = {
  disabled?: boolean;
};

const PFP = ({disabled}: PFPprops) => {
  const { user } = useUserContext();
  const { first_name, last_name } = user ?? {};
  const initials = `${first_name ? first_name[0] : ''}${last_name ? last_name[0] : ''}`;
  const commonStyles = "flex items-center tracking-wide gap-3 px-3 py-3.5 m-1.5 rounded-md transition-all duration-300 cursor-pointer hover:bg-white-2/10";
  const LogOut = () => {
    // console.log(cookieStore)
    // sessionStorage.removeItem("token");
    // router.push("/");
  };
  
  if (disabled) {
    return (
      <Avatar className="h-8 w-8">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
    )
  }
  
  return (
    <Popover>
      <PopoverTrigger>
        <Tip 
          TipContent="Your Account"
          TipSide="top"
          TipTrigger={
            <Avatar className="hover:cursor-pointer h-8 w-8 hover:scale-110 transition-all duration-500">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          }
        />
      </PopoverTrigger>
      <PopoverContent className="w-[250px] h-full">
        <div className="flex flex-col py-1.5 text-sm">
          <div className={cn("", commonStyles)}>
            <IoMdSettings size={20} />
            Settings
          </div>
          <hr className="border-white-2/20 w-[85%] mx-auto" />
          <div className={cn("", commonStyles)} onClick={LogOut}>
            <IoIosLogOut size={20} />
            Logout
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default PFP;