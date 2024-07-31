from pydantic import BaseModel
from typing import List, Optional

class UserThread(BaseModel):
  thread_id: str
  title: str
  created_at: int
  
  
class User(BaseModel):
  user_id: str
  first_name: str
  last_name: str
  email: str
  phone_number: Optional[int] = None
  threads: List[UserThread] = []

