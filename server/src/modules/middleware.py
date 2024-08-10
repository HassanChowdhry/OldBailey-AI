import os, jwt, logging
from dotenv import load_dotenv
from flask import (
  request,
  abort,
  Response,
  g
)
import modules.services.auth as auth_service
load_dotenv()

JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')

def register_middlewares(app):
  # @app.before_request
  # def log_incoming(response: Response):
  #   pass
  
  @app.after_request
  def set_tokens(response: Response):
    
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    response.headers['Access-Control-Allow-Headers'] = "Authorization, Content-Type, authorization"
    response.headers['Access-Control-Expose-Headers'] = "Authorization, authorization"
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Allow-Methods'] = 'GET, OPTIONS, POST, PUT, DELETE'
    
    if 'user_email' not in g:
      return response

    access_token = auth_service.create_token(g.user_email, minutes=15)
    response.headers['Authorization'] = access_token

    return response

  @app.before_request
  def auth_guard():
    if (request.blueprint == 'auth' and request.url_rule.rule != '/api/v1/auth/verify') or request.method == 'OPTIONS':
      return
    
    if "Authorization" not in request.headers:
      raise abort(403, 'Forbidden')
    
    access_token = request.headers.get('Authorization').replace('Bearer ', '')
    refresh_token = request.cookies.get('refresh_token')
    
    # TODO: check if ok?
    if not access_token and not refresh_token:
      raise abort(403, 'Forbidden')
    
    try:
      payload = jwt.decode(access_token, JWT_SECRET_KEY, algorithms=['HS256'])
      g.user_email = payload['sub']
    except jwt.ExpiredSignatureError:
      try:
        payload = jwt.decode(refresh_token, JWT_SECRET_KEY, algorithms=['HS256'])
        g.user_email = payload['sub']
      except Exception as e:
        raise abort(403, 'Forbidden')
    except Exception as e:
      print(e)
      raise abort(401, e)
    