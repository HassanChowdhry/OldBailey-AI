from modules.db import users
from modules.models.users import User, UserThread
import bcrypt

# Function to create a new user
def create_user(first_name, last_name, email, phone_number, password):
  """
  Creates a new user in the database.
  """
  hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
  user = {
    "first_name": first_name,
    "last_name": last_name,
    "email": email,
    "phone_number": phone_number,
    "password": hashed_password,
    "threads": []
  }
  
  users.insert_one(user)
  return find_user_by_email(email)

# Function to find a user by email
def find_user_by_email(email: str):
  user = users.find_one({"email": email})
  if user:
    threads = [
      UserThread(
        thread_id=thread['thread_id'],
        title=thread['thread_title'],
        created_at=int(thread['created_at'])
      ) for thread in user['threads']
    ]
    
    return User(
      id=str(user['_id']),
      first_name=user['first_name'],
      last_name=user['last_name'],
      email=user['email'],
      phone_number=int(user['phone_number']),
      threads=threads
    )
  else:
    return None  

def get_user_password(email: str):
  user = users.find_one({"email": email})
  if user:
    return user['password']
  else:
    return None

def verify_password(password, stored_password):
  return bcrypt.checkpw(password.encode('utf-8'), stored_password)