import json
import random
from datetime import datetime, timedelta
import requests
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

# flights

airports = {
    'LAX': ("Los Angeles International Airport", (33.9416, -118.4085)),
    'JFK': ("John F. Kennedy International Airport", (40.6413, -73.7781)),
    'ATL': ("Hartsfield-Jackson Atlanta International Airport", (33.7490, -84.3880)),
    'LHR': ("London Heathrow Airport", (51.4700, -0.4543)),
    'CDG': ("Charles de Gaulle Airport", (49.0097, 2.5479)),
    'FRA': ("Frankfurt Airport", (50.0379, 8.5622)),
    'AMS': ("Amsterdam Airport Schiphol", (52.3105, 4.7683)),
    'MAD': ("Adolfo Suárez Madrid–Barajas Airport", (40.4983, -3.5676)),
    'BCN': ("Barcelona–El Prat Airport", (41.2974, 2.0833)),
    'FCO': ("Leonardo da Vinci–Fiumicino Airport", (41.8003, 12.2389)),
    'ZRH': ("Zurich Airport", (47.4582, 8.5555)),
    'VIE': ("Vienna International Airport", (48.1103, 16.5697)),
    'OSL': ("Oslo Airport, Gardermoen", (60.1976, 11.1004)),
    'ARN': ("Stockholm Arlanda Airport", (59.6519, 17.9186)),
    'PRG': ("Václav Havel Airport Prague", (50.1008, 14.26)),
    'CPH': ("Copenhagen Airport", (55.6180, 12.6560)),
    'DUB': ("Dublin Airport", (53.4264, -6.2499)),
    'BRU': ("Brussels Airport", (50.9014, 4.4844)),
    'LIS': ("Lisbon Portela Airport", (38.7742, -9.1342)),
    'MXP': ("Milan Malpensa Airport", (45.6306, 8.7281)),
    'IST': ("Istanbul Airport", (40.9828, 28.8108)),
    'DXB': ("Dubai International Airport", (25.2532, 55.3657)),
    'DEL': ("Indira Gandhi International Airport", (28.5562, 77.1000)),
    'BOM': ("Chhatrapati Shivaji Maharaj International Airport", (19.0896, 72.8656)),
    'SIN': ("Singapore Changi Airport", (1.3592, 103.9894)),
    'HKG': ("Hong Kong International Airport", (22.3080, 113.9185)),
    'NRT': ("Narita International Airport", (35.7739, 140.3929)),
    'PVG': ("Shanghai Pudong International Airport", (31.1443, 121.8083)),
    'OPO': ("Francisco Sá Carneiro Airport", (41.2370, -8.6700)),
}

airlines = {
    'BA': {'name': 'British Airways', 'icao': 'BAW'},
    'LH': {'name': 'Lufthansa', 'icao': 'DLH'},
    'AF': {'name': 'Air France', 'icao': 'AFR'},
    'KL': {'name': 'KLM Royal Dutch Airlines', 'icao': 'KLM'},
    'IB': {'name': 'Iberia', 'icao': 'IBE'},
    'DY': {'name': 'Norwegian Air Shuttle', 'icao': 'NOZ'},
    'FR': {'name': 'Ryanair', 'icao': 'RYR'},
    'U2': {'name': 'easyJet', 'icao': 'EZY'},
    'AZ': {'name': 'Alitalia', 'icao': 'AZA'},
    'LX': {'name': 'Swiss International Air Lines', 'icao': 'SWR'},
    'OS': {'name': 'Austrian Airlines', 'icao': 'AUA'},
    'SK': {'name': 'Scandinavian Airlines', 'icao': 'SAS'},
    'TP': {'name': 'TAP Air Portugal', 'icao': 'TAP'},
    'EK': {'name': 'Emirates', 'icao': 'UAE'},
    'QR': {'name': 'Qatar Airways', 'icao': 'QTR'},
    'SQ': {'name': 'Singapore Airlines', 'icao': 'SIA'},
    'CX': {'name': 'Cathay Pacific', 'icao': 'CPA'},
    'NH': {'name': 'All Nippon Airways', 'icao': 'ANA'},
    'JL': {'name': 'Japan Airlines', 'icao': 'JAL'},
}

