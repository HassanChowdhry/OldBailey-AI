"use client";
import { useUserContext } from "@/context/UserContext";

const Template = () => {
  const { user } = useUserContext();
  const { first_name, last_name } = user ?? {};
  return (
    <div className="w-full my-auto flex flex-col text-center items-center h-[300px] lg:h-[400px] justify-end">
      <h1 
        className="text-[55px] font-semibold from-red-600 via-purple-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">
          Welcome, {first_name} {last_name}!
      </h1>
      <h2 className="text-[40px] font-medium text-white-2/50">How can I help you today?</h2>
    </div>
  )
}

export default Template;