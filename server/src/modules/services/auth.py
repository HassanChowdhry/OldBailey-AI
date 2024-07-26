import jwt
import os
from dotenv import load_dotenv
load_dotenv()
import datetime

JWT_SECRET_KEY = os.getenv('SECRET_KEY')

def create_token(email: str, days: int = 0, minutes: int = 0):
  now = datetime.datetime.now(datetime.timezone.utc)
  payload = {
      'exp': now + datetime.timedelta(days=days, minutes=minutes),
      'iat': now,
      'sub': email
  }
  return jwt.encode(payload, JWT_SECRET_KEY, algorithm='HS256')

def refresh_access_token(refresh_token):
  try:
      payload = jwt.decode(refresh_token, JWT_SECRET_KEY, algorithms=['HS256'])
      email = payload['sub']
      access_token = create_token(email, minutes=45)
      return access_token
  except jwt.ExpiredSignatureError:
      raise Exception("Refresh token has expired")
  except jwt.InvalidTokenError:
      raise Exception("Invalid refresh token")

def decode_auth_token(auth_token):
  try:
    payload = jwt.decode(auth_token, JWT_SECRET_KEY, algorithms=['HS256'])
    return payload['sub']
  except jwt.ExpiredSignatureError:
      return 'Signature expired. Please log in again.'
  except jwt.InvalidTokenError:
      return 'Invalid token. Please log in again.'