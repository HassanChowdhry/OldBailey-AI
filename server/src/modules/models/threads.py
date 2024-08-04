from pydantic import BaseModel
from typing import List

class RunStatus(BaseModel):
  run_id: str
  thread_id: str
  status: str
  
class ThreadMessage(BaseModel):
  message_id: str
  content: str
  role: str
  created_at: int

# class Thread(BaseModel):
#   messages: List[ThreadMessage]
class Thread(BaseModel):
  thread_id: str
  title: str = None
  user_email: str
  created_at: int
  messages: List[ThreadMessage] = []

class CreateMessage(BaseModel):
  content: str