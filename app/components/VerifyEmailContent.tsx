"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { InputOTPForm } from "@/components/Otp";
import { verify_otp, resend_otp } from "@/controllers/auth";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/UserContext";

const TIMER_KEY = 'otpTimerExpiry';
const TIMER_DURATION = 300;

export default function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const { toast } = useToast();
  const { setUser, threadsDispatch } = useUserContext();
  const [isResending, setIsResending] = useState(false);
  
  const [timer, setTimer] = useState(TIMER_DURATION); 
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    const timeRemaining = sessionStorage.getItem(TIMER_KEY);
    if (timeRemaining) {
      setTimer(parseInt(timeRemaining, 10));
      setCanResend(false);
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0 && !canResend) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
        sessionStorage.setItem(TIMER_KEY, (timer - 1).toString());
      }, 1000);
    } else if (timer === 0 && !canResend) {
      setCanResend(true);
    }
    return () => {
      clearInterval(interval)
    };
  }, [timer, canResend]);

  const handleVerifyOTP = async (otp: string) => {
    if (!email) {
      toast({ title: "Error", description: "Email not found", variant: "destructive" });
      return;
    }

    const res = await verify_otp(email, parseInt(otp, 10));

    if (res.error) {
      return toast({ title: "Error", description: res.error, variant: "destructive" });
    } 
    
    if (!res.user) {
      return toast({ title: "Error", description: "User not found", variant: "destructive" });
    }

    toast({ title: "Success", description: "Email verified successfully", variant: "success" });
    sessionStorage.removeItem(TIMER_KEY);
    setUser(res.user);
    if (threadsDispatch) threadsDispatch({ type: "setThreads", payload: res.user.threads });
    router.push("/chat");
  };

  const handleResendOTP = async () => {
    if (!email) {
      toast({ title: "Error", description: "Email not found", variant: "destructive" });
      return;
    }

    setIsResending(true);
    const res = await resend_otp(email);
    setIsResending(false);

    if (res.error) {
      return toast({ title: "Error", description: res.error, variant: "destructive" });
    }
    
    toast({ title: "Success", description: "Verification code resent successfully", variant: "success" });
    setTimer(TIMER_DURATION);
    setCanResend(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-neutral-300 relative max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input shadow-maroon-1 bg-black-0">
      <h2 className="font-bold text-2xl text-neutral-200 pb-4">
        Verify Your Email
      </h2>
      <h3 className="font-bold text-sm pb-4">
        Please enter the verification code sent to: <em>{email}</em>
      </h3>
      <InputOTPForm onSubmit={handleVerifyOTP} />
      <button 
        onClick={handleResendOTP}
        disabled={isResending}
        className="disabled:text-white-2 disabled:hover:no-underline ml-1 mt-4 text-white-1 hover:text-white-5 hover:underline font-semibold">
         {isResending ? "Resending..." : "Resend verification code"}
      </button>
      <br/>
      <span className="ml-1 font-semibold text-sm text-white-1">
          {canResend ? "You can resend now" : `Expires in: ${formatTime(timer)}`}
      </span>
    </div>
  );
}