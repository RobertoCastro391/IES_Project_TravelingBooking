
# Use the official Python image from Docker Hub
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /app
# Copy the wait-for-db.sh script
COPY ../wait-for-db.sh /wait-for-db.sh
RUN chmod +x /wait-for-db.sh
# Copy the requirements file into the container
COPY requirements.txt /app/

# Install Python dependencies
RUN pip install -r requirements.txt

# Copy your application files into the container
COPY . /app

# Set the command to run your application
CMD ["python", "api.py"]