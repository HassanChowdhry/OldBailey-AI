import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type TipProps = {
  TipTrigger: React.ReactNode;
  TipContent: string;
  TipSide?: "right" | "top" | "bottom" | "left"
};

const Tip = ({ TipTrigger, TipContent, TipSide }: TipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {TipTrigger}
        </TooltipTrigger>
        <TooltipContent side={TipSide}>
          {TipContent}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default Tip