hoteis = {
    "Hotel Luz do Amanhecer": {
        "endereco": "Rua das Flores, 123, Lisboa, Portugal",
        "telefone": "+351 123 456 789"
    },
    "Etoile de Paris": {
        "endereco": "45 Rue de Rivoli, 75001 Paris, França",
        "telefone": "+33 1 23 45 67 89"
    },
    "The Royal Garden": {
        "endereco": "100 Garden Road, Central, Hong Kong",
        "telefone": "+852 1234 5678"
    },
    "Casa Azul": {
        "endereco": "Av. Reforma, 500, Cidade do México, México",
        "telefone": "+52 55 1234 5678"
    },
    "Safari Adventure Lodge": {
        "endereco": "123 Savana Rd, Nairobi, Quênia",
        "telefone": "+254 20 1234567"
    },
    "New York Dream Hotel": {
        "endereco": "789 Broadway, Nova York, NY 10003, EUA",
        "telefone": "+1 212-123-4567"
    },
    "Aurora Boreal Resort": {
        "endereco": "500 Lights Ave, Reykjavik, Islândia",
        "telefone": "+354 123 4567"
    },
    "Palácio Taj Mahal": {
        "endereco": "123 Royal Road, Agra, Índia",
        "telefone": "+91 12345 67890"
    },
    "Oásis do Deserto": {
        "endereco": "456 Dune St, Dubai, Emirados Árabes Unidos",
        "telefone": "+971 4 1234567"
    },
    "Torres Celestiais de Tóquio": {
        "endereco": "789 Skyline Blvd, Tóquio, Japão",
        "telefone": "+81 3-1234-5678"
    },
    "Casa de la Playa": {
        "endereco": "321 Ocean View Rd, Barcelona, Espanha",
        "telefone": "+34 123 456 789"
    },
    "Refúgio Alpino": {
        "endereco": "654 Mountain Way, Zermatt, Suíça",
        "telefone": "+41 21 123 45 67"
    },
    "Villa Mediterrânea": {
        "endereco": "100 Seaside Blvd, Santorini, Grécia",
        "telefone": "+30 210 1234567"
    },
    "Retiro Andino": {
        "endereco": "789 Montaña Rd, Cusco, Peru",
        "telefone": "+51 84 123456"
    },
    "Estrelas do Nilo": {
        "endereco": "456 Riverbank St, Cairo, Egito",
        "telefone": "+20 2 1234567"
    },
    "Sonhos da Toscana": {
        "endereco": "321 Vineyard Way, Florença, Itália",
        "telefone": "+39 055 1234567"
    },
    "Castelo de Edimburgo": {
        "endereco": "222 Castle Rd, Edimburgo, Escócia",
        "telefone": "+44 131 123 4567"
    },
    "Mirante da Table Mountain": {
        "endereco": "123 Peak Dr, Cidade do Cabo, África do Sul",
        "telefone": "+27 21 123 4567"
    },
    "Oásis Australiano": {
        "endereco": "400 Outback Ln, Sydney, Austrália",
        "telefone": "+61 2 1234 5678"
    },
    "Refúgio da Floresta Amazônica": {
        "endereco": "500 Jungle Ave, Manaus, Brasil",
        "telefone": "+55 92 1234 5678"
    },
    "Porto Celestial": {
        "endereco": "789 Harbor View, Vancouver, Canadá",
        "telefone": "+1 604-123-4567"
    },
    "Luzes da Aurora": {
        "endereco": "321 Northern St, Tromsø, Noruega",
        "telefone": "+47 123 45 678"
    },
    "Mirante das Montanhas Rochosas": {
        "endereco": "789 Mountain View Rd, Banff, Canadá",
        "telefone": "+1 403 123 4567"
    },
    "Refúgio Siberiano": {
        "endereco": "321 Frostbite Ln, Siberia, Rússia",
        "telefone": "+7 495 123 4567"
    },
    "Sol da Tasmânia": {
        "endereco": "456 Island Rd, Hobart, Austrália",
        "telefone": "+61 3 1234 5678"
    },
    "Paraíso do Caribe": {
        "endereco": "789 Beach Blvd, Nassau, Bahamas",
        "telefone": "+1 242 123 4567"
    },
    "Pérola do Oriente": {
        "endereco": "123 Harbor St, Singapura",
        "telefone": "+65 1234 5678"
    },
    "Esconderijo Alpino": {
        "endereco": "654 Snowtop Rd, Innsbruck, Áustria",
        "telefone": "+43 512 123456"
    },
    "Santuário do Mar Egeu": {
        "endereco": "321 Coastal Way, Míconos, Grécia",
        "telefone": "+30 22890 12345"
    },
    "Jóia da Patagônia": {
        "endereco": "789 Glacier Ln, El Calafate, Argentina",
        "telefone": "+54 2902 49-1234"
    },
    "Portão do Sahara": {
        "endereco": "456 Desert Ave, Marrakech, Marrocos",
        "telefone": "+212 5243-78865"
    },
    "Oásis de Bali": {
        "endereco": "321 Paradise Rd, Bali, Indonésia",
        "telefone": "+62 361 123456"
    },
    "Refúgio da Grande Muralha": {
        "endereco": "789 Wall St, Pequim, China",
        "telefone": "+86 10 1234 5678"
    },
        "Refúgio do Fiordo": {
        "endereco": "123 Lakeside Rd, Oslo, Noruega",
        "telefone": "+47 1234 5678"
    },
    "Estalagem das Colinas Verdes": {
        "endereco": "456 Hilltop Dr, Dublin, Irlanda",
        "telefone": "+353 1 234 5678"
    },
    "Retiro dos Alpes Japoneses": {
        "endereco": "789 Alpine Way, Nagano, Japão",
        "telefone": "+81 26 123 4567"
    },
    "Portal da Amazônia": {
        "endereco": "321 Jungle Rd, Belém, Brasil",
        "telefone": "+55 91 1234 5678"
    },
    "Vista do Mediterrâneo": {
        "endereco": "654 Seaside Ave, Nice, França",
        "telefone": "+33 4 93 123456"
    },
    "Oásis da Cidade do Cabo": {
        "endereco": "123 Ocean View Rd, Cidade do Cabo, África do Sul",
        "telefone": "+27 21 123 4567"
    },
    "Estalagem das Mil Ilhas": {
        "endereco": "456 River Rd, Jacarta, Indonésia",
        "telefone": "+62 21 1234 5678"
    },
    "Refúgio do Himalaia": {
        "endereco": "789 Mountain Path, Katmandu, Nepal",
        "telefone": "+977 1-1234567"
    },
    "Paradise Island Resort": {
        "endereco": "321 Paradise Ln, Maldivas",
        "telefone": "+960 1234 567"
    },
    "Tesouro do Pacífico": {
        "endereco": "456 Ocean Breeze St, Fiji",
        "telefone": "+679 123 4567"
    },
    "Retiro da Floresta Negra": {
        "endereco": "789 Forest Rd, Baden-Baden, Alemanha",
        "telefone": "+49 7221 123456"
    }
}

