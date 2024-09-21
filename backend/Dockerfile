FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Script to wait for db
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

COPY . .

EXPOSE 8000

CMD ["/wait-for-it.sh", "db:3306", "-t", "0", "--", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]