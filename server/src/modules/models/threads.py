from pydantic import BaseModel
from typing import Optional, List
from openai.types.beta.threads.run import RequiredAction, LastError

class RunStatus(BaseModel):
  run_id: str
  thread_id: str
  status: str
  last_error: Optional[LastError]
  required_action: Optional[RequiredAction]
  
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