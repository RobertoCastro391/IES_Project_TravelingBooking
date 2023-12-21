import json
import random
from datetime import datetime, timedelta
import time
import copy
import requests
from faker import Faker
from confluent_kafka import Producer
import geopy.distance
import numpy as np # used in msf

# Initialize Faker for random data generation
faker = Faker()

# Kafka Producer Configuration
conf = {
    'bootstrap.servers': 'kafka:9092',  # Replace with your Kafka broker address
    'client.id': 'FlightDataProducer'
}

producer = Producer(conf)

#DATA FOR FLIGHTS
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
    'SYD': ("Sydney Kingsford Smith Airport", (-33.9399, 151.1753)),
    'BKK': ("Suvarnabhumi Airport", (13.689999, 100.7501)),
    'NRT': ("Narita International Airport", (35.7720, 140.3929)),
    'ICN': ("Incheon International Airport", (37.4602, 126.4407)),
    'GRU': ("São Paulo/Guarulhos–Governador André Franco Montoro International Airport", (-23.4356, -46.4731)),
    'YYZ': ("Toronto Pearson International Airport", (43.6777, -79.6248)),
    'YVR': ("Vancouver International Airport", (49.1939, -123.1844)),
    'MEX': ("Mexico City International Airport", (19.4363, -99.0721)),
    'JNB': ("O.R. Tambo International Airport", (-26.1392, 28.246)),
    'CPT': ("Cape Town International Airport", (-33.9648, 18.6017)),
    'GRU': ("São Paulo/Guarulhos–Governador André Franco Montoro International Airport", (-23.4356, -46.4731)),
    'EZE': ("Ministro Pistarini International Airport", (-34.8222, -58.5358)),
    'SVO': ("Sheremetyevo International Airport", (55.9726, 37.4146)),
    'DME': ("Domodedovo Moscow Airport", (55.4088, 37.9063)),
    'KUL': ("Kuala Lumpur International Airport", (2.7456, 101.7072)),
    'CGK': ("Soekarno–Hatta International Airport", (-6.1256, 106.6558)),
    'BNE': ("Brisbane Airport", (-27.3842, 153.1175)),
    'AKL': ("Auckland Airport", (-37.0082, 174.7917)),
    'SFO': ("San Francisco International Airport", (37.6213, -122.3790)),
    'ORD': ("O'Hare International Airport", (41.9742, -87.9073)),
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
    'AA': {'name': 'American Airlines', 'icao': 'AAL'},
    'DL': {'name': 'Delta Air Lines', 'icao': 'DAL'},
    'UA': {'name': 'United Airlines', 'icao': 'UAL'},
    'AC': {'name': 'Air Canada', 'icao': 'ACA'},
    'QF': {'name': 'Qantas', 'icao': 'QFA'},
    'NZ': {'name': 'Air New Zealand', 'icao': 'ANZ'},
    'LA': {'name': 'LATAM Airlines', 'icao': 'LAN'},
    'SA': {'name': 'South African Airways', 'icao': 'SAA'},
    'ET': {'name': 'Ethiopian Airlines', 'icao': 'ETH'},
    'EY': {'name': 'Etihad Airways', 'icao': 'ETD'},
    'TK': {'name': 'Turkish Airlines', 'icao': 'THY'},
    'VA': {'name': 'Virgin Australia', 'icao': 'VOZ'},
    'VS': {'name': 'Virgin Atlantic', 'icao': 'VIR'},
    'AI': {'name': 'Air India', 'icao': 'AIC'},
    'SU': {'name': 'Aeroflot', 'icao': 'AFL'},
    'KE': {'name': 'Korean Air', 'icao': 'KAL'},
    'AM': {'name': 'Aeroméxico', 'icao': 'AMX'},
    'AR': {'name': 'Aerolíneas Argentinas', 'icao': 'ARG'},
    'AV': {'name': 'Avianca', 'icao': 'AVA'}
}


# DATA FOR TRAINS
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


