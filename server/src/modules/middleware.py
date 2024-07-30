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
import modules.services.auth as auth_service

JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')

def register_middlewares(app):
  @app.after_request
  def set_tokens(response: Response):
    if 'user' not in g:
      return response

    access_token, refresh_token = auth_service.create_tokens(g.user)
    response.set_cookie('access_token', access_token, httponly=True, secure=True, samesite='Lax', max_age=45*60)
    response.set_cookie('refresh_token', refresh_token, httponly=True, secure=True, samesite='Lax', max_age=7*24*60*60)
    return response

  
  @app.before_request
  def auth_guard():
    if request.blueprint == 'auth' and request.url_rule.rule != '/v1/auth/verify':
      return

    access_token = request.cookies.get('access_token')
    refresh_token = request.cookies.get('refresh_token')
    
    if not access_token or not refresh_token:
      raise abort(401, 'Unauthorized')
    
    try:
      payload = jwt.decode(access_token, JWT_SECRET_KEY, algorithms=['HS256'])
      g.user = payload['sub']
    except jwt.ExpiredSignatureError:
      try:
        payload = jwt.decode(refresh_token, JWT_SECRET_KEY, algorithms=['HS256'])
        g.user = payload['sub']
      except Exception as e:
        raise abort(401, e)
    