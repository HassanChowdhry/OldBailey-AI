import os
from dotenv import load_dotenv
load_dotenv()
from flask import (
  Blueprint,
  Response,
  jsonify,
  request,
)
from openai import OpenAI
from .registry import *
from modules.models import *

threads = Blueprint('threads', __name__)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
assistant_id = os.getenv("OPENAI_ASSISTANT_ID")

@threads.route(THREADS_BASE_URL, methods=['POST'])
def post_new_thread():
  # try catch ?
  thread = client.beta.threads.create()
  return Response(
    response=thread.id,
    status=201,
    mimetype="application/json"
  )
  
@threads.route("/threads/<thread_id>", methods=['GET'])
def get_thread(thread_id):
  messages = client.beta.threads.messages.list(thread_id=thread_id)
  
  res = [
    ThreadMessage(
      content=message.content[0].text.value,
      role=message.role,
      hidden="type" in message.metadata and message.metadata["type"] == "hidden",
      id=message.id,
      created_at=message.created_at
    )
    for message in messages.data
  ]
  
  thread = Thread(messages=res)
  return jsonify(thread.model_dump())

@threads.route("/threads/<thread_id>", methods=['POST'])
def post_message_in_thread(thread_id):
  message = CreateMessage(content=request.json['message'])
  
  client.beta.threads.messages.create(
    thread_id=thread_id,
    content=message.content,
    role="user"
  )
  
  run = client.beta.threads.runs.create_and_poll(
    thread_id=thread_id,
    assistant_id=assistant_id
  )
  
  run_status = RunStatus(
    run_id=run.id,
    thread_id=thread_id,
    status=run.status,
    last_error=run.last_error,
    required_action=run.required_action
  )
  
  return jsonify(run_status.model_dump())
