from pydantic import BaseModel
from typing import List

class RunStatus(BaseModel):
  run_id: str
  thread_id: str
  status: str
  
class ThreadMessage(BaseModel):
  content: str
  role: str
  hidden: bool
  id: str
  created_at: int

class Thread(BaseModel):
    messages: List[ThreadMessage]

class CreateMessage(BaseModel):
  content: str