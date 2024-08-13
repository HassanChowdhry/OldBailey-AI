"use client";

import { Suspense } from "react";
import VerifyEmailContent from "@/components/VerifyEmailContent"; // Moved VerifyEmail component to a separate file

export default function VerifyEmail() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
