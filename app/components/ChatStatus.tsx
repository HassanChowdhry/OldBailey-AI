import { SiOpenai } from "react-icons/si";

export default function ChatStatus() {
  return (
    <div className="flex justify-center">
      <div className="flex flex-row items-center text-white-2">
          <div className="m-2 animate-spin"><SiOpenai /></div>
          <div>Running...</div>
      </div>
    </div>
  )
}