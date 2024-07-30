import modules.services.users as users_service
import modules.services.auth as auth_service
from flask import (
  Blueprint,
  request,
  jsonify,
  make_response
)

auth = Blueprint('auth', __name__)

# TODO: 
# Add Password Reset
# Add Email Verification
# Add password encryption from the frontend to the backend using jwt

@auth.route('/login', methods=['POST'])
def login():
  data = request.get_json()
  email = data.get('email')
  password = data.get('password')
  
  if not all([email, password]):
    return jsonify({'error': 'Please enter both your email and password'}), 400

  user = users_service.find_user_by_email(email)
  if not user:
    return jsonify({'error': 'Unauthorized'}), 401
  
  stored_password = user['password']
  if not users_service.verify_password(password, stored_password):
    return jsonify({'error': 'Unauthorized'}), 401

  access_token, refresh_token = auth_service.create_tokens(email)
  response = make_response(jsonify({
    'user': user.model_dump()
  }), 201)

  # Set cookies
  fortyfive_minutes = 45*60
  seven_days = 7*24*60*60
  response.set_cookie('access_token', access_token, httponly=True, secure=True, samesite='Lax', max_age=fortyfive_minutes)
  response.set_cookie('refresh_token', refresh_token, httponly=True, secure=True, samesite='Lax', max_age=seven_days)

  return response
  


@auth.route('/register', methods=['POST'])
def register():
  data = request.json
  email = data.get('email')
  first_name = data.get('first_name')
  last_name = data.get('last_name')
  phone_number = data.get('phone_number')
  password = data.get('password')

  # prolly dont make phone a required field
  if not all([first_name, last_name, email, password]):
    return jsonify({'error': 'Missing required fields'}), 400
  
  if users_service.find_user_by_email(email):
    return jsonify({'error': 'User already exists'}), 400
  
  access_token, refresh_token = auth_service.create_tokens(email)
  
  user = users_service.create_user(
    first_name, 
    last_name, 
    email, 
    phone_number, 
    password
  )
  
  response = make_response(jsonify({
    'user': user.model_dump()
  }), 201)

  # Set cookies
  fortyfive_minutes = 45*60 # move to constants
  seven_days = 7*24*60*60
  response.set_cookie('access_token', access_token, httponly=True, secure=True, samesite='Lax', max_age=fortyfive_minutes)
  response.set_cookie('refresh_token', refresh_token, httponly=True, secure=True, samesite='Lax', max_age=seven_days)

  return response

# will come back to you on this one
@auth.route('/verify', methods=['POST'])
def verify():
  access_token = request.cookies.get('access_token')
  if not access_token:
    return jsonify({'error': 'Invalid Token, please log in'}), 401
  
  refresh_token = request.cookies.get('refresh_token')
  if not refresh_token:
    return jsonify({'error': 'Invalid refresh token, please log in'}), 401

  email, new_access_token = auth_service.decode_auth_token(access_token, refresh_token)
  
  if email in ['Signature expired. Please log in again.', 'Invalid token. Please log in again.']:
    return jsonify({'error': email}), 401
  
  user = users_service.find_user_by_email(email)
  
  if not user:
    return jsonify({'error': 'User not found, please sign in'}), 404
  
  response = make_response(jsonify({
    'user': user.model_dump()
  }), 200)
  
  if access_token != new_access_token:
    response.set_cookie('access_token', new_access_token, httponly=True, secure=True, samesite='Lax', max_age=45*60)

  return response