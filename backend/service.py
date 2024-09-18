from sqlalchemy.orm import Session
import requests

from schemas import ComparisonRequest

class APIService():

    def __init__(self, db:Session):
        self.__db = db
        self.__api_endpoint = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'

    def get_comparison(self, data: ComparisonRequest):
        results = []
        
        for url in data.urls:
            try:
                params = {
                    'url': url,
                    'strategy': 'desktop',
                }
                response = requests.get(url=self.__api_endpoint, params=params)

                if response.status_code == 200:
                    data = response.json()
                    speed_index = data['lighthouseResult']['audits']['speed-index']['displayValue']
                    time_to_interactive = data['lighthouseResult']['audits']['interactive']['displayValue']

                    result = {
                        "url":url,
                        "status": "success",
                        "metrics": {
                            "speed_index": speed_index,
                            "time_to_interactive": time_to_interactive
                        }
                    }

                else:
                    result = {
                        "url":url,
                        "status":"error",
                        "message": f"Error al obtener métricas: {response.text}"
                    }

            except Exception as e:
                result = {
                    "url": url,
                    "status": "error",
                    "message": f"Error al obtener métricas: {str(e)}"
                }

            results.append(result)

        return results