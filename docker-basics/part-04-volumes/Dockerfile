FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app.py .

# Create data directory
RUN mkdir -p /app/data

# Document that this directory should be a volume
VOLUME ["/app/data"]

EXPOSE 5000

CMD ["python", "app.py"]
