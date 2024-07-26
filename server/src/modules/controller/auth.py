import modules.services.users as users_service
import modules.services.auth as auth_service
from flask import (
  Blueprint,
  request,
  jsonify,
  g
)
import jwt

auth = Blueprint('auth', __name__)

# jwt token, bcrypt/sha1 password hashing, email verification?

@auth.route('/login', methods=['POST'])
def login():
  try:
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not all([email, password]):
      return jsonify({'error': 'Missing required fields'}), 400

    user = users_service.find_user_by_email(email)
    stored_password = users_service.get_user_password(email)
    if not user:
      return jsonify({'error': 'Invalid Email'}), 404
    
    if users_service.verify_password(password, stored_password):
      access_token = auth_service.create_token(email, minutes=45)
      refresh_token = auth_service.create_token(email, days=7)
      return jsonify({
        'access_token': access_token,
        'refresh_token': refresh_token,
        'user': user.model_dump()
      }), 200
    else:
      return jsonify({'error': 'Invalid Password'}), 400
    
  except Exception as e:
    return jsonify({'error': str(e)}), 400

@auth.route('/logout', methods=['POST'])
def logout():
  pass

# TODO: Implement email verification + tokens
@auth.route('/register', methods=['POST'])
def register():
  try:
    data = request.json
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    phone_number = data.get('phone_number')
    password = data.get('password')

    if not all([first_name, last_name, email, phone_number, password]):
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
    
    access_token = auth_service.create_token(email, minutes=45)
    refresh_token = auth_service.create_token(email, days=7)
    return jsonify({
        'access_token': access_token,
        'refresh_token': refresh_token, # perhaps set in cookies?
        'user': user.model_dump()
      }), 201
    
  except Exception as e:
    return jsonify({'error': str(e)}), 400

# TODO: implement refresh for tokens
@auth.route('/verify', methods=['POST'])
def verify():
  auth_token = request.headers.get('Authorization')
  if not auth_token:
    return jsonify({'error': 'No token provided'}), 401
  
  auth_token = auth_token.split(' ')[1]
  email = auth_service.decode_auth_token(auth_token)
  
  if email in ['Signature expired. Please log in again.', 'Invalid token. Please log in again.']:
    return jsonify({'error': email}), 401
  
  user = users_service.find_user_by_email(email)
  if user:
    return jsonify({'message': 'User verified'}), 200
  else:
    return jsonify({'error': 'User not found'}), 404