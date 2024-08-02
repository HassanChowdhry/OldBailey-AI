from flask import (
  Blueprint,
  request,
  jsonify,
  make_response,
  g
)
import modules.services.users as users_service
import modules.services.auth as auth_service

auth = Blueprint('auth', __name__)

# TODO: 
# Add Password Reset
# Add Email Verification
# Add password encryption from the frontend to the backend using jwt

@auth.route('/auth/login', methods=['POST'])
def login():
  data = request.get_json()
  email = data.get('email')
  password = data.get('password')
  
  if not all([email, password]):
    return jsonify({'error': 'Please enter both your email and password'}), 400

  user = users_service.find_user_by_email(email)
  if not user:
    return jsonify({'error': 'Unauthorized'}), 401
  
  # TODO: change this
  stored_password = users_service.get_user_password(email)
  if not users_service.verify_password(password, stored_password):
    return jsonify({'error': 'Unauthorized'}), 401
    
  response = make_response(jsonify({
    'user': user.model_dump()
  }), 201)

  g.user_email = email
  
  refresh_token = auth_service.create_token(email, days=3)
  response.set_cookie('refresh_token', refresh_token, httponly=True, samesite=None, secure=True)

  return response
  

@auth.route('/auth/signup', methods=['POST'])
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
  
  g.user_email = email
  refresh_token = auth_service.create_token(email, days=3)
  response.set_cookie('refresh_token', refresh_token, httponly=True, samesite=None, secure=True)
  
  return response

# Move to a different controller or middleware
@auth.route('/auth/verify', methods=['POST'])
def verify():
  email = g.user_email
  user = users_service.find_user_by_email(email)
  
  if not user:
    return jsonify({'error': 'User not found, please sign in'}), 404
  
  response = make_response(jsonify({
    'user': user.model_dump()
  }), 200)
  
  return response