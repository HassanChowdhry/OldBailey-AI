"use client";
import React, { useState, createContext, ReactNode } from "react";
import { UserModal } from "@/models/User";

type AppProviderProps =  {
  children: ReactNode;
}

// replce with user modals
type UserContextType = {
  user: UserModal | null;
  setUser: Function;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserModal | null>(null);
  //perhaps put the verify here?
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}