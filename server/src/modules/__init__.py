import logging
from flask import Flask
from flask_cors import CORS
from .controller import threads, auth
from .middleware import register_middlewares

def create_app():
  app = Flask(__name__)
  CORS(
    app,
    origins=["*"],
    expose_headers=["Authorization", "authorization"],
    allow_headers=["Authorization", "Content-Type", "authorization"],
    supports_credentials=True,
  )
  
  register_middlewares(app)
  app.register_blueprint(threads, url_prefix="/api/v1")
  app.register_blueprint(auth, url_prefix="/api/v1")
        
  return app