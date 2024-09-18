from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from dependencies import validate_api_key, get_db
from service import APIService

api_router = APIRouter()

@api_router.post(
    "/compare-endpoints",
    description="Endpoint para comparar las URLs ingresadas",
    status_code=200,
    dependencies=[Depends(validate_api_key)],
)
def compare_endpoints(db: Session = Depends(get_db)):
    try:
        api_service = APIService(db=db)
        response = api_service.get_comparison()
        return response

    except Exception as e:
        raise e