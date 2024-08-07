import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserContext } from "@/context/UserContext";
import Tip from "./Tip";

const PFP = () => {
  const { user } = useUserContext();
  const { first_name, last_name } = user ?? {};
  const initials = `${first_name ? first_name[0] : ''}${last_name ? last_name[0] : ''}`;

  return (
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
  )
}

export default PFP;