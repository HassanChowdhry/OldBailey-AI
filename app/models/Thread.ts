export type Thread = {
  thread_id: string;
  creaded_at: number;
  messages: Message[];
}

export type Message = {
  message_id?: string;
  content: string;
  role: string;
  created_at: number;
}

export type Run = {
  thread_id: string;
  status: string;
}