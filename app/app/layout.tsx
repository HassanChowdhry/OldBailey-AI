import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserContextProvider } from "@/context/UserContext";
import { ChatProvider } from "@/context/ChatContext";
import { Toaster } from "@/components/ui/toaster";
import "./globals.scss";
import "animate.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Old Bailey AI",
  description: "Old Bailey AI ChatBot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserContextProvider>
        <ChatProvider>
          {children}
          <Toaster />
        </ChatProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
