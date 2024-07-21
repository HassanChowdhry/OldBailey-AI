import ChatHeader from "@/components/ChatHeader";
import ChatInput from "@/components/ChatInput";
import { LeftSheet } from "@/components/LeftSheet";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full">
      <LeftSheet />
      
      <section className="flex flex-1 flex-col w-full text-center text-white-1">
        <header className="max-h-[75px] p-5">
          <ChatHeader />
        </header>

        <div className="h-[87%]">
          Chat area
        </div>

        <ChatInput />
      </section>
    </main>
  );
}
