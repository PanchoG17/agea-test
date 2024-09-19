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
        """Crea nueva instancia EndpointResult para hacer bulk save"""

        return EndpointResult(
            url = result['url'],
            speed_index = result['metrics']['speed_index']['numeric_value'] if result.get('metrics') else None,
            time_to_interactive = result['metrics']['time_to_interactive']['numeric_value'] if result.get('metrics') else None,
            status = result['status'],
            message = result['message'] if result['status'] == 'error' else None,
            comparison_id = id_comparison
        )
    
    def __get_winner(self, result: dict, best_si: float, best_tti: float, winner_url: str) -> tuple:
        """Compara el resultado actual con el mejor actual y devuelve el ganador"""
        
        if result['status'] == 'success':
            si  = result['metrics']['speed_index']['numeric_value']
            tti = result['metrics']['time_to_interactive']['numeric_value']

            if best_si is None or si < best_si:
                # Nuevos datos del ganador
                return si, tti, result['url']

        # Datos existenes                
        return best_si, best_tti, winner_url


    # Public methods
    def get_comparison(self, data: ComparisonRequest):
        results = []
        results_objects = []
        best_si = 999999999
        best_tti = 999999999
        winner_url = None

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
            best_si, best_tti, winner_url = self.__get_winner(result, best_si, best_tti, winner_url)

            results_objects.append(result_object)
            results.append(result)

        # Bulk save
        self.__db.bulk_save_objects(results_objects)
        self.__db.commit()

        final_result = {
            "results": results,
            "winner": winner_url
        }

        return final_result