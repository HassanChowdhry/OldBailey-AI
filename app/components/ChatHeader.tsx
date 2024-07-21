import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const gptModels: string[] = [
  "gpt-3.5-turbo",
  "gpt-3.5-turbo-0125",
  "gpt-3.5-turbo-1106",
  "gpt-3.5-turbo-16k",
  "gpt-4o-mini",
  "gpt-4o",
  "gpt-4-turbo",
  "gpt-4",
]

const ChatHeader = () => {
  return (
    <section className="flex justify-between">
      <div className="flex gap-5">
        <h1 className="my-auto text-white-1 font-bold text-2xl min-w-max">
          Old Bailey AI
        </h1>

        <Select>
          <SelectTrigger 
            className="border-none w-auto p-2 transition-all duration-500 hover:bg-gray-1/30 text-[16px] text-white-5"
          >
            <SelectValue placeholder={gptModels[0]} />
          </SelectTrigger>

          <SelectContent 
            className="text-white-1 border-maroon-3 shadow-md hover:cursor-pointer bg-maroon-2 min-w-[250px] rounded-lg"
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
        <Avatar className="hover:cursor-pointer hover:scale-110 hover:shadow-sm hover:shadow-white-4 transition-all duration-500">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>YOU</AvatarFallback>
        </Avatar>
      </div>
    </section>
  )
}

export default ChatHeader