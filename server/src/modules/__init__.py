from flask import Flask
from flask_cors import CORS
from .controller import threads, auth
import os
from dotenv import load_dotenv
load_dotenv()

def create_app():
  app = Flask(__name__)
  CORS(app)
  
  app.config["MONGO_URI"] = os.getenv("MONGO_URI")
  app.register_blueprint(threads, url_prefix="/api")
  app.register_blueprint(auth, url_prefix="/auth")
        
  return app