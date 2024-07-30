"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

export default function SignupForm() {
  // TODO: Add form validation
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <div className="relative overflow-auto max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input shadow-maroon-1/70 bg-black-0">
      <h2 className="font-bold text-xl text-neutral-200 pb-4">
        Sign up for Old Bailey AI
      </h2>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" placeholder="John" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Doe" type="text" />
          </LabelInputContainer>
        </div>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="email@email.com" type="email" />
        </LabelInputContainer>

        {/* add proper input for phone */}
        <LabelInputContainer className="mb-8">
          <Label htmlFor="twitterpassword">Phone Number - <span className="text-sm">(Optional)</span></Label>
          <Input id="phone" placeholder="phone number" type="text" />
        </LabelInputContainer>

        {/* TODO: Add password verification + view password feature */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Verify Password</Label>
          <Input id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white-1 rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <ThirdPartyLoginButtons />
        
      </form>
      <SignPageLink 
        description="Already have an account?" 
        href="/login" 
        title="Log in"
      />
    </div>
  );
}

export const ThirdPartyLoginButtons = () => {
  const { toast } = useToast();
  const buttonHandler = () => {
    toast({title: "Feature not implemented yet.", description: "Please sign up using email and password."});
  }

  return (
    <div className="flex flex-col space-y-4">
      <button
        className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black-1 rounded-md h-10 font-medium bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)]"
        // type="submit"
        onClick={buttonHandler}
      >
        <IconBrandGithub className="h-4 w-4 text-neutral-300" />
        <span className="text-neutral-300 text-sm">
          GitHub
        </span>
        <BottomGradient />
      </button>
      <button
        className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black-1 rounded-md h-10 font-medium bg-zinc-900 shadow-[0px_0px_1px_1px_var(--neutral-800)]"
        // type="submit"
        onClick={buttonHandler}
      >
        <IconBrandGoogle className="h-4 w-4 text-neutral-300" />
        <span className="text-neutral-300 text-sm">
          Google
        </span>
        <BottomGradient />
      </button>
    </div>
  )
}

export const SignPageLink = ({ description, href, title }: { description: string; href: string; title: string }) => {
  return (
    <span className="text-white-2 text-[14px]">
      {description}&nbsp;
      <Link href={href} className="ml-1 text-white-1 hover:text-white-5 hover:underline font-semibold">
        {title}
      </Link>
    </span>
  );
};

export const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

export const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
