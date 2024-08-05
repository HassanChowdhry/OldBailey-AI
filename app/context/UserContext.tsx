"use client";
import React, { useState, createContext, ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { UserModal } from "@/models/User";
import { useToast } from "@/components/ui/use-toast";

type AppProviderProps =  {
  children: ReactNode;
}

// replce with user modals
type UserContextType = {
  user: UserModal | null;
  setUser: Function;
}

export const UserContext = createContext<UserContextType>({ user: {}, setUser: () => {} } as unknown as UserContextType);

export const UserContextProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserModal | null>(null);
  const router = useRouter();
  const API_BASE_URL = "http://localhost:8000"
  const { toast } = useToast();
  const param = usePathname();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      if (param !== "/" && param !== "/signup" && param !== "/login") {
        router.push("/");
        toast({ title: "Please Login to continue", variant: "destructive" });
      }

      return;
    };
    
    const verifyToken = async () => {

      try {
        const res = await fetch(`${API_BASE_URL}/v1/auth/verify`, { 
          method: "POST",
          headers: { 
            'Authorization': `Bearer ${sessionStorage.getItem('token') ?? '' }`
          }
        });
          
        if (!res.ok) {
          router.push("/");
          toast({ title: "Please login to continue", variant: "destructive" });
          sessionStorage.removeItem("token");
          return;
        }
    
        const new_token = res.headers.get("Authorization");
        if (new_token) sessionStorage.setItem("token", new_token);
        
        const data = await res.json();
        if (!data || !data.user) {
          sessionStorage.removeItem("token");
          throw new Error("Invalid data");
        }

        setUser(data.user);
        if (param === "/" || param === "/signup" || param === "/login") {
          router.push("/chat");
        }
      } catch (error) {
        console.error(error);
      }
    };

    verifyToken();
  }, []);
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}