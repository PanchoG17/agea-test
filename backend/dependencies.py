from fastapi import HTTPException, Security, status
from fastapi.security import APIKeyHeader
from dotenv import load_dotenv
import os

from db_config import SessionLocal

load_dotenv()

api_key_variable = os.environ.get("X-API-KEY")
api_key_header = APIKeyHeader(name="X-API-KEY")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def validate_api_key(api_key: str = Security(api_key_header)):
    if api_key_header:
        if api_key_variable == api_key:
            return api_key_header
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail='invalidate api key'
            )
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='api key not found'
        )