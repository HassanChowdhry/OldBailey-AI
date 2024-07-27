from flask import Flask
from flask_cors import CORS
from .controller import threads, auth

def create_app():
  app = Flask(__name__)
  CORS(app)
  
  app.register_blueprint(threads, url_prefix="/api")
  app.register_blueprint(auth, url_prefix="/auth")
        
  return app