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

# TODO: Update this
def send_otp_email(email, otp):
    print(f'OTP {otp} sent to {email}')
    SENDER = "mohammedchowdhry11@gmail.com"

    RECIPIENT = email

    SUBJECT = "Amazon SES Test (SDK for Python)"

    # The email body for recipients with non-HTML email clients.
    BODY_TEXT = ("Amazon SES Test (Python)\r\n"
                f"Your OTP is: {otp} \r\n"
                "This email was sent with Amazon SES using the "
                "AWS SDK for Python (Boto)."
                )
                
    BODY_HTML = f"""<html>
    <head></head>
    <body>
    <h1>Amazon SES Test (SDK for Python)</h1>
    <p>This email was sent with
        <strong>Your OTP is: <em>{otp}</em> \r\n</strong>
        <a href='https://aws.amazon.com/ses/'>Amazon SES</a> using the
        <a href='https://aws.amazon.com/sdk-for-python/'>
        AWS SDK for Python (Boto)</a>.</p>
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