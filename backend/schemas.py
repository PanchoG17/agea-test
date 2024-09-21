from pydantic import BaseModel, HttpUrl
from typing import List

class UrlDevice(BaseModel):
    path: HttpUrl
    device: str

class ComparisonRequest(BaseModel):
    urls: List[UrlDevice]