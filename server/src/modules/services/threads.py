import uuid
from modules.models.threads import *
from modules.db import threads

# Function to create a new thread
def create_thread(thread: Thread):
  threads.insert_one(thread.model_dump())

# Function to update a thread's content
def update_thread_content(thread_id, new_content):
  """
  Updates a thread's content in the database.

  Args:
    thread_id (int): The ID of the thread to update.
    new_content (str): The new content for the thread.
  """
  pass

# Function to get a thread by ID
def get_thread(thread_id):
  return threads.find_one({"thread_id": thread_id})
  

# Function to delete a thread
def delete_thread(thread_id):
  """
  Deletes a thread from the database.

  Args:
    thread_id (int): The ID of the thread to delete.
  """
  pass


########################### Messages ###########################

def put_messages(thread_id: str, message_model: ThreadMessage, response_model: ThreadMessage):
  threads.update_one(
    {"thread_id": thread_id}, 
    {
      "$push": {
          "messages": {
              "$each": [message_model.model_dump(), response_model.model_dump()]
          }
      }
    }
  )
# Function to create a new message
def create_message(thread_id, content, user_id):
  """
  Creates a new message in the database.

  Args:
    thread_id (int): The ID of the thread the message belongs to.
    content (str): The content of the message.
    user_id (int): The ID of the user who created the message.

  Returns:
    int: The ID of the newly created message.
  """
  pass

# Function to get messages by thread ID
def get_messages_by_thread_id(thread_id):
  return threads.find_one({"thread_id": thread_id})['messages']