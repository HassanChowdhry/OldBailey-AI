from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os
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