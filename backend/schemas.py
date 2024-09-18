from pydantic import BaseModel, HttpUrl, Field
from typing import List

class ComparisonRequest(BaseModel):
    urls: List[HttpUrl] = Field(..., min_items=2)