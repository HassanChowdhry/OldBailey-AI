"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LabelInputContainer, BottomGradient, SignPageLink, ThirdPartyLoginButtons } from "../signup/page";

export default function LoginForm() {
  // TODO: Add form validation
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <div className="relative max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input shadow-maroon-1/70 bg-black-0">
      <h2 className="font-bold text-xl text-neutral-200 pb-4">
        Login to your Old Bailey AI account
      </h2>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="email@email.com" type="email" />
        </LabelInputContainer>

        {/* TODO: Add password verification + view password feature */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>

        <button
          className="relative bg-gradient-to-br group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white-1 rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Log In &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <ThirdPartyLoginButtons />

      </form>

      <SignPageLink 
        description="Don't have an account?" 
        href="/signup" 
        title="Sign Up"
      />
    </div>
  );
}