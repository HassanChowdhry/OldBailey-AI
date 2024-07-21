from flask import (
  Blueprint
)

from .registry import *

threads = Blueprint('threads', __name__)

@threads.route('/', methods=['POST'])
def post_new_thread():
  return 'new thread'

@threads.route('/', methods=['GET'])
def get_threads():
  return 'check thread'

@threads.route(THREAD_ID_URL, methods=['GET'])
def get_thread(thread_id):
  return 'get thread'

@threads.route(THREAD_ID_URL, methods=['POST'])
def post_message_in_thread(thread_id):
  return 'new message'