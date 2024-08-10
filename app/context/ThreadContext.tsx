"use client";
import React, { createContext, useState, useContext, ReactNode } from 'react';

type ThreadContextType = {
  threadId: string;
  setThreadId: React.Dispatch<React.SetStateAction<string>>;
}

const ThreadContext = createContext<ThreadContextType | undefined>(undefined);

export function ThreadProvider({ children }: { children: ReactNode }) {
  const [threadId, setThreadId] = useState('');

  return (
    <ThreadContext.Provider value={{ threadId, setThreadId }}>
      {children}
    </ThreadContext.Provider>
  );
}

export function useThreadContext() {
  const context = useContext(ThreadContext);
  if (!context) {
    throw new Error('useThreadContext must be used within a ThreadProvider');
  }
  return context;
}
