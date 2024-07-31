import jwt
import os
from flask import (
  jsonify,
  make_response,
  request,
  abort,
  Response,
  g
)
from dotenv import load_dotenv
load_dotenv()
import datetime

JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')

def register_middlewares(app):
  @app.after_request
  def set_tokens(response: Response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = "Authorization, Content-Type, authorization"
    response.headers['Access-Control-Expose-Headers'] = "Authorization, authorization"
    if 'user_email' not in g:
      return response

    now = datetime.datetime.now(datetime.timezone.utc)
    payload = {
      'exp': now + datetime.timedelta(minutes=45),
      'iat': now,
      'sub': g.user_email
    }
    access_token = jwt.encode(payload, JWT_SECRET_KEY, algorithm='HS256')    
    response.headers['Authorization'] = access_token

    return response
  
    # access_token, refresh_token = auth_service.create_tokens(g.user)
    # response.set_cookie('access_token', access_token, httponly=True, secure=True, samesite=None, max_age=45*60)
    # response.set_cookie('refresh_token', refresh_token, httponly=True, secure=True, samesite=None, max_age=7*24*60*60)

  
  # TODO: Store refresh in either cache or database
  @app.before_request
  def auth_guard():
    if (request.blueprint == 'auth' and request.url_rule.rule != '/v1/auth/verify') or request.method == 'OPTIONS':
      return
    
    print(request.headers)

    if "Authorization" not in request.headers:
      raise abort(403, 'Unauthorized')
    
    access_token = request.headers.get('Authorization').replace('Bearer ', '')
  
    if not access_token:
      raise abort(403, 'you stupid')
    
    try:
      payload = jwt.decode(access_token, JWT_SECRET_KEY, algorithms=['HS256'])
      g.user_email = payload['sub']
    except jwt.ExpiredSignatureError:
      raise abort(403, 'Unauthorized')
    except Exception as e:
      raise abort(401, e)
    
      # refresh_token = request.cookies.get('refresh_token')
      # if not access_token or not refresh_token:
      # try:
      #   payload = jwt.decode(refresh_token, JWT_SECRET_KEY, algorithms=['HS256'])
      #   g.user = payload['sub']