hotels = {
    "Dawn Light Hotel": {
        "address": "Rua das Flores, 123, Lisbon, Portugal",
        "phone": "+351 123 456 789"
    },
    "Star of Paris": {
        "address": "45 Rue de Rivoli, 75001 Paris, France",
        "phone": "+33 1 23 45 67 89"
    },
    "The Royal Garden": {
        "address": "100 Garden Road, Central, Hong Kong",
        "phone": "+852 1234 5678"
    },
    "Blue House": {
        "address": "Av. Reforma, 500, Mexico City, Mexico",
        "phone": "+52 55 1234 5678"
    },
    "Safari Adventure Lodge": {
        "address": "123 Savana Rd, Nairobi, Kenya",
        "phone": "+254 20 1234567"
    },
    "New York Dream Hotel": {
        "address": "789 Broadway, New York, NY 10003, USA",
        "phone": "+1 212-123-4567"
    },
    "Aurora Boreal Resort": {
        "address": "500 Lights Ave, Reykjavik, Iceland",
        "phone": "+354 123 4567"
    },
    "Taj Mahal Palace": {
        "address": "123 Royal Road, Agra, India",
        "phone": "+91 12345 67890"
    },
    "Desert Oasis": {
        "address": "456 Dune St, Dubai, United Arab Emirates",
        "phone": "+971 4 1234567"
    },
    "Tokyo Celestial Towers": {
        "address": "789 Skyline Blvd, Tokyo, Japan",
        "phone": "+81 3-1234-5678"
    },"Beach House": {
        "address": "321 Ocean View Rd, Barcelona, Spain",
        "phone": "+34 123 456 789"
    },
    "Alpine Refuge": {
        "address": "654 Mountain Way, Zermatt, Switzerland",
        "phone": "+41 21 123 45 67"
    },
    "Mediterranean Villa": {
        "address": "100 Seaside Blvd, Santorini, Greece",
        "phone": "+30 210 1234567"
    },
    "Andean Retreat": {
        "address": "789 Montaña Rd, Cusco, Peru",
        "phone": "+51 84 123456"
    },
    "Stars of the Nile": {
        "address": "456 Riverbank St, Cairo, Egypt",
        "phone": "+20 2 1234567"
    },
    "Dreams of Tuscany": {
        "address": "321 Vineyard Way, Florence, Italy",
        "phone": "+39 055 1234567"
    },
    "Edinburgh Castle": {
        "address": "222 Castle Rd, Edinburgh, Scotland",
        "phone": "+44 131 123 4567"
    },
    "Table Mountain Lookout": {
        "address": "123 Peak Dr, Cape Town, South Africa",
        "phone": "+27 21 123 4567"
    },
    "Australian Oasis": {
        "address": "400 Outback Ln, Sydney, Australia",
        "phone": "+61 2 1234 5678"
    },
    "Amazon Forest Refuge": {
        "address": "500 Jungle Ave, Manaus, Brazil",
        "phone": "+55 92 1234 5678"
    },
    "Heavenly Harbor": {
        "address": "789 Harbor View, Vancouver, Canada",
        "phone": "+1 604-123-4567"
    },
    "Aurora Lights": {
        "address": "321 Northern St, Tromsø, Norway",
        "phone": "+47 123 45 678"
    },
    "Rocky Mountains Lookout": {
        "address": "789 Mountain View Rd, Banff, Canada",
        "phone": "+1 403 123 4567"
    },
    "Siberian Refuge": {
        "address": "321 Frostbite Ln, Siberia, Russia",
        "phone": "+7 495 123 4567"
    },
    "Tasmanian Sun": {
        "address": "456 Island Rd, Hobart, Australia",
        "phone": "+61 3 1234 5678"
    },
    "Caribbean Paradise": {
        "address": "789 Beach Blvd, Nassau, Bahamas",
        "phone": "+1 242 123 4567"
    },
    "Pearl of the Orient": {
        "address": "123 Harbor St, Singapore",
        "phone": "+65 1234 5678"
    },
    "Alpine Hideaway": {
        "address": "654 Snowtop Rd, Innsbruck, Austria",
        "phone": "+43 512 123456"
    },
    "Aegean Sea Sanctuary": {
        "address": "321 Coastal Way, Mykonos, Greece",
        "phone": "+30 22890 12345"
    },
    "Patagonia Jewel": {
        "address": "789 Glacier Ln, El Calafate, Argentina",
        "phone": "+54 2902 49-1234"
    },
    "Sahara Gate": {
        "address": "456 Desert Ave, Marrakech, Morocco",
        "phone": "+212 5243-78865"
    },
    "Bali Oasis": {
        "address": "321 Paradise Rd, Bali, Indonesia",
        "phone": "+62 361 123456"
    },
    "Great Wall Refuge": {
        "address": "789 Wall St, Beijing, China",
        "phone": "+86 10 1234 5678"
    },
    "Fjord Refuge": {
        "address": "123 Lakeside Rd, Oslo, Norway",
        "phone": "+47 1234 5678"
    },
    "Green Hills Inn": {
        "address": "456 Hilltop Dr, Dublin, Ireland",
        "phone": "+353 1 234 5678"
    },
    "Japanese Alps Retreat": {
        "address": "789 Alpine Way, Nagano, Japan",
        "phone": "+81 26 123 4567"
    },
    "Amazon Gateway": {
        "address": "321 Jungle Rd, Belém, Brazil",
        "phone": "+55 91 1234 5678"
    },
    "Mediterranean View": {
        "address": "654 Seaside Ave, Nice, France",
        "phone": "+33 4 93 123456"
    },
    "Cape Town Oasis": {
        "address": "123 Ocean View Rd, Cape Town, South Africa",
        "phone": "+27 21 123 4567"
    },
    "Thousand Islands Inn": {
        "address": "456 River Rd, Jakarta, Indonesia",
        "phone": "+62 21 1234 5678"
    },
    "Himalayan Refuge": {
        "address": "789 Mountain Path, Kathmandu, Nepal",
        "phone": "+977 1-1234567"
    },
    "Paradise Island Resort": {
        "address": "321 Paradise Ln, Maldives",
        "phone": "+960 1234 567"
    },
    "Pacific Treasure": {
        "address": "456 Ocean Breeze St, Fiji",
        "phone": "+679 123 4567"
    },
    "Black Forest Retreat": {
        "address": "789 Forest Rd, Baden-Baden, Germany",
        "phone": "+49 7221 123456"
    }
}

hotel_type = ["All Inclusive", "Bed and Breakfast", "Half board", "Full board", "Self catering", "Room only"]


### MUSEUMS DATA

