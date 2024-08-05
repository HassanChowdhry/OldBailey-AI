"use client";

import { createContext, useContext, useReducer, ReactNode } from 'react';
import { Message } from '@/models/Thread';

type State = {
  messages: Message[];
}

type Action = {
  type: 'addMessage' | 'setMessages';
  payload: Message | Message[];
}


const initialState: State = {
  messages: []
};

function chatReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'addMessage':
      return { ...state, messages: [...state.messages, action.payload as Message] };
    case 'setMessages':
      return { ...state, messages: action.payload as Message[] };
    default:
      throw new Error('Unhandled action type');
  }
}


const ChatContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

export function ChatProvider({ children }: ChatProviderProps) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
