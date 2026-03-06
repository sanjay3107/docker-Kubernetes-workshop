# Use Python 3.9 slim image as base (smaller size!)
FROM python:3.9-slim

# Set working directory inside container
WORKDIR /app

# Copy requirements first (for better caching)
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY app.py .

# Expose port 5000 (documentation only)
EXPOSE 5000

# Command to run when container starts
CMD ["python", "app.py"]
