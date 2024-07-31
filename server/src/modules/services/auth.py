import jwt
import os
from dotenv import load_dotenv
load_dotenv()
import datetime

JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')

#TODO: Store refresh in either cache or database
def create_tokens(email: str):
  now = datetime.datetime.now(datetime.timezone.utc)
  payload = {
    'exp': now + datetime.timedelta(minutes=45),
    'iat': now,
    'sub': email
  }
  access_token = jwt.encode(payload, JWT_SECRET_KEY, algorithm='HS256')
  
  payload = {
    'exp': now + datetime.timedelta(days=7),
    'iat': now,
    'sub': email
  }
  
  refresh_token = jwt.encode(payload, JWT_SECRET_KEY, algorithm='HS256')
  
  return access_token, refresh_token
  
def refresh_access_token(refresh_token):
  try:
      payload = jwt.decode(refresh_token, JWT_SECRET_KEY, algorithms=['HS256'])
      email = payload['sub']
      return create_tokens(email)
  except jwt.ExpiredSignatureError:
      raise Exception("Refresh token has expired")
  except jwt.InvalidTokenError:
      raise Exception("Invalid refresh token")