cities = {
    "FR": {"name": "Paris", "country": "France"},
    "ES": {"name": "Madrid", "country": "Spain"},
    "IT": {"name": "Rome", "country": "Italy"},
    "UK": {"name": "London", "country": "United Kingdom"},
    "NL": {"name": "Amsterdam", "country": "Netherlands"},
    "DE": {"name": "Berlin", "country": "Germany"},
    "SE": {"name": "Stockholm", "country": "Sweden"},
    "FI": {"name": "Helsinki", "country": "Finland"},
    "DK": {"name": "Copenhagen", "country": "Denmark"},
    "PL": {"name": "Warsaw", "country": "Poland"},
    "PT": {"name": "Lisbon", "country": "Portugal"},
    "IE": {"name": "Dublin", "country": "Ireland"},
    "CH": {"name": "Zurich", "country": "Switzerland"},
    "NO": {"name": "Oslo", "country": "Norway"},
    "CZ": {"name": "Prague", "country": "Czech Republic"},
    "HU": {"name": "Budapest", "country": "Hungary"},
    "AT": {"name": "Vienna", "country": "Austria"},
    "BE": {"name": "Brussels", "country": "Belgium"},
    "LU": {"name": "Luxembourg", "country": "Luxembourg"},
    "GR": {"name": "Athens", "country": "Greece"},
    "RO": {"name": "Bucharest", "country": "Romania"},
    "BG": {"name": "Sofia", "country": "Bulgaria"},
    "HR": {"name": "Zagreb", "country": "Croatia"},
}


### MUSEUMS DATA

