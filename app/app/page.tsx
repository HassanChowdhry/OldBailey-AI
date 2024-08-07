"use client";

import { SparklesCore } from "@/components/ui/sparkles";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";
import { cn } from "@/lib/utils";
import "animate.css"

export default function Hero() {    
  return (
    <main className="min-h-screen w-full bg-black-0 text-white-1/90">
      <div className="w-full absolute h-screen">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
      </div>
      <div className="absolute w-full h-2/3 md:h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl sm:text-5xl font-bold animate__animated animate__fadeIn delay-500">
          Old Bailey AI
        </h1>
        <div className="flex flex-col gap-4 md:flex-row mt-[60px]">
          <Card 
            title="Log In" 
            href="/login"
            className="card card-1"
            description="Log in to your account"
          />
          <Card 
            title="Sign Up" 
            href="/signup"
            className="card card-2"
            description="Create a new account"
          />
        </div>
      </div>
    </main>
  );
}

const Card = ({title, description, href, className} : {title: string, description: string, href: string, className?: string}) => {
  return (
    <Link 
      href={href}
      className={cn(`h-full md:h-[400px] w-[280px] shadow-inner shadow-maroon-1 rounded-lg p-8
                  bg-maroon-3/90 hover:bg-maroon-2 duration-500 text-white-5`, className)}>
      <div className="flex items-center justify-between my-auto text-[24px] font-bold">
        <h1>{title}</h1>
        <FaArrowRight />
      </div>
      <div className="mt-3 text-[16px] leading-6">
        {description}
      </div>
    </Link>
  )
}