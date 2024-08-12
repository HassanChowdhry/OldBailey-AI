"use client";
import React, { useState, createContext, ReactNode, useEffect, useContext, useReducer } from "react";
import { useRouter, usePathname } from "next/navigation";
import { UserModal, UserThread } from "@/models/User";
import { useToast } from "@/components/ui/use-toast";
import { AUTH_BASE_URL } from "@/controllers/auth";

type AppProviderProps =  {
  children: ReactNode;
}

type State = {
  threads: UserThread[];
}

type Action = {
  type: 'addThreads' | 'setThreads' | 'removeThread';
  payload: UserThread | UserThread[] | string;
}

const initialState: State = {
  threads: []
};

type UserContextType = {
  user: UserModal | null;
  setUser: Function;
  threadsState: State;
  threadsDispatch: React.Dispatch<Action>;
}

function threadsReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'addThreads':
      return { ...state, threads: [...state.threads, action.payload as UserThread] };
    case 'setThreads':
      return { ...state, threads: action.payload as UserThread[] };
    case 'removeThread':
      return { ...state, threads: state.threads.filter(thread => thread.thread_id !== action.payload) };
    default:
      throw new Error('Unhandled action type');
  }
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserModal | null>(null);
  const [threadsState, threadsDispatch] = useReducer(threadsReducer, initialState);

  const router = useRouter();
  const { toast } = useToast();
  const param = usePathname();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      if (param !== "/" && param !== "/signup" && param !== "/login" && param !== "/verify-email") {
        router.push("/");
        toast({ title: "Please Login to continue", variant: "destructive" });
      }

      return;
    };
    
    const verifyToken = async () => {

      try {
        const res = await fetch(`${AUTH_BASE_URL}/verify`, { 
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

        const user = data.user;
        threadsDispatch({ type: "setThreads", payload: user.threads });
        setUser(user);

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
    <UserContext.Provider value={{ user, setUser, threadsState, threadsDispatch }}>
      {children}
    </UserContext.Provider>
  );
}


export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useThreadContext must be used within a ThreadProvider');
  }
  return context;
}
