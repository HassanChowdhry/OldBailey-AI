import os
from dotenv import load_dotenv
load_dotenv()
from flask import (
  Blueprint,
  jsonify,
  request,
)
from typing import Dict
import json
from openai import OpenAI
from .registry import *
from modules.models import *
import modules.services.ngramsapi as ngrams

threads = Blueprint('threads', __name__)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
assistant_id = os.getenv("OPENAI_ASSISTANT_ID")

@threads.route(THREADS_BASE_URL, methods=['POST'])
def post_new_thread():
  # try catch ?
  thread = client.beta.threads.create()
  thread_id = jsonify(thread.id)
  return thread_id, 201
  
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
    if hasattr(message.content[0], 'text') and message.content[0].text.value.strip()
  ]
  
  thread = Thread(messages=res)
  return jsonify(thread.model_dump())

@threads.route("/threads/<thread_id>", methods=['POST'])
def post_message_in_thread(thread_id):
  message = CreateMessage(content=request.json['content'])
  model = request.json['model']
  
  client.beta.threads.messages.create(
    thread_id=thread_id,
    content=message.content,
    role="user"
  )
  
  run = client.beta.threads.runs.create_and_poll(
    thread_id=thread_id,
    assistant_id=assistant_id,
    model=model
  )

  if run.status == 'requires_action':
    run = __usengrams(run, thread_id)
  
  run_status = RunStatus(
    run_id=run.id,
    thread_id=thread_id,
    status=run.status,
  )
  
  return jsonify(run_status.model_dump())


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