hotel_type = ["All Inclusive", "Bed and Breakfast", "Half board", "Full board", "Self catering", "Room only"]


def calculate_duration(origin, destination):
    """Estimate flight duration based on distance."""
    coords_1 = airports[origin][1]
    coords_2 = airports[destination][1]
    distance = geopy.distance.distance(coords_1, coords_2).km
    average_speed_km_per_hour = 800
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
        "flightNumber": airline_code + faker.bothify(text='####'),
        "flightDate": departure_time.strftime('%Y-%m-%d'),
        "airlineCode": airline_code,
        "airportCodeOrigin": origin,
        "airportCodeDestination": destination,
        "departureHour": departure_time.strftime('%Y-%m-%d %H:%M'),
        "arrivalHour": arrival_time.strftime('%Y-%m-%d %H:%M'),
        "duration": str(duration),
        "price": round(random.uniform(50.0, 1000.0), 2),
        "seats": random.randint(1, 300)
    }
def generate_random_hotels():
    """Generates random flight data with realistic duration, departure, and arrival times."""
    name = random.choice(list(hoteis.keys()))
    address = hoteis[name]['endereco']
    phone = hoteis[name]['telefone']
    typeRoom = random.choice(hotel_type)
    ac= random.choice([True, False])
    wifi= random.choice([True, False])
    return {
        "hotelName": name,
        "Address": address,
        "phoneNumber": phone,
        "initialPrice": round(random.uniform(100.0, 1000.0), 2),
        "baggages": random.randint(1, 10),
        "foodIncluded": typeRoom,
        "ac": ac,
        "wifi": wifi,
        "numberOfReviews":random.randint(1000,20000),
        "cleanlinessReview": round(random.uniform(0, 5.0), 2),
        "serviceReview": round(random.uniform(0, 5.0), 2),
        "valueReview": round(random.uniform(0, 5.0), 2),
        "locationReview": round(random.uniform(0, 5.0), 2),
        "roomsReview": round(random.uniform(0, 5.0), 2),
        "sleepQualityReview": round(random.uniform(0, 5.0), 2)
    }
    


