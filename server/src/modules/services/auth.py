import jwt, os, datetime
from dotenv import load_dotenv
load_dotenv()

JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')

def create_token(email: str, minutes: int = 0, days: int = 0):
  now = datetime.datetime.now(datetime.timezone.utc)
  payload = {
    'exp': now + datetime.timedelta(minutes=minutes, days=days),
    'iat': now,
    'sub': email
  }
  
  token = jwt.encode(payload, JWT_SECRET_KEY, algorithm='HS256')
  return token
