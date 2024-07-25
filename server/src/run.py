import os
from modules import create_app
from dotenv import load_dotenv
load_dotenv()

if __name__ == "__main__":
    app = create_app()
    app.config['MONGO_URI'] = os.getenv("MONGO_URI")
    app.run(port=8000, host="0.0.0.0", debug=True)