def send_airport_data_to_kafka(topic):
    """Sends airport data to Kafka."""
    for airport_code, coordinates in airports.items():
        airport_data = {
            "airportCode": airport_code,
            "airportName": coordinates[0],
            "airportLat": coordinates[1][0],
            "airportLong": coordinates[1][1]
        }
        producer.produce(topic, key=airport_code, value=json.dumps(airport_data))
    producer.flush()

def send_airline_data_to_kafka(topic):
    """Sends airline company data to Kafka."""
    for airline_code, airline_info in airlines.items():
        airline_data = {
            "airlineCode": airline_code,
            "airlineName": airline_info['name'],
            "airlineICAO": airline_info['icao']
        }
        producer.produce(topic, key=airline_code, value=json.dumps(airline_data))
    producer.flush()

# trains

trainCompanies = {
    'AC':	{ 'name' : 'Australian Rail Track Corporation' },
    'BR':	{ 'name' : 'British Rail' },
    'CN':	{ 'name' : 'Canadian National Railway' },
    'CR':	{ 'name' : 'China Railway' },
    'DB':	{ 'name' : 'Deutsche Bahn' },
    'FR':	{ 'name' : 'French National Railways' },
    'JR':	{ 'name' : 'Japan Railways Group' },
    'NS':	{ 'name' : 'Nederlandse Spoorwegen' },
    'OE':	{ 'name' : 'Orient Express' },
    'CP':	{ 'name' : 'Comboios de Portugal' },
    'SBB':	{ 'name' : 'Swiss Federal Railways' },
    'SJ':	{ 'name' : 'Statens Järnvägar' },
    'SNCF':	{ 'name' : 'Société Nationale des Chemins de Fer Français' },
    'TX':	{ 'name' : 'Texas Department of Transportation' },
    'VIA':	{ 'name' : 'VIA Rail Canada' }
}

