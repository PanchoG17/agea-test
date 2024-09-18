from sqlalchemy.orm import Session

class APIService():

    def __init__(self, db:Session):
        self.__db = db

    def get_comparison(self):
        return '404'