from sqlalchemy.orm import Session
from dotenv import load_dotenv
import requests
import os

from schemas import ComparisonRequest
from db_models import Comparison, EndpointResult

load_dotenv()

class APIService():

    def __init__(self, db:Session):
        self.__db = db
        self.__api_endpoint = os.environ.get("API_ENDPOINT")

    # Private methods
    def __fetch_api(self, params: dict) -> dict:
        """Realiza llamado al endpoint de API de Google Pagespeed"""
        
        try:
            response = requests.get(url=self.__api_endpoint, params=params)

            if response.status_code == 200:
                data = response.json()
                speed_index = data['lighthouseResult']['audits']['speed-index']
                time_to_interactive = data['lighthouseResult']['audits']['interactive']

                result = {
                    "url": params['url'],
                    "status": "success",
                    "metrics": {
                        "speed_index": {
                            "display_value": speed_index['displayValue'],
                            "numeric_value": speed_index['numericValue'],
                            "numeric_unit": speed_index['numericUnit']
                        },
                        "time_to_interactive": {
                            "display_value": time_to_interactive['displayValue'],
                            "numeric_value": time_to_interactive['numericValue'],
                            "numeric_unit": time_to_interactive['numericUnit']
                        }
                    }
                }

            else:
                result = {
                    "url": params['url'],
                    "status": "error",
                    "message": f"Error al obtener métricas: {response.text}"
                }

        except Exception as e:
            result = {
                "url": params['url'],
                "status": "error",
                "message": f"Error al obtener métricas: {str(e)}"
            }

        return result

    def __create_instance(self, result: dict, id_comparison: int) -> EndpointResult:
        """Crea el nueva instancia EndpointResult para hacer bulk save"""

        return EndpointResult(
            url = result['url'],
            speed_index = result['metrics']['speed_index']['numeric_value'],
            time_to_interactive = result['metrics']['time_to_interactive']['numeric_value'],
            status = result['status'],
            message = result['message'] if result['status'] == 'error' else None,
            comparison_id = id_comparison
        )


    # Public methods
    def get_comparison(self, data: ComparisonRequest):
        results = []
        result_objects = []

        comparison = Comparison()
        self.__db.add(comparison)
        self.__db.commit()

        for url in data.urls:
            params = {
                "url": url,
                "strategy": "desktop",
            }
            result = self.__fetch_api(params)
            result_object = self.__create_instance(result, comparison.id)

            result_objects.append(result_object)
            results.append(result)

        # Bulk save
        self.__db.bulk_save_objects(result_objects)
        self.__db.commit()

        return results