stations = {
    'ATH1' : { "StationName": "Attiki station", "StationCity": "Athens, Greece", "Coordinates": (37.983333, 23.716667) },
    'BAR1' : { "StationName": "Barceloneta station", "StationCity": "Barcelona, Catalonia, Spain", "Coordinates": (41.383333, 2.183333) },
    'BER1' : { "StationName": "Berlin Hauptbahnhof", "StationCity": "Mitte, Berlin, Germany", "Coordinates": (52.518333, 13.408056) },
    'BRS1' : { "StationName": "Brussels-Central Station", "StationCity": "Brussels, Belgium", "Coordinates": (50.848333, 4.333333) },
    'CPH1' : { "StationName": "Københavns Hovedbanegård", "StationCity": "København K, Denmark", "Coordinates": (55.675000, 12.550000) },
    'FRA1' : { "StationName": "Gare de Paris-Nord", "StationCity": "10e Arrondissement, Paris, France", "Coordinates": (48.866667, 2.350000) },
    'LON1' : { "StationName": "London Euston Station", "StationCity": "Euston, Camden, London, England", "Coordinates": (51.525000, -0.125000) },
    'MAD1' : { "StationName": "Madrid Puerta de Atocha", "StationCity": "Retiro, Madrid, Spain", "Coordinates": (40.416667, -3.650000) },
    'ROM1' : { "StationName": "Roma Termini", "StationCity": "Roma, Lazio, Italy", "Coordinates": (41.908333, 12.483333) },
    'POR1' : { "StationName": "São Bento Railway Station", "StationCity": "Porto, Portugal", "Coordinates": (41.158533, -8.610667) },
    'FRA2' : { "StationName": "Gare de Lyon-Saint-Paul", "StationCity": "5e Arrondissement, Paris, France", "Coordinates": (48.858333, 2.350000) },
    'FRA3' : { "StationName": "Gare de Marseille-Saint-Charles", "StationCity": "1er Arrondissement, Marseille, France", "Coordinates": (43.298333, 5.383333) },
    'GER1' : { "StationName": "Frankfurt (Main) Hauptbahnhof", "StationCity": "Frankfurt am Main, Hesse, Germany", "Coordinates": (50.116667, 8.650000) },
    'GER2' : { "StationName": "Hamburg Hauptbahnhof", "StationCity": "Hamburg, Germany", "Coordinates": (53.550000, 10.000000) },
    'ITA1' : { "StationName": "Roma Termini", "StationCity": "Roma, Lazio, Italy", "Coordinates": (41.908333, 12.483333) },
    'ITA2' : { "StationName": "Napoli Centrale Station", "StationCity": "Napoli, Campania, Italy", "Coordinates": (40.833333, 14.250000) },
    'NLD1' : {"StationName": "Amsterdam Centraal Station", "StationCity": "Amsterdam, Netherlands", "Coordinates": (52.375000, 4.883333) },
    'POL1' : { "StationName": "Warszawa Centralna", "StationCity": "Warszawa, Poland", "Coordinates": (52.225000, 21.000000) },
    'POR2' : { "StationName": "Lisboa - Santa Apolónia", "StationCity": "Santa Maria Maior, Lisboa, Portugal", "Coordinates": (38.710833, -9.125556) },
    'BEL1' : { "StationName": "Gare du Midi/Zuidstation", "StationCity": "Ixelles, Brussels, Belgium", "Coordinates": (50.833333, 4.333333) },
    'BGR1' : { "StationName": "Sofia Central Station", "StationCity": "Sofia, Bulgaria", "Coordinates": (42.698333, 23.316667) },
    'CZ1' : { "StationName": "Praha hlavní nádraží", "StationCity": "Praha, Czech Republic", "Coordinates": (50.083333, 14.416667) },
    'DNK1' : { "StationName": "Københavns Hovedbanegård", "StationCity": "København K, Denmark", "Coordinates": (55.675000, 12.550000) },
    'ESP1' : { "StationName": "Madrid Puerta de Atocha", "StationCity": "Retiro, Madrid, Spain", "Coordinates": (40.416667, -3.650000) },
    'EST1' : { "StationName": "Tallinn Central Railway Station", "StationCity": "Tallinn, Estonia", "Coordinates": (59.433333, 24.750000) },
    'FIN1' : { "StationName": "Helsinki Central Station", "StationCity": "Kluuvi, Helsinki, Finland", "Coordinates": (60.150000, 24.933333) },
    'FRA4' : { "StationName": "Gare de Lyon-Perrache", "StationCity": "2e Arrondissement, Lyon, France", "Coordinates": (45.750000, 4.816667) },
    'GRC1' : { "StationName": "Athens Railway Station", "StationCity": "Nea Ionia, Athens, Greece", "Coordinates": (37.983333, 23.716667) },
    'HUN1' : { "StationName": "Keleti pályaudvar", "StationCity": "Budapest, Hungary", "Coordinates": (47.483333, 19.050000)  },
    'IRL1' : { "StationName": "Dublin Connolly Station", "StationCity": "Dublin, Ireland", "Coordinates": (53.341667, -6.250000)  },
    'GE2' : { "StationName": "Genève-Eaux-Vives", "StationCity": "Genève, Switzerland", "Coordinates": (46.183333, 6.133333) },
    'ITA3' : { "StationName": "Venezia Santa Lucia", "StationCity": "Venezia, Veneto, Italy", "Coordinates": (45.433333, 12.316667) },
    'NLD2' : { "StationName": "Rotterdam Centraal", "StationCity": "Rotterdam, Netherlands", "Coordinates": (51.925000, 4.450000) },
    'POL2' : { "StationName": "Gdańsk Główny", "StationCity": "Gdańsk, Poland", "Coordinates": (54.333333, 18.650000) },
    'GE3' : { "StationName": "Genève-Cornavin", "StationCity": "Genève, Switzerland", "Coordinates": (46.175000, 6.150000) },
    'BRG1' : { "StationName": "Estação de Braga", "StationCity": "Braga, Portugal", "Coordinates": (41.547321, -8.434821) },
    'AVR1' : { "StationName": "Estação Ferroviária de Aveiro", "StationCity": "Aveiro, Portugal", "Coordinates": (40.710833, -9.125556) },
    'FAO1' : { "StationName": "Estação Ferroviária de Faro", "StationCity": "Faro, Portugal", "Coordinates": (37.019447, -7.940680) }
}

