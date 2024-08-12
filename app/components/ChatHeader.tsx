import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import PFP from '@/components/Pfp';

export const gptModels: string[] = [
  "gpt-3.5-turbo",
  "gpt-3.5-turbo-0125",
  "gpt-3.5-turbo-1106",
  "gpt-3.5-turbo-16k",
  // "gpt-4o-mini",
  // "gpt-4o",
  // "gpt-4-turbo",
  // "gpt-4",
]

type ChatHeaderProps = {
  setGptModel: (model: string) => void
}
const ChatHeader = ({ setGptModel }: ChatHeaderProps) => {
  
  return (
    <section className="flex justify-between max-h-[75px] p-5">
      <div className="flex gap-5">
        <Select onValueChange={(e) => {setGptModel(e)}} defaultValue={gptModels[0]}>
          <SelectTrigger 
            className="border-none w-auto p-2 transition-all duration-500 hover:bg-gray-1/30 text-[16px] text-white-2"
          >
            <SelectValue placeholder={gptModels[0]} />
          </SelectTrigger>

          <SelectContent 
            className="text-white-2 border-maroon-3 shadow-md hover:cursor-pointer bg-maroon-2 min-w-[250px] rounded-lg"
          >
            <SelectGroup>
              {gptModels.map((model) => (
                <SelectItem 
                  className="hover:bg-gray-1/30 p-2 mt-1 rounded-md transition-all duration-200"
                  value={model} 
                  key={model}
                >
                  {model}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <PFP />
      </div>
    </section>
  )
}

export default ChatHeader