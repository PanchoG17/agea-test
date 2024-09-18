from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os
load_dotenv()


config = {
    "DB_HOST"       : os.environ.get("DB_HOST"),
    "DB_USER"       : os.environ.get("DB_USER_NAME"),
    "DB_PASSWORD"   : os.environ.get("DB_PASSWORD"),
    "DB_NAME"       : os.environ.get("DB_NAME"),
    "DB_PORT"       : os.environ.get("DB_PORT")
}
DATABASE_URL = f"mysql+pymysql://{config['DB_USER']}:{config['DB_PASSWORD']}@{config['DB_HOST']}:{config['DB_PORT']}/{config['DB_NAME']}"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()