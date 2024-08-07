import os
from dotenv import load_dotenv
load_dotenv()

class Config:
  ENV = 'production'
  DEBUG = False
  TESTING = False
  
  # BASE_URL = os.getenv('BASE_URL')
  
  OPENAI_API_KEY= os.getenv('OPENAI_API_KEY')
  OPENAI_ASSISTANT_ID= os.getenv('OPENAI_ASSISTANT_ID')
  
  MONGO_URI = os.getenv('MONGO_URI_PROD')
  JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')

class ProdConfig(Config):
  """Prod config"""


class DevConfig(Config):
  """Dev config"""
  ENV = 'development'
  DEBUG = True
  MONGO_URI = os.getenv('MONGO_URI_LOCAL')
  JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY') or 'mysecretkey'
  # BASE_URL = os.getenv('BASE_URL') or 'http://localhost:8000/api/v1/'

class TestConfig(Config):
  """Test config"""
  ENV = 'development'
  DEBUG = True
  TESTING = True
  # BASE_URL = os.getenv('BASE_URL') or 'http://localhost:8000/api/v1/'
  # MONGO_URI = 'mongodb://localhost:27017/test'
  JWT_SECRET_KEY = 'fakesecretkey'
  OPENAI_API_KEY = 'fakekey'
  OPENAI_ASSISTANT_ID = 'fakeid'

