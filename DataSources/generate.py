import json
import random
from datetime import datetime, timedelta
from faker import Faker
from confluent_kafka import Producer
import geopy.distance

# Initialize Faker for random data generation
faker = Faker()

# Kafka Producer Configuration
conf = {
    'bootstrap.servers': 'kafka:9092',  # Replace with your Kafka broker address
    'client.id': 'FlightDataProducer'
}

producer = Producer(conf)

airports = {
    'LAX': (33.9416, -118.4085),
    'JFK': (40.6413, -73.7781),
    'ATL': (33.7490, -84.3880),
    'LHR': (51.4700, -0.4543),  
    'CDG': (49.0097, 2.5479),   
    'FRA': (50.0379, 8.5622),   
    'AMS': (52.3105, 4.7683),   
    'MAD': (40.4983, -3.5676),  
    'BCN': (41.2974, 2.0833),   
    'FCO': (41.8003, 12.2389),  
    'ZRH': (47.4582, 8.5555),   
    'VIE': (48.1103, 16.5697),  
    'OSL': (60.1976, 11.1004),  
    'ARN': (59.6519, 17.9186),
    'PRG': (50.1008, 14.26), 
    'CPH': (55.6180, 12.6560),  
    'DUB': (53.4264, -6.2499),  
    'BRU': (50.9014, 4.4844),  
    'LIS': (38.7742, -9.1342),
    'MXP': (45.6306, 8.7281),
    'IST': (40.9828, 28.8108),
    'DXB': (25.2532, 55.3657),
    'DEL': (28.5562, 77.1000),
    'BOM': (19.0896, 72.8656),
    'SIN': (1.3592, 103.9894),
    'HKG': (22.3080, 113.9185),
    'NRT': (35.7739, 140.3929),
    'PVG': (31.1443, 121.8083),
}

airlines = {
    'BA': 'British Airways',
    'LH': 'Lufthansa',
    'AF': 'Air France',
    'KL': 'KLM Royal Dutch Airlines',
    'IB': 'Iberia',
    'DY': 'Norwegian Air Shuttle',
    'FR': 'Ryanair',
    'U2': 'easyJet',
    'AZ': 'Alitalia',
    'LX': 'Swiss International Air Lines',
    'OS': 'Austrian Airlines',
    'SK': 'Scandinavian Airlines',
    'TP': 'TAP Air Portugal',
    'EK': 'Emirates',
    'QR': 'Qatar Airways',
    'SQ': 'Singapore Airlines',
    'CX': 'Cathay Pacific',
    'NH': 'All Nippon Airways',
    'JL': 'Japan Airlines',
}

def calculate_duration(origin, destination):
    """Estimate flight duration based on distance."""
    coords_1 = airports[origin]
    coords_2 = airports[destination]
    distance = geopy.distance.distance(coords_1, coords_2).km
    average_speed_km_per_hour = 800  # Average cruising speed of a commercial airliner
    duration_hours = distance / average_speed_km_per_hour
    return timedelta(hours=duration_hours)

def generate_random_flight():
    """Generates random flight data with realistic duration, departure, and arrival times."""
    origin, destination = random.sample(list(airports.keys()), 2)
    airline_code = random.choice(list(airlines.keys()))
    departure_time = datetime.now() + timedelta(days=random.randint(1, 30), hours=random.randint(0, 23), minutes=random.randint(0, 59))
    duration = calculate_duration(origin, destination)
    arrival_time = departure_time + duration

    return {
        "FlightNumber": airline_code + faker.bothify(text='####'),
        "FlightDate": departure_time.strftime('%Y-%m-%d'),
        "Airline_code": airline_code,
        "AeroCode_partida": origin,
        "AeroCode_chegada": destination,
        "Departure_hour": departure_time.strftime('%Y-%m-%d %H:%M'),
        "Arrival_hour": arrival_time.strftime('%Y-%m-%d %H:%M'),
        "Duration": str(duration),
        "fare": round(random.uniform(50.0, 1000.0), 2),
        "places": random.randint(1, 300)
    }


def send_airport_data_to_kafka(topic):
    """Sends airport data to Kafka."""
    for airport_code, coordinates in airports.items():
        airport_data = {
            "Code": airport_code,
            "Coordinates": coordinates
        }
        producer.produce(topic, key=airport_code, value=json.dumps(airport_data))
    producer.flush()

def send_airline_data_to_kafka(topic):
    """Sends airline company data to Kafka."""
    for airline_code, airline_name in airlines.items():
        airline_data = {
            "Code": airline_code,
            "Name": airline_name
        }
        producer.produce(topic, key=airline_code, value=json.dumps(airline_data))
    producer.flush()



def send_to_kafka(topic, flight_data):
    """Sends flight data to Kafka."""
    producer.produce(topic, key=str(flight_data['FlightNumber']), value=json.dumps(flight_data))
    producer.flush()



send_airport_data_to_kafka('airports_topic')  # Replace with your Kafka topic for airports
send_airline_data_to_kafka('airlines_topic')  # Replace with your Kafka topic for airlines

# Example Usage
for _ in range(10):  # Generate 10 random flights
    flight_data = generate_random_flight()
    send_to_kafka('flighs_data', flight_data)  # Replace 'your_kafka_topic' with your Kafka topic