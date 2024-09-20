from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from dependencies import validate_api_key, get_db
from service import APIService
from schemas import ComparisonRequest

api_router = APIRouter()

@api_router.post(
    "/compare-endpoints",
    description="Endpoint para comparar las URLs ingresadas",
    status_code=200,
    dependencies=[Depends(validate_api_key)],
)
async def compare_endpoints(urls: ComparisonRequest, db: Session = Depends(get_db)):
    try:
        api_service = APIService(db=db)
        response = await api_service.get_comparison(urls)
        return response

    except Exception as e:
        raise e