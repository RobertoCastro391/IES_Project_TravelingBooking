from confluent_kafka import Consumer, KafkaException

# Kafka Consumer Configuration
conf = {
    'bootstrap.servers': 'localhost:9092',  # Kafka broker address
    'group.id': 'my-consumer-group',  # Consumer group ID
    'auto.offset.reset': 'earliest',  # Start reading from the earliest message
}

# Create Consumer
consumer = Consumer(conf)

# Subscribe to topic
consumer.subscribe(['your_kafka_topic'])  # Replace with your topic name

try:
    while True:
        msg = consumer.poll(timeout=1.0)
        if msg is None:
            continue
        if msg.error():
            if msg.error().code() == KafkaException._PARTITION_EOF:
                # End of partition event
                continue
            else:
                print(msg.error())
                break

        # Print the message
        print(f'Received message: {msg.value().decode("utf-8")}')

except KeyboardInterrupt:
    pass

finally:
    # Close down consumer to commit final offsets.
    consumer.close()
