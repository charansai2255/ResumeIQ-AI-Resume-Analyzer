from pathlib import Path
import os

from dotenv import load_dotenv
from sqlalchemy import create_engine

BASE_DIR = Path(__file__).resolve().parents[2]
load_dotenv(BASE_DIR / ".env")

DATABASE_URL = os.getenv("DATABASE_URL")

print("Database connected successfully.")

if DATABASE_URL is None:
    raise ValueError("DATABASE_URL is not loaded!")

engine = create_engine(DATABASE_URL)