# Use the official Python base image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Copy your Python application files to the container
COPY ./requirements.txt /app/requirements.txt

# Install any necessary dependencies using pip
RUN pip install -r requirements.txt

COPY . .
# Define the command to run your Python application
CMD ["python3", "app.py"]