museums = {
    "PAR_LO": {
        "name": "Louvre Museum",
        "city": "Paris",
        "address": "Rue de Rivoli, 75001 Paris, France",
        "coordinates": {"latitude": 48.8606, "longitude": 2.3376},
        "description": "One of the largest and most famous museums in the world, located in the center of Paris."
    },
    "PAR_OR": {
        "name": "Musée d'Orsay",
        "city": "Paris",
        "address": "1 Rue de la Légion d'Honneur, 75007 Paris, France",
        "coordinates": {"latitude": 48.8599, "longitude": 2.3266},
        "description": "Dedicated to 19th-century art, situated in a former railway station."
    },
    

    "MAD_PR": {
        "name": "Prado Museum",
        "city": "Madrid",
        "address": "Calle de Ruiz de Alarcón, 23, 28014 Madrid, Spain",
        "coordinates": {"latitude": 40.4139, "longitude": -3.6922},
        "description": "One of the most important art museums in the world, focused on European art."
    },
    "MAD_RS": {
        "name": "Reina Sofía National Art Center Museum",
        "city": "Madrid",
        "address": "Calle de Santa Isabel, 52, 28012 Madrid, Spain",
        "coordinates": {"latitude": 40.4086, "longitude": -3.6936},
        "description": "Known for housing Picasso's famous work 'Guernica,' in addition to contemporary art."
    },
    "MAD_TH": {
        "name": "Thyssen-Bornemisza Museum",
        "city": "Madrid",
        "address": "Paseo del Prado, 8, 28014 Madrid, Spain",
        "coordinates": {"latitude": 40.4169, "longitude": -3.6944},
        "description": "A unique collection spanning seven centuries of European art, from the 13th to the 20th century."
    },
    


    "ROM_VA": {
        "name": "Vatican Museums",
        "city": "Rome",
        "address": "Viale Vaticano, 00165 Rome, Italy",
        "coordinates": {"latitude": 41.9022, "longitude": 12.4534},
        "description": "One of the largest collections of art and antiquities in the world, including the Sistine Chapel."
    },
    "ROM_BO": {
        "name": "Borghese Gallery",
        "city": "Rome",
        "address": "Viale delle Belle Arti, 5, 00197 Rome, Italy",
        "coordinates": {"latitude": 41.9145, "longitude": 12.4924},
        "description": "A magnificent art gallery with sculptures, paintings, and antiquities in a Baroque setting."
    },
    

    "LON_BR": {
        "name": "British Museum",
        "city": "London",
        "address": "Great Russell Street, London WC1B 3DG, United Kingdom",
        "coordinates": {"latitude": 51.5194, "longitude": -0.1270},
        "description": "One of the largest and most comprehensive museums in the world, housing a vast collection of global artifacts."
    },
    "LON_NG": {
        "name": "National Gallery",
        "city": "London",
        "address": "Trafalgar Square, London WC2N 5DN, United Kingdom",
        "coordinates": {"latitude": 51.5089, "longitude": -0.1283},
        "description": "One of the world's foremost art galleries, with an impressive collection of European paintings."
    },
   

    "AMS_RM": {
        "name": "Rijksmuseum",
        "city": "Amsterdam",
        "address": "Museumstraat 1, 1071 XX Amsterdam, Netherlands",
        "coordinates": {"latitude": 52.3600, "longitude": 4.8852},
        "description": "The national museum of the Netherlands, with a vast collection of art and history."
    },
    "AMS_VG": {
        "name": "Van Gogh Museum",
        "city": "Amsterdam",
        "address": "Museumplein 6, 1071 DJ Amsterdam, Netherlands",
        "coordinates": {"latitude": 52.3584, "longitude": 4.8818},
        "description": "Dedicated to the life and work of the famous painter Vincent van Gogh, with an extensive collection of his paintings."
    },
    "AMS_AF": {
        "name": "Anne Frank House",
        "city": "Amsterdam",
        "address": "Prinsengracht 263-267, 1016 GV Amsterdam, Netherlands",
        "coordinates": {"latitude": 52.3752, "longitude": 4.8837},
        "description": "The house where Anne Frank and her family hid during World War II, now a museum dedicated to her memory."
    },
    

    "BER_PE": {
        "name": "Pergamon Museum",
        "city": "Berlin",
        "address": "Bodestraße 1-3, 10178 Berlin, Germany",
        "coordinates": {"latitude": 52.5212, "longitude": 13.3967},
        "description": "Famous for its classical antiquities, including the Pergamon Altar and the Market Gate of Miletus."
    },
    "BER_NE": {
        "name": "Neues Museum",
        "city": "Berlin",
        "address": "Bodestraße 1-3, 10178 Berlin, Germany",
        "coordinates": {"latitude": 52.5206, "longitude": 13.3975},
        "description": "Opened to the public in 2009 after extensive restoration, it houses the Collection of Ancient Egypt, among others."
    },
    "BER_AN": {
        "name": "Alte Nationalgalerie",
        "city": "Berlin",
        "address": "Bodestraße 1-3, 10178 Berlin, Germany",
        "coordinates": {"latitude": 52.5209, "longitude": 13.3981},
        "description": "Specialized in 19th-century art, including paintings and sculptures by German artists."
    },
    


    "STO_VA": {
        "name": "Vasa Museum",
        "city": "Stockholm",
        "address": "Galarvarvsvägen 14, 115 21 Stockholm, Sweden",
        "coordinates": {"latitude": 59.3284, "longitude": 18.0916},
        "description": "Houses the Vasa ship, a 17th-century warship that sank on its maiden voyage."
    },
    "STO_NO": {
        "name": "Nordic Museum",
        "city": "Stockholm",
        "address": "Djurgårdsvägen 6-16, 115 93 Stockholm, Sweden",
        "coordinates": {"latitude": 59.3277, "longitude": 18.1006},
        "description": "Dedicated to Nordic culture, exhibiting costumes, furniture, and everyday objects."
    },
    "STO_SK": {
        "name": "Skansen",
        "city": "Stockholm",
        "address": "Djurgårdsslätten 49-51, 115 21 Stockholm, Sweden",
        "coordinates": {"latitude": 59.3257, "longitude": 18.0990},
        "description": "An open-air museum and zoo, showcasing Swedish rural life and Scandinavian animals."
    },
    


    "HEL_NM": {
        "name": "National Museum of Finland",
        "city": "Helsinki",
        "address": "Mannerheimintie 34, 00100 Helsinki, Finland",
        "coordinates": {"latitude": 60.1756, "longitude": 24.9316},
        "description": "Dedicated to Finnish history, with exhibitions covering from prehistory to modern times."
    },
    "HEL_AM": {
        "name": "Ateneum Art Museum",
        "city": "Helsinki",
        "address": "Kaivokatu 2, 00100 Helsinki, Finland",
        "coordinates": {"latitude": 60.1698, "longitude": 24.9449},
        "description": "One of the leading art museums in Finland, exhibiting an extensive collection of Finnish art."
    },
   

    "CPH_NM": {
        "name": "National Museum of Denmark",
        "city": "Copenhagen",
        "address": "Ny Vestergade 10, 1471 København, Denmark",
        "coordinates": {"latitude": 55.6761, "longitude": 12.5762},
        "description": "Dedicated to Danish history, covering from the Stone Age to the present day."
    },
    "CPH_DS": {
        "name": "The Royal Danish Library - The Black Diamond",
        "city": "Copenhagen",
        "address": "Søren Kierkegaards Plads 1, 1221 København, Denmark",
        "coordinates": {"latitude": 55.6786, "longitude": 12.5849},
        "description": "A modern library and cultural center, known for its unique architecture."
    },
    "CPH_NG": {
        "name": "Ny Carlsberg Glyptotek",
        "city": "Copenhagen",
        "address": "Dantes Plads 7, 1556 København, Denmark",
        "coordinates": {"latitude": 55.6726, "longitude": 12.5654},
        "description": "An art museum with a diverse collection, including ancient sculptures, classical and impressionist art."
    },
    


    "WAW_PN": {
        "name": "National Museum in Poland",
        "city": "Warsaw",
        "address": "Al. Jerozolimskie 3, 00-495 Warsaw, Poland",
        "coordinates": {"latitude": 52.2318, "longitude": 21.0053},
        "description": "The largest art museum in Poland, with collections spanning paintings, sculptures, and decorative arts."
    },
    "WAW_WU": {
        "name": "Warsaw Uprising Museum",
        "city": "Warsaw",
        "address": "Grzybowska 79, 00-844 Warsaw, Poland",
        "coordinates": {"latitude": 52.2323, "longitude": 20.9787},
        "description": "Dedicated to the Warsaw Uprising of 1944 during World War II, with interactive exhibits."
    },
    "WAW_CS": {
        "name": "Copernicus Science Centre",
        "city": "Warsaw",
        "address": "Wybrzeże Kościuszkowskie 20, 00-390 Warsaw, Poland",
        "coordinates": {"latitude": 52.2392, "longitude": 21.0285},
        "description": "An interactive science museum, offering educational experiences and exhibitions on science and technology."
    },
   
    "LIS_NT": {
        "name": "National Tile Museum",
        "city": "Lisbon",
        "address": "R. da Madre de Deus 4, 1900-312 Lisbon, Portugal",
        "coordinates": {"latitude": 38.7247, "longitude": -9.1156},
        "description": "Dedicated to the history and art of tiles in Portugal, exhibiting an impressive collection."
    },
    "LIS_NA": {
        "name": "National Museum of Ancient Art",
        "city": "Lisbon",
        "address": "R. das Janelas Verdes, 1249-017 Lisbon, Portugal",
        "coordinates": {"latitude": 38.7049, "longitude": -9.1596},
        "description": "Presents a vast collection of paintings, sculptures, and decorative arts from various periods."
    },
    "LIS_BT": {
        "name": "Belém Tower",
        "city": "Lisbon",
        "address": "Av. Brasília, 1400-038 Lisbon, Portugal",
        "coordinates": {"latitude": 38.6916, "longitude": -9.2160},
        "description": "A historic defensive tower that now functions as a museum, offering panoramic views of the Tagus River."
    },
    


    "PRG_NM": {
        "name": "Prague National Museum",
        "city": "Prague",
        "address": "Wenceslas Square 68, 115 79 Prague, Czech Republic",
        "coordinates": {"latitude": 50.0803, "longitude": 14.4244},
        "description": "The largest museum in Prague, housing collections of natural history, science, and Czech culture."
    },
    "PRG_PC": {
        "name": "Prague Castle",
        "city": "Prague",
        "address": "119 08 Prague 1, Czech Republic",
        "coordinates": {"latitude": 50.0919, "longitude": 14.3995},
        "description": "A historic complex that includes the Royal Palace, St. Vitus Cathedral, and other notable buildings."
    },
    "PRG_NG": {
        "name": "National Gallery in Prague",
        "city": "Prague",
        "address": "Staroměstské náměstí 12, 110 15 Prague, Czech Republic",
        "coordinates": {"latitude": 50.0878, "longitude": 14.4193},
        "description": "With several branches, it exhibits a rich collection of Czech and international art, including paintings and sculptures."
    },
    "PRG_MD": {
        "name": "Museum of Decorative Arts in Prague",
        "city": "Prague",
        "address": "17. listopadu 2, 110 00 Prague, Czech Republic",
        "coordinates": {"latitude": 50.0911, "longitude": 14.4035},
        "description": "Focused on decorative arts, including furniture, ceramics, glass, and textiles."
    },
    "PRG_LP": {
        "name": "Lobkowicz Palace Museum",
        "city": "Prague",
        "address": "Jiřská 3, 119 00 Prague, Czech Republic",
        "coordinates": {"latitude": 50.0913, "longitude": 14.4041},
        "description": "Located in Prague Castle, it exhibits the private collection of the Lobkowicz family, including art, music, and history."
    },
    "PRG_JM": {
        "name": "Jewish Museum in Prague",
        "city": "Prague",
        "address": "U Staré školy 141/1, 110 00 Prague, Czech Republic",
        "coordinates": {"latitude": 50.0903, "longitude": 14.4171},
        "description": "With several synagogues and the Jewish Cemetery, it documents the history of the Jewish community in Prague."
    },
    "PRG_KM": {
        "name": "Kampa Museum",
        "city": "Prague",
        "address": "U Sovových mlýnů 2, 118 00 Prague, Czech Republic",
        "coordinates": {"latitude": 50.0868, "longitude": 14.4085},
        "description": "Dedicated to modern art from Central Europe, with a collection of paintings, sculptures, and installations."
    },
    "PRG_NT": {
        "name": "National Technical Museum in Prague",
        "city": "Prague",
        "address": "Kostelní 42, 170 78 Prague, Czech Republic",
        "coordinates": {"latitude": 50.0995, "longitude": 14.4229},
        "description": "Addresses the history of science and technology, with interactive exhibits and a diverse collection."
    },
    "PRG_MA": {
        "name": "Museum of Alchemists and Magicians",
        "city": "Prague",
        "address": "Jánský vršek 8, 118 00 Prague, Czech Republic",
        "coordinates": {"latitude": 50.0877, "longitude": 14.4079},
        "description": "A thematic museum exploring the world of alchemy and magic, with instruments and related exhibits."
    },
    "PRG_DO": {
        "name": "DOX - Center for Contemporary Art",
        "city": "Prague",
        "address": "Poupětova 595/1, 170 00 Prague, Czech Republic",
        "coordinates": {"latitude": 50.1097, "longitude": 14.4443},
        "description": "A space dedicated to contemporary art, with exhibitions, events, and innovative installations."
    },

    "DUB_NM": {
        "name": "National Museum of Ireland - Archaeology",
        "city": "Dublin",
        "address": "Kildare St, Dublin 2, Ireland",
        "coordinates": {"latitude": 53.3403, "longitude": -6.2552},
        "description": "Exhibits archaeological artifacts that tell the history of Ireland from prehistory to the Middle Ages."
    },
    "DUB_NG": {
        "name": "National Gallery of Ireland",
        "city": "Dublin",
        "address": "Merrion Square West, Dublin, D02 K303, Ireland",
        "coordinates": {"latitude": 53.3409, "longitude": -6.2523},
        "description": "Presents a vast collection of Irish and European art, including paintings, sculptures, and decorative arts."
    },
   


    "OSL_MM": {
        "name": "Munch Museum",
        "city": "Oslo",
        "address": "Tøyengata 53, 0578 Oslo, Norway",
        "coordinates": {"latitude": 59.9133, "longitude": 10.7775},
        "description": "Dedicated to the famous painter Edvard Munch, exhibiting many of his iconic works."
    },
    "OSL_VS": {
        "name": "Viking Ship Museum",
        "city": "Oslo",
        "address": "Huk Aveny 35, 0287 Oslo, Norway",
        "coordinates": {"latitude": 59.9078, "longitude": 10.6866},
        "description": "Housing incredibly preserved Viking ships and artifacts related to Norse culture."
    },
   

    "BUD_MF": {
        "name": "Museum of Fine Arts",
        "city": "Budapest",
        "address": "Dózsa György út 41, 1146 Budapest, Hungary",
        "coordinates": {"latitude": 47.5259, "longitude": 19.0810},
        "description": "A comprehensive collection of European art, with an emphasis on paintings and sculptures."
    },
    "BUD_HN": {
        "name": "Hungarian National Museum",
        "city": "Budapest",
        "address": "Múzeum krt. 14-16, 1088 Budapest, Hungary",
        "coordinates": {"latitude": 47.4871, "longitude": 19.0658},
        "description": "Tells the history of Hungary from ancient times to the present, exhibiting historical artifacts."
    },
    "BUD_HR": {
        "name": "Hospital in the Rock Nuclear Bunker Museum",
        "city": "Budapest",
        "address": "Lovas út 4/c, 1012 Budapest, Hungary",
        "coordinates": {"latitude": 47.5022, "longitude": 19.0354},
        "description": "A museum located in a World War II nuclear bunker, showcasing medical and military history."
    },


    "VIE_AH": {
        "name": "Art History Museum",
        "city": "Vienna",
        "address": "Maria-Theresien-Platz, 1010 Vienna, Austria",
        "coordinates": {"latitude": 48.2035, "longitude": 16.3615},
        "description": "Home to a vast collection of art, including works by masters such as Rembrandt and Vermeer."
    },
    "VIE_BP": {
        "name": "Belvedere Palace and Museum",
        "city": "Vienna",
        "address": "Prinz Eugen-Straße 27, 1030 Vienna, Austria",
        "coordinates": {"latitude": 48.1911, "longitude": 16.3806},
        "description": "A baroque palace with an impressive art collection, including works by Gustav Klimt."
    },
    "VIE_AL": {
        "name": "Albertina",
        "city": "Vienna",
        "address": "Albertinaplatz 1, 1010 Vienna, Austria",
        "coordinates": {"latitude": 48.2044, "longitude": 16.3688},
        "description": "An art gallery and museum that displays a vast collection of drawings, prints, and photographs."
    },


    "BRU_RM": {
        "name": "Royal Museum of Fine Arts of Belgium",
        "city": "Brussels",
        "address": "Rue de la Régence 3, 1000 Brussels, Belgium",
        "coordinates": {"latitude": 50.8433, "longitude": 4.3595},
        "description": "An extensive collection of Belgian art, including paintings, sculptures, and decorative arts."
    },
    "BRU_MM": {
        "name": "Magritte Museum",
        "city": "Brussels",
        "address": "Koningsplein 1, 1000 Brussels, Belgium",
        "coordinates": {"latitude": 50.8444, "longitude": 4.3565},
        "description": "Dedicated to the famous surrealist artist René Magritte, showcasing his most iconic works."
    },
    "BRU_HM": {
        "name": "Horta Museum",
        "city": "Brussels",
        "address": "Rue Américaine 25, 1060 Brussels, Belgium",
        "coordinates": {"latitude": 50.8229, "longitude": 4.3454},
        "description": "A house-museum dedicated to the Art Nouveau architect Victor Horta, displaying his innovative creations."
    },


    "LUX_CM": {
        "name": "Luxembourg City History Museum",
        "city": "Luxembourg",
        "address": "14 Rue du St Esprit, 1475 Luxembourg",
        "coordinates": {"latitude": 49.6101, "longitude": 6.1319},
        "description": "Chronicles the history of Luxembourg City through interactive exhibits and historical artifacts."
    },
    "LUX_MM": {
        "name": "Mudam - Museum of Modern Art",
        "city": "Luxembourg",
        "address": "3 Park Dräi Eechelen, 1499 Luxembourg",
        "coordinates": {"latitude": 49.6109, "longitude": 6.1339},
        "description": "A museum of modern art featuring temporary exhibitions by contemporary artists."
    },
    "LUX_CB": {
        "name": "Casemates du Bock",
        "city": "Luxembourg",
        "address": "10 Montée de Clausen, 1343 Luxembourg",
        "coordinates": {"latitude": 49.6084, "longitude": 6.1307},
        "description": "A network of historic underground tunnels used as fortifications, providing a unique insight into Luxembourg's military history."
    },


    "ATH_AM": {
        "name": "Acropolis Museum",
        "city": "Athens",
        "address": "Dionysiou Areopagitou 15, 117 42 Athens, Greece",
        "coordinates": {"latitude": 37.9686, "longitude": 23.7263},
        "description": "A modern museum housing sculptures and artifacts from the Acropolis of Athens."
    },
    "ATH_NA": {
        "name": "National Archaeological Museum of Athens",
        "city": "Athens",
        "address": "44 Patission Street, 10682 Athens, Greece",
        "coordinates": {"latitude": 37.9838, "longitude": 23.7275},
        "description": "An extensive collection of Greek archaeological artifacts, ranging from Prehistory to Classical Antiquity."
    },
    "ATH_BM": {
        "name": "Benaki Museum",
        "city": "Athens",
        "address": "Koumpari 1, 10674 Athens, Greece",
        "coordinates": {"latitude": 37.9769, "longitude": 23.7360},
        "description": "A museum of Greek art displaying a wide range of objects, from folk art to contemporary art."
    },

    "SOF_NM": {
        "name": "National Museum of Military History",
        "city": "Sofia",
        "address": "92 Cherkovna Street, 1504 Sofia, Bulgaria",
        "coordinates": {"latitude": 42.6978, "longitude": 23.3174},
        "description": "Chronicles the military history of Bulgaria, displaying uniforms, weapons, and military equipment."
    },
    "SOF_NG": {
        "name": "National Gallery of Foreign Art",
        "city": "Sofia",
        "address": "1 St Alexander Nevsky Square, 1000 Sofia, Bulgaria",
        "coordinates": {"latitude": 42.6979, "longitude": 23.3219},
        "description": "An art gallery featuring collections of foreign art, including paintings, sculptures, and decorative arts."
    },
    "SOF_NH": {
        "name": "National Museum of Natural History",
        "city": "Sofia",
        "address": "1 Tsar Osvoboditel Blvd., 1000 Sofia, Bulgaria",
        "coordinates": {"latitude": 42.6941, "longitude": 23.3323},
        "description": "Focused on natural history, with exhibitions covering the fauna, flora, and geology of Bulgaria."
    },

    "ZAG_MM": {
        "name": "Mimara Museum",
        "city": "Zagreb",
        "address": "Roosevelt Square 5, 10000 Zagreb, Croatia",
        "coordinates": {"latitude": 45.8078, "longitude": 15.9682},
        "description": "An eclectic collection of art, including paintings, sculptures, ceramics, and objects of applied art."
    },
    "ZAG_MZ": {
        "name": "Museum of Contemporary Art Zagreb",
        "city": "Zagreb",
        "address": "Avenija Dubrovnik 17, 10000 Zagreb, Croatia",
        "coordinates": {"latitude": 45.7814, "longitude": 15.9742},
        "description": "Dedicated to contemporary art, exhibiting works by Croatian and international artists."
    },
    "ZAG_AZ": {
        "name": "Archaeological Museum Zagreb",
        "city": "Zagreb",
        "address": "Trg Nikole Šubića Zrinskog 19, 10000 Zagreb, Croatia",
        "coordinates": {"latitude": 45.8080, "longitude": 15.9772},
        "description": "A rich collection of archaeological artifacts that narrate the history of the region from prehistory to the Middle Ages."
    }
}



