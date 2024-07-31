"use client";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { login, LoginData } from "@/controllers/auth";
import { useRouter } from "next/navigation";
import {
  LabelInputContainer,
  BottomGradient,
  SignPageLink,
  ThirdPartyLoginButtons,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

//TODO: add view password, JWT encode password
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});
export default function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const { setUser } = useContext(UserContext) ?? {};
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const data: LoginData = {
      email: values.email,
      password: values.password,
    };

    const res = await login(data);
    
    if (!res) {
      return toast({ title: "Error", variant: "destructive" });
    }

    if (!res.user || !setUser) {
      return toast({ title: "Something went wrong", variant: "destructive" });
    }

    toast({ title: "Success", description: "Logged in successfully" });
    setUser(res.user);
    router.push("/chat");
  };

  return (
    <div className="relative max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input shadow-maroon-1 bg-black-0">
      <h2 className="font-bold text-xl text-neutral-200 pb-4">
        Login to your Old Bailey AI account
      </h2>

      <Form {...form}>
        <form className="my-8" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <LabelInputContainer>
                      <FormLabel htmlFor="email">Email Address</FormLabel>
                        <FormControl>
                        <Input 
                          id="email" 
                          placeholder="email@email.com" 
                          type="email" 
                          {...field}
                        />
                        </FormControl>
                      <FormMessage className="text-red-600" />
                    </LabelInputContainer>
                  </FormItem>
              )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-2">
                <LabelInputContainer>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl >
                    <Input 
                      id="password" 
                      placeholder="••••••••••••" 
                      type="password" 
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </LabelInputContainer>
              </FormItem>
            )}
          />

          <button
            className="relative bg-gradient-to-br group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white-1 rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Log In &rarr;
            <BottomGradient />
          </button>
        </form>
      </Form>

      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-5 h-[1px] w-full" />
      <ThirdPartyLoginButtons />
      <SignPageLink 
        description="Don't have an account?" 
        href="/signup" 
        title="Sign Up"
      />
    </div>
  );
}