import os
from dotenv import load_dotenv

load_dotenv()  # carrega o .env

auth = (os.getenv('AUTH_USERNAME'), os.getenv('AUTH_PASSWORD'))
rest_api = os.getenv('REST_API_ADDRESS')