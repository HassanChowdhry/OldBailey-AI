from flask import Flask
from .controller import threads, THREADS_BASE_URL

def create_app():
  app = Flask(__name__)
  
  app.register_blueprint(threads, url_prefix=THREADS_BASE_URL)
        
  return app