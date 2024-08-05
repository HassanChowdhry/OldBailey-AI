export type UserModal = {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  threads?: UserThread[];
}

export type UserThread = {
  thread_id: string,
  title: string
  created_at: string,
}