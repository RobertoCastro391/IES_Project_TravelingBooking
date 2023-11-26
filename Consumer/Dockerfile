FROM python:3.8-slim
WORKDIR /app
COPY . /app
RUN pip install confluent-kafka
EXPOSE 80
ENV NAME World
CMD ["python", "consumer.py"]
