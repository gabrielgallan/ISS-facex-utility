import os
from dotenv import load_dotenv

load_dotenv()  # carrega o .env

AUTH = (os.getenv('AUTH_USERNAME'), os.getenv('AUTH_PASSWORD'))
REST_API = os.getenv('REST_API_ADDRESS')
VALID_USERNAME = os.getenv('AUTH_USERNAME')
VALID_PASSWORD = os.getenv('AUTH_PASSWORD')