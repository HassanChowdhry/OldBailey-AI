from pydantic import BaseModel
from typing import List

class UserThread(BaseModel):
  thread_id: str
  title: str
  created_at: int
  
class User(BaseModel):
  id: str
  first_name: str
  last_name: str
  email: str
  phone_number: int
  threads: List[UserThread] = []

