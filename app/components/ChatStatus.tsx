import { SiOpenai } from "react-icons/si";

type ChatStatusProps = {
  status: string;
}
export default function ChatStatus({ status }: ChatStatusProps) {
  return (
    <div className="flex justify-center">
      <div className="flex flex-row items-center text-white-2">
          <div className="m-2 animate-spin"><SiOpenai /></div>
          <div>{status}</div>
      </div>
    </div>
  )
}