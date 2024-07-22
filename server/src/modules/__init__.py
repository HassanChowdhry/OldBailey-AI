from flask import Flask
from .controller import threads

def create_app():
  app = Flask(__name__)
  
  app.register_blueprint(threads, url_prefix="/api")
        
  return app