# colocar coordenadas num tuplo se necessário

# for museum, details in museums.items():
#     lat = details["coordinates"]["latitude"]
#     lon = details["coordinates"]["longitude"]
#     details["coordinates"] = (lat, lon)



def calculate_duration(origin, destination):
    """Estimate flight duration based on distance."""
    coords_1 = airports[origin][1]
    coords_2 = airports[destination][1]
    distance = geopy.distance.distance(coords_1, coords_2).km
    average_speed_km_per_hour = 800
    duration_hours = distance / average_speed_km_per_hour
    return timedelta(hours=duration_hours)

def define_state():

    states = ['Canceled', 'Delay']
    probs = [0.2, 0.8]

    selected_state = np.random.choice(states, p=probs)
    delay_time = timedelta(hours=random.randint(1, 5)) if selected_state == 'Delay' else None

    return selected_state, delay_time

def update_random_flight(flights):
    # Select a random flight
    random_flight = copy.deepcopy(random.choice(flights))

    # Update the flight state
    state, delay_time = define_state()
    random_flight['state'] = state
    if state == 'Delay':
        # Update the departure and arrival times
        departure_time = datetime.strptime(random_flight['departureHour'], '%Y-%m-%d %H:%M')
        arrival_time = datetime.strptime(random_flight['arrivalHour'], '%Y-%m-%d %H:%M')
        random_flight['departureHour'] = (departure_time + delay_time).strftime('%Y-%m-%d %H:%M')
        random_flight['arrivalHour'] = (arrival_time + delay_time).strftime('%Y-%m-%d %H:%M')
    else:
        random_flight['departureHour'] = None
        random_flight['arrivalHour'] = None

    print(f"Flight {random_flight['flightNumber']} updated to state {random_flight['state']}")
    
    return random_flight