train_types = {
    'High-speed train' : 300,
    'Intercity train' : 200,
    'Regional train' : 100,
    'Suburban train' : 80, 
    'S-Bahn' : 60
}

def calculate_duration_train(origin, destination): # done
    """Estimate train duration based on distance and train velocity."""
    coords_1 = stations[origin]['Coordinates']
    coords_2 = stations[destination]['Coordinates']
    distance = geopy.distance.distance(coords_1, coords_2).km
    train_type = random.choice(list(train_types.keys()))
    average_speed_km_per_hour = train_types[train_type]
    duration_hours = distance / average_speed_km_per_hour
    return timedelta(hours=duration_hours)

def generate_random_train():
    """Generates random train travel data with realistic duration, departure, and arrival times."""
    origin, destination = random.sample(list(stations.keys()), 2)
    train_company_code = random.choice(list(trainCompanies.keys()))
    departure_time = datetime.now() + timedelta(days=random.randint(1, 30), hours=random.randint(0, 23), minutes=random.randint(0, 59))
    duration = calculate_duration_train(origin, destination)
    arrival_time = departure_time + duration
    price2ndclass = round(random.uniform(50.0, 1000.0), 2)
    carriages = random.randint(4, 15)

    return {
        "trainNumber": train_company_code + faker.bothify(text='####'),
        "travelDate": departure_time.strftime('%Y-%m-%d'),
        "trainCompanyCode": train_company_code,
        "stationCodeOrigin": origin,
        "stationCodeDestination": destination,
        "departureHour": departure_time.strftime('%Y-%m-%d %H:%M'),
        "arrivalHour": arrival_time.strftime('%Y-%m-%d %H:%M'),
        "duration": str(duration),
        "price2ndclass": price2ndclass,
        "price1stclass": round(price2ndclass + round(random.uniform(50.0, 200.0), 2), 2),
        "carriages": carriages,
        "seats": random.randint(1, 40) * carriages
    }

# send train info to kafka

def send_station_data_to_kafka(topic):
    """Sends station data to Kafka."""
    for station_code, station_info in stations.items():
        station_data = {
            "stationCode": station_code,
            "stationName": station_info['StationName'],
            "stationCity": station_info['StationCity'],
            "stationLat": station_info['Coordinates'][0],
            "stationLong": station_info['Coordinates'][1]
        }
        print("Sending station")
        print(station_data)
        producer.produce(topic, key=station_code, value=json.dumps(station_data))
    producer.flush()

def send_train_company_data_to_kafka(topic):
    """Sends train company data to Kafka."""
    for train_company_code, train_company_info in trainCompanies.items():
        train_company_data = {
            "trainCompanyCode": train_company_code,
            "trainCompanyName": train_company_info['name']
        }
        print("Sending train company data")
        print(train_company_data)
        producer.produce(topic, key=train_company_code, value=json.dumps(train_company_data))
    producer.flush()
    
# send to kafka

def send_to_kafka(topic, flight_data):
    """Sends flight data to Kafka."""
    producer.produce(topic, key=str(flight_data['flightNumber']), value=json.dumps(flight_data))
    producer.flush()

def send_to_kafka_trains(topic, train_data):
    """Sends train data to Kafka."""
    producer.produce(topic, key=str(train_data['trainNumber']), value=json.dumps(train_data))
    producer.flush()

def send_to_kafka_hotel(topic, hotel_data):
    """Sends flight data to Kafka."""
    producer.produce(topic, key=str(hotel_data['hotelName']), value=json.dumps(hotel_data))
    producer.flush()
    

send_airport_data_to_kafka('airports_topic')  
send_airline_data_to_kafka('airlines_topic')
send_station_data_to_kafka('station_topic')
send_train_company_data_to_kafka('train_company_topic')  


for _ in range(10):
    flight_data = generate_random_flight()
    hotel_data = generate_random_hotels()
    send_to_kafka('flighs_data', flight_data)
    train_data = generate_random_train()
    print(train_data)
    send_to_kafka_trains('train_data', train_data)    send_to_kafka_hotel('hotel_topic',hotel_data)
