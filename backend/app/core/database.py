from dotenv import load_dotenv
import os

from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

from app.models.base import Base
from app.models.user import User
from app.models.conversation import Conversation
from app.models.message import Message

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)


SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


if __name__ == "__main__":

    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
            print("✅ Connected to Neon PostgreSQL successfully!")

    except Exception as e:
        print("❌ Database connection failed!")
        print(e)

    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created!")