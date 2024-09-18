from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from db_config import engine, Base
from router import api_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=['*'],
    allow_headers=['*'],  
    allow_methods=['*'],
)

app.include_router(api_router, prefix='/api')