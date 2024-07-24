from flask import (
  Blueprint,
  request,
  jsonify,
  g
)
import jwt

auth =  Blueprint('auth', __name__)

# jwt token, bcrypt/sha1 password hashing, email verification?

@auth.route('/login', methods=['POST'])
def login():
  pass

@auth.route('/logout', methods=['POST'])
def logout():
  pass

@auth.route('/register', methods=['POST'])
def register():
  pass

@auth.route('/verify', methods=['POST'])
def verify():
  pass