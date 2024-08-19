import random, json, boto3
from botocore.exceptions import ClientError
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
        return int(data['otp']) == int(otp)
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
    print(f'OTP {otp} sent to {email}')
    SENDER = "oldbailey@hassanchowdhry.live"

    RECIPIENT = email

    SUBJECT = "Your One-Time Password (OTP) for OldBaileyAI"

    # The email body for recipients with non-HTML email clients.
    BODY_TEXT = ("Amazon SES Test (Python)\r\n"
                f"Your OTP is: {otp} \r\n"
                "This email was sent with Amazon SES using the "
                "AWS SDK for Python (Boto)."
                )

    BODY_HTML = f"""
    <html>
        <head></head>
        <body>
            <p>Dear {email},</p>
            <p>
                <p><strong>Your One-Time Password (OTP) for logging into OldBaileyAI is : <em>{otp}</em> \r\n</strong></p>
                
                <p>Please enter this code on the website to verify your email address and complete the login process. This OTP is valid for the next 10 minutes.</p>

                <p>If you did not request this, please ignore this email.</p>
                
                <p>
                    Thank you,
                    Hassan
                </p>
            </p>
        </body>
    </html>
                """            
    CHARSET = "UTF-8"

    client = boto3.client('ses')

    try:
        response = client.send_email(
            Destination={
                'ToAddresses': [
                    RECIPIENT,
                ],
            },
            Message={
                'Body': {
                    'Html': {
                        'Charset': CHARSET,
                        'Data': BODY_HTML,
                    },
                    'Text': {
                        'Charset': CHARSET,
                        'Data': BODY_TEXT,
                    },
                },
                'Subject': {
                    'Charset': CHARSET,
                    'Data': SUBJECT,
                },
            },
            Source=SENDER,
        )
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        print(f'OTP {otp} sent to {email}')