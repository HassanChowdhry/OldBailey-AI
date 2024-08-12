import os, random, json
from modules.db import redis_client
from dotenv import load_dotenv

load_dotenv()
OTP_EXPIRATION = 600 # 10 minutes
    
def generate_otp():
    return str(random.randint(100000, 999999))

def store_otp(email, otp, user_data):
    key = f"otp:{email}"
    value = json.dumps({
        'otp': otp,
        'user_data': user_data
    })
    redis_client.setex(key, OTP_EXPIRATION, value)

def verify_otp(email, otp):
    key = f"otp:{email}"
    stored_data = redis_client.get(key)
    if stored_data:
        data = json.loads(stored_data)
        return data['otp'] == otp
    return False

def get_user_data(email):
    key = f"otp:{email}"
    stored_data = redis_client.get(key)
    if stored_data:
        data = json.loads(stored_data)
        return data['user_data']
    return None

def clear_otp(email):
    key = f"otp:{email}"
    redis_client.delete(key)

def otp_exists(email):
    key = f"otp:{email}"
    return redis_client.exists(key)

def update_otp(email, new_otp):
    key = f"otp:{email}"
    stored_data = redis_client.get(key)
    if stored_data:
        data = json.loads(stored_data)
        data['otp'] = new_otp
        redis_client.setex(key, OTP_EXPIRATION, json.dumps(data))
        return True
    return False

def send_otp_email(email, otp):
  print(f"Sending OTP {otp} to {email}")