"use client";

import { useState } from "react";
import { useUserContext } from "@/context/UserContext"
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { signup, SignupData  } from "@/controllers/auth";
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
import { FaEye, FaEyeSlash } from "react-icons/fa";

const formSchema = z.object({
  first_name: z.string().min(3, { message: "First name is required" }),
  last_name: z.string().min(3, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  // phone_number: z.number().optional(),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  verify_password: z.string().min(6, { message: "Please verify your password" }),
}).refine((data) => data.password === data.verify_password, {
  message: "Passwords do not match",
  path: ["verify_password"],
});
export default function SignupForm() {
  const { toast } = useToast();
  const router = useRouter();
  const { setUser, threadsDispatch } = useUserContext();

  const [passwordVisibility, setPasswordVisibility] = useState<string>('password');
  const [confirmPasswordVisibility, setconfirmPasswordVisibility] = useState<string>('password');
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      // phone_number: undefined,
      password: "",
      verify_password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const data: SignupData = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      // phone_number: values.phone_number ? values.phone_number : undefined,
      password: values.password,
    };

    const res = await signup(data);
    
    if (!res || res.error) {
      return toast({ title: "Error", description: res.error, variant: "destructive" });
    }

    if (res && res.message) {
      toast({ title: "Please Verify OTP", description: res.message });
    }
    
    router.push(`/verify-email?email=${encodeURIComponent(values.email)}`);
  };

  return (
    <div className="relative overflow-auto max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input shadow-maroon-1 bg-black-0">
      <h2 className="font-bold text-xl text-neutral-200 pb-4">
        Sign up for Old Bailey AI
      </h2>

      <Form {...form}>
        <form className="my-8" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-2">
            <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <LabelInputContainer>
                      <FormLabel htmlFor="first_name">First name</FormLabel>
                        <FormControl>
                          <Input 
                            id="first_name" 
                            placeholder="John" 
                            type="text" 
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
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <LabelInputContainer>
                      <FormLabel htmlFor="last_name">Last name</FormLabel>
                        <FormControl>
                        <Input 
                          id="last_name" 
                          placeholder="Doe" 
                          type="text" 
                          {...field}
                        />
                        </FormControl>
                      <FormMessage className="text-red-600" />
                    </LabelInputContainer>
                  </FormItem>
              )}
            />
          </div>
          
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

          {/* <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem className="mb-2">
                <LabelInputContainer>
                  <FormLabel>Phone Number <span className="text-sm">(Optional)</span></FormLabel>
                  <FormControl>
                    <Input 
                      id="phone_number" 
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
                      placeholder="0001112222" 
                      type="tel" 
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </LabelInputContainer>
              </FormItem>
            )}
          /> */}

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
                      type={passwordVisibility}
                      icon={passwordVisibility === 'password' ? (
                          <FaEye onClick={() => setPasswordVisibility('text')} className="absolute mr-7" /> 
                        ) :
                          <FaEyeSlash onClick={() => setPasswordVisibility('password')} className="absolute mr-7" />
                      }
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </LabelInputContainer>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="verify_password"
            render={({ field }) => (
              <FormItem className="mb-2">
                <LabelInputContainer>
                  <FormLabel htmlFor="verify_password">Verify Password</FormLabel>
                  <FormControl>
                    <Input 
                      id="verify_password" 
                      placeholder="••••••••••••" 
                      type={confirmPasswordVisibility}
                      icon={confirmPasswordVisibility === 'password' ? (
                          <FaEye onClick={() => setconfirmPasswordVisibility('text')} className="absolute mr-7" /> 
                        ) :
                          <FaEyeSlash onClick={() => setconfirmPasswordVisibility('password')} className="absolute mr-7" />
                      }
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </LabelInputContainer>
              </FormItem>
            )}
          />

          <button
            className="bg-gradient-to-br relative group/btn from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white-1 rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Sign up &rarr;
            <BottomGradient />
          </button>  
        </form>
      </Form>

      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-5 h-[1px] w-full" />
      <ThirdPartyLoginButtons />
      <SignPageLink
        className="pt-8"
        description="Already have an account?" 
        href="/login" 
        title="Log in"
      />
    </div>
  );
}
