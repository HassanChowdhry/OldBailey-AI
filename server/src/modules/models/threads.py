from pydantic import BaseModel
from typing import List

class RunStatus(BaseModel):
  run_id: str
  thread_id: str
  status: str
  
class ThreadMessage(BaseModel):
  id: str
  content: str
  role: str
  hidden: bool
  created_at: int

class Thread(BaseModel):
  thread_id: str
  title: str
  content: str
  user_id: str
  created_at: int
  messages: List[ThreadMessage]

class CreateMessage(BaseModel):
  content: str