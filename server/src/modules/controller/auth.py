from flask import (
  Blueprint,
  request,
  jsonify,
  make_response,
  g
)
import modules.services.users as users_service
import modules.services.auth as auth_service
import modules.services.otp as otp_service

auth = Blueprint('auth', __name__)

# TODO: 
# Add Password Reset
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


  if not all([first_name, last_name, email, password]):
    return jsonify({'error': 'Missing required fields'}), 400
  
  if users_service.find_user_by_email(email):
    return jsonify({'error': 'User already exists'}), 400
  
  otp = otp_service.generate_otp()
  
  otp_service.store_otp(email, otp, {
      'first_name': first_name,
      'last_name': last_name,
      'email': email,
      'phone_number': phone_number,
      'password': password
  })
  
  otp_service.send_otp_email(email, otp)
  
  return jsonify({'message': f'OTP sent to {email} successfully'}), 200

@auth.route('/auth/verify-otp', methods=['POST'])
def verify_otp():
    data = request.json
    email = data.get('email')
    otp = data.get('otp')
    
    if not all([email, otp]):
      return jsonify({'error': 'Missing email or OTP'}), 400

    if not otp_service.verify_otp(email, otp):
      return jsonify({'error': 'Wrong OTP entered try again'}), 400

    user_data = otp_service.get_user_data(email)
    
    if not user_data:
        return jsonify({'error': 'User data not found'}), 400

    user = users_service.create_user(
        user_data['first_name'],
        user_data['last_name'],
        user_data['email'],
        user_data['phone_number'],
        user_data['password'],
    )

    otp_service.clear_otp(email)

    response = make_response(jsonify({
        'user': user.model_dump()
    }), 201)

    g.user_email = email
    refresh_token = auth_service.create_token(email, days=3)
    response.set_cookie('refresh_token', refresh_token, httponly=True, samesite=None, secure=True)

    return response
  
@auth.route('/auth/resend-otp', methods=['POST'])
def resend_otp():
    data = request.json
    email = data.get('email')

    if not email:
        return jsonify({'error': 'Missing email'}), 400

    if not otp_service.otp_exists(email):
        return jsonify({'error': 'No pending signup for this email'}), 400

    new_otp = otp_service.generate_otp()
    
    if otp_service.update_otp(email, new_otp):
        otp_service.send_otp_email(email, new_otp)
        return jsonify({'message': f'OTP resent to {email} successfully'}), 200
    else:
        return jsonify({'error': 'Failed to update OTP'}), 400
  

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