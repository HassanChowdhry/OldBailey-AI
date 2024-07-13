from flask import Flask, render_template
import os

app = Flask(__name__)


@app.route('/', methods=['GET'])
def home():
    return "Hello world!"


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 8000))
    app.run(debug=True, host='0.0.0.0', port=port)