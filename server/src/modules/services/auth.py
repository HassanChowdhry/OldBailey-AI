import jwt
import os
from dotenv import load_dotenv
load_dotenv()
import datetime

JWT_SECRET_KEY = os.getenv('SECRET_KEY') or 'my_precious'

def create_tokens(email: str, refresh: bool = False):
  now = datetime.datetime.now(datetime.timezone.utc)
  payload = {
    'exp': now + datetime.timedelta(minutes=45),
    'iat': now,
    'sub': email
  }
  print(JWT_SECRET_KEY)
  access_token = jwt.encode(payload, JWT_SECRET_KEY, algorithm='HS256')

  if refresh: return access_token
  
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
      access_token = create_tokens(email, refresh=True)
      return access_token
  except jwt.ExpiredSignatureError:
      raise Exception("Refresh token has expired")
  except jwt.InvalidTokenError:
      raise Exception("Invalid refresh token")

def decode_auth_token(access_token, refresh_token):
  try:
    payload = jwt.decode(access_token, JWT_SECRET_KEY, algorithms=['HS256'])
    return payload['sub'], access_token
  except jwt.ExpiredSignatureError:
      try:
        new_access_token = refresh_access_token(refresh_token)
        return decode_auth_token(new_access_token, refresh_token)
      except Exception as e:
        return e
  except jwt.InvalidTokenError:
      return 'Invalid token. Please log in again.'