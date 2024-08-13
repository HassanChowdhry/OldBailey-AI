import os, redis
from pymongo.mongo_client import MongoClient
from dotenv import load_dotenv
load_dotenv()   

def get_db():
    """
    Configuration method to return collection
    """
    uri = os.getenv("MONGO_URI_LOCAL")

    client = MongoClient(uri)
    
    db = client['oldbailey']
    
    users = db['users'] 
    threads = db['threads']
    
    return users, threads
    
users, threads = get_db()

redis_client = redis.Redis(host='localhost', port=6379, db=0)