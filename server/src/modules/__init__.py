from flask import Flask
from flask_cors import CORS
from .controller import threads

def create_app():
  app = Flask(__name__)
  CORS(app)
  app.register_blueprint(threads, url_prefix="/api")
        
  return app