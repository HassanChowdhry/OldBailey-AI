import os, json, datetime
from flask import (
  Blueprint,
  jsonify,
  request,
  g
)
from dotenv import load_dotenv
from typing import Dict
from openai import OpenAI
from .registry import *
from modules.models import *
import modules.services.ngramsapi as ngrams
import modules.services.threads as threads_service
import modules.services.users as users_service
load_dotenv()

threads = Blueprint('threads', __name__)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
assistant_id = os.getenv("OPENAI_ASSISTANT_ID")

@threads.route('/threads', methods=['POST'])
def post_new_thread():
  user_email = g.user_email
  thread = client.beta.threads.create()
  
  thread_model = (
    Thread(
      thread_id=thread.id,
      user_email=user_email,
      created_at=thread.created_at,
    )
  )
  
  user_thread_model = (
    UserThread(
      thread_id=thread.id,
      created_at=thread.created_at
    )
  )
  
  threads_service.create_thread(thread_model)
  users_service.add_thread_to_user(user_email, user_thread_model)
  
  return jsonify(thread_model.model_dump()), 201
  
@threads.route("/threads/<thread_id>", methods=['GET'])
def get_thread(thread_id):
  messages = threads_service.get_messages_by_thread_id(thread_id)  
  return jsonify(messages), 200

@threads.route("/threads/<thread_id>", methods=['POST'])
def post_message_in_thread(thread_id):
  model = request.json.get('model', 'gpt-3.5-turbo')
  content = request.json['content']
  role = 'user'
  
  message = client.beta.threads.messages.create(
    thread_id=thread_id,
    content=content,
    role=role
  )
  
  message_model = ThreadMessage(
    message_id=message.id,
    content=content,
    role=role,
    created_at=message.created_at
  )
  
  run = client.beta.threads.runs.create(
    thread_id=thread_id,
    assistant_id=assistant_id,
    model=model,
    stream=True
  )
  
  for r in run:
    if r.event == "thread.message.completed":
      response = r.data

  if not response:
    return jsonify({ "message": "no" }), 200
  
  # TODO:
  # if run.status == 'requires_action':
  #   run = __usengrams(run, thread_id)

  response_content = "\n".join([content.text.value for content in response.content])
  
  response_model = ThreadMessage(
    message_id=response.id,
    content=response_content,
    role=response.role,
    created_at=(response.created_at+1) # incase of same created_at
  )

  threads_service.put_messages(thread_id, message_model, response_model)
  
  return jsonify(response_model.model_dump()), 201

def __usengrams(run, thread_id):
  tool_outputs = []
 
  for tool in run.required_action.submit_tool_outputs.tool_calls:
    args = __args_to_dict(tool.function.arguments)
    res = ngrams.get_word_trends(**args)

    if tool.function.name == "get_word_trends":
      tool_outputs.append({
        "tool_call_id": tool.id,
        "output": res
      })
  
  if tool_outputs:
    try:
      run = client.beta.threads.runs.submit_tool_outputs_and_poll(
        thread_id=thread_id,
        run_id=run.id,
        tool_outputs=tool_outputs
      )
    except Exception as e:
      raise e
  
  return run

def __args_to_dict(tool: str) -> Dict[str, str]:
  return json.loads(tool)