def update_random_flight_price(flights):
    # Select a random flight
    random_flight = copy.deepcopy(random.choice(flights))
    random_flight['price'] = round(random.uniform(50.0, 1000.0), 2)
   
    print(f"Flight {random_flight['flightNumber']} updated to state {random_flight['price']}")
    
    return random_flight

def update_random_hotel_price(hotels):
    # Select a random flight
    random_hotel = copy.deepcopy(random.choice(hotels))
    random_hotel['initialPrice'] = round(random.uniform(50.0, 1000.0), 2)
   
    print(f"Flight {random_hotel['hotelName']} updated to state {random_hotel['initialPrice']}")
    
    return random_hotel

def generate_flights():
    all_flights = []

    # Escolher uma rota fixa
    origin, destination = random.sample(list(airports.keys()), 2)

    # Selecionar 5 companhias aéreas diferentes
    selected_airlines = random.sample(list(airlines.keys()), 5)

    # Replicar voos para cada companhia aérea durante 90 dias
    for airline_code in selected_airlines:
        for day_offset in range(90):
            # Gerar horários aleatórios de partida para cada voo
            departure_time_ida = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0) + timedelta(days=day_offset)
            departure_time_ida += timedelta(hours=random.randint(0, 23), minutes=random.randint(0, 59))
            duration_ida = calculate_duration(origin, destination)
            arrival_time_ida = departure_time_ida + duration_ida

            departure_time_volta = departure_time_ida + timedelta(hours=random.randint(1, 5))
            duration_volta = calculate_duration(destination, origin)
            arrival_time_volta = departure_time_volta + duration_volta

            # Adicionar voos de ida e volta à lista
            voo_ida = {
                "flightNumber": airline_code + faker.bothify(text='####'),
                "flightDate": departure_time_ida.strftime('%Y-%m-%d'),
                "airlineCode": airline_code,
                "airportCodeOrigin": origin,
                "airportCodeDestination": destination,
                "departureHour": departure_time_ida.strftime('%Y-%m-%d %H:%M'),
                "arrivalHour": arrival_time_ida.strftime('%Y-%m-%d %H:%M'),
                "duration": str(duration_ida),
                "state": "OK",
                "price": round(random.uniform(50.0, 1000.0), 2),
                "seats": random.randint(1, 300)
            }

            voo_volta = {
                "flightNumber": airline_code + faker.bothify(text='####'),
                "flightDate": departure_time_volta.strftime('%Y-%m-%d'),
                "airlineCode": airline_code,
                "airportCodeOrigin": destination,
                "airportCodeDestination": origin,
                "departureHour": departure_time_volta.strftime('%Y-%m-%d %H:%M'),
                "arrivalHour": arrival_time_volta.strftime('%Y-%m-%d %H:%M'),
                "duration": str(duration_volta),
                "state": "OK",
                "price": round(random.uniform(50.0, 1000.0), 2),
                "seats": random.randint(1, 300)
            }

            all_flights.append(voo_ida)
            all_flights.append(voo_volta)

    return all_flights

