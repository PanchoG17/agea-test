from sqlalchemy import Column, Integer, String, Float, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from db_config import Base


class Comparison(Base):
    __tablename__           = 'comparisons'
    
    id                      = Column(Integer, primary_key=True, autoincrement=True)
    created_at              = Column(DateTime, default=datetime.now)
    winner                  = Column(Text, nullable=True)

    results                 = relationship('EndpointResult', back_populates='comparison', uselist=True)

class EndpointResult(Base):
    __tablename__           = 'comparisons_results'
    
    id                      = Column(Integer, primary_key=True, autoincrement=True)
    url                     = Column(String(255), nullable=False)
    device                  = Column(String(100), nullable=True)
    status                  = Column(String(100), nullable=False)
    speed_index             = Column(Float, nullable=True)
    time_to_interactive     = Column(Float, nullable=True)
    message                 = Column(Text, nullable=True)
    comparison_id           = Column(Integer, ForeignKey('comparisons.id'))
    
    comparison              = relationship('Comparison', back_populates='results', uselist=False)