# def promotion_price(price):
#     newprice = round(random.uniform(80.0, price), 2) # generate prommotion price, always lower than the initial price

#     return {
#         # same hotel with diferent price
#     }


def generate_random_hotels():
    """Generates random flight data with realistic duration, departure, and arrival times."""
    name = random.choice(list(hotels.keys()))
    address = hotels[name]['address']
    phone = hotels[name]['phone']
    typeRoom = random.choice(hotel_type)
    ac = random.choice([True, False])
    wifi = random.choice([True, False])
    return {
        "hotelName": name,
        "address": address,
        "phoneNumber": phone,
        "people": random.randint(1, 5),
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


## random museums

def generate_random_museums(key):
    """Generates random opening hours and tictek prices for the museums"""
    name = museums[key]['name']
    city = museums[key]['city']
    address = museums[key]['address']
    lat = museums[key]['coordinates']['latitude']
    long = museums[key]['coordinates']['longitude']
    description = museums[key]['description']
    opening_hours = f"{random.randint(9, 14)}:00 - {random.randint(17,20)}:00"
    adult_ticket = round(random.uniform(5.0, 20.0), 2)
    child_ticket = round(random.uniform(3.0, adult_ticket-1), 2)
    adult_group_ticket = round(random.uniform(45, 60.0), 2)
    child_group_ticket = round(random.uniform(30, 40), 2)
    return {
        "museumName": name,
        "streetAddress": address,
        "museumLocation": city,
        "museumLatitude": lat,
        "museumLongitude": long,
        "museumDescription": description,
        "openingHours": opening_hours,
        "ticketPriceAdult": adult_ticket,
        "ticketPriceChild": child_ticket,
        "ticketPriceGroup": adult_group_ticket,
        "ticketPriceGroupChild": child_group_ticket
    }

def send_museum_data_to_kafka(topic, museum_data):
    """Sends museum data to Kafka."""
    producer.produce(topic, key=str(museum_data['museumName']), value=json.dumps(museum_data))
    producer.flush()
    
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
    print("Sending hotel data")
    producer.produce(topic, key=str(hotel_data['hotelName']), value=json.dumps(hotel_data))
    producer.flush()

def send_flight_change_to_kafka(topic, flight):
    change_info = {
        'flightNumber': flight['flightNumber'],
        'newState': flight['state'],
        'newDepartureHour': flight.get('departureHour', None),
        'newArrivalHour': flight.get('arrivalHour', None)
    }
    
    print("Sending flight change")

    producer.produce(topic, key=flight['flightNumber'], value=json.dumps(change_info))
    producer.flush()

def send_flight_price_change_to_kafka(topic, flight):
    change_info = {
        'flightNumber': flight['flightNumber'],
        'price': flight['price']
    }
    print("Sending flight change")
    producer.produce(topic, key=flight['flightNumber'], value=json.dumps(change_info))
    producer.flush()

def send_hotel_price_change_to_kafka(topic, hotel):
    change_info = {
        'hotelName': hotel['hotelName'],
        'price': hotel['initialPrice']
    }
    print("Sending flight change")
    producer.produce(topic, key=hotel['hotelName'], value=json.dumps(change_info))
    producer.flush()
    

try:
    i = 0
    flights = []
    hotel_data = []
    while True:
        i = i + 1
        print(i)
        print("Generating flights...")

        if i == 1:
            send_airport_data_to_kafka('airports_topic')  
            send_airline_data_to_kafka('airlines_topic')
            send_station_data_to_kafka('station_topic')
            send_train_company_data_to_kafka('train_company_topic')

        if i == 1:
            for _ in range(15):
                new_flights = generate_flights()
                flights.extend(new_flights)
                for flight in flights:
                    send_to_kafka('flighs_data', flight)
                    print("Sending flight data")
                    
                trains = generate_random_train()
                send_to_kafka_trains('train_data', trains)
                print("Sending train data")

            for _ in range(25):   
                hotel_data2 = generate_random_hotels()
                hotel_data.append(hotel_data2)
                send_to_kafka_hotel('hotel_data', hotel_data2)
            
            for key in museums.keys():
                print("Sending museum data")
                museum_data = generate_random_museums(key)
                send_museum_data_to_kafka('museums_topic', museum_data)


        if i > 1:
            time.sleep(60)
            print("Updating a random flight...")
            updated_flight = update_random_flight(flights)
            send_flight_change_to_kafka('flight_change', updated_flight)

            print("Updating a random flight price...")
            updated_flight = update_random_flight_price(flights)
            send_flight_price_change_to_kafka('flight_price_change', updated_flight)

            print("Updating a random hotel price...")
            updated_hotel = update_random_hotel_price(hotel_data)
            send_hotel_price_change_to_kafka('hotel_price_change', updated_hotel)
        
        i = i + 1

    
except KeyboardInterrupt:
    print("Keyboard Interrupt")