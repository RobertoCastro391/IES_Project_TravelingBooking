import json
import random
from datetime import datetime, timedelta
import time
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


museums = {
    "PAR_LO": {
        "name": "Museu do Louvre",
        "city": "Paris",
        "address": "Rue de Rivoli, 75001 Paris, França",
        "coordinates": {"latitude": 48.8606, "longitude": 2.3376},
        "description": "Um dos maiores e mais famosos museus do mundo, localizado no centro de Paris."
    },
    "PAR_OR": {
        "name": "Museu de Orsay",
        "city": "Paris",
        "address": "1 Rue de la Légion d'Honneur, 75007 Paris, França",
        "coordinates": {"latitude": 48.8599, "longitude": 2.3266},
        "description": "Dedicado à arte do século XIX, situado em uma antiga estação ferroviária."
    },
    

    "MAD_PR": {
        "name": "Museu do Prado",
        "city": "Madrid",
        "address": "Calle de Ruiz de Alarcón, 23, 28014 Madrid, Espanha",
        "coordinates": {"latitude": 40.4139, "longitude": -3.6922},
        "description": "Um dos museus de arte mais importantes do mundo, focado em arte europeia."
    },
    "MAD_RS": {
        "name": "Museu Nacional Centro de Arte Reina Sofía",
        "city": "Madrid",
        "address": "Calle de Santa Isabel, 52, 28012 Madrid, Espanha",
        "coordinates": {"latitude": 40.4086, "longitude": -3.6936},
        "description": "Conhecido por abrigar a famosa obra 'Guernica' de Picasso, além de arte contemporânea."
    },
    "MAD_TH": {
        "name": "Museu Thyssen-Bornemisza",
        "city": "Madrid",
        "address": "Paseo del Prado, 8, 28014 Madrid, Espanha",
        "coordinates": {"latitude": 40.4169, "longitude": -3.6944},
        "description": "Uma coleção única que abrange sete séculos de arte europeia, do século XIII ao século XX."
    },
    


    "ROM_VA": {
        "name": "Museus do Vaticano",
        "city": "Roma",
        "address": "Viale Vaticano, 00165 Roma, Itália",
        "coordinates": {"latitude": 41.9022, "longitude": 12.4534},
        "description": "Uma das maiores coleções de arte e antiguidades do mundo, incluindo a Capela Sistina."
    },
    "ROM_BO": {
        "name": "Galeria Borghese",
        "city": "Roma",
        "address": "Viale delle Belle Arti, 5, 00197 Roma, Itália",
        "coordinates": {"latitude": 41.9145, "longitude": 12.4924},
        "description": "Uma magnífica galeria de arte com esculturas, pinturas e antiguidades em um ambiente barroco."
    },
    

    "LON_BR": {
        "name": "Museu Britânico",
        "city": "Londres",
        "address": "Great Russell Street, London WC1B 3DG, Reino Unido",
        "coordinates": {"latitude": 51.5194, "longitude": -0.1270},
        "description": "Um dos maiores e mais abrangentes museus do mundo, abrigando uma vasta coleção de artefatos globais."
    },
    "LON_NG": {
        "name": "National Gallery",
        "city": "Londres",
        "address": "Trafalgar Square, London WC2N 5DN, Reino Unido",
        "coordinates": {"latitude": 51.5089, "longitude": -0.1283},
        "description": "Uma das principais galerias de arte do mundo, com uma coleção impressionante de pinturas europeias."
    },
   

    "AMS_RM": {
        "name": "Rijksmuseum",
        "city": "Amsterdã",
        "address": "Museumstraat 1, 1071 XX Amsterdam, Países Baixos",
        "coordinates": {"latitude": 52.3600, "longitude": 4.8852},
        "description": "O museu nacional dos Países Baixos, com uma vasta coleção de arte e história."
    },
    "AMS_VG": {
        "name": "Museu Van Gogh",
        "city": "Amsterdã",
        "address": "Museumplein 6, 1071 DJ Amsterdam, Países Baixos",
        "coordinates": {"latitude": 52.3584, "longitude": 4.8818},
        "description": "Dedicado à vida e obra do famoso pintor Vincent van Gogh, com uma extensa coleção de suas pinturas."
    },
    "AMS_AF": {
        "name": "Casa de Anne Frank",
        "city": "Amsterdã",
        "address": "Prinsengracht 263-267, 1016 GV Amsterdam, Países Baixos",
        "coordinates": {"latitude": 52.3752, "longitude": 4.8837},
        "description": "A casa onde Anne Frank e sua família se esconderam durante a Segunda Guerra Mundial, agora um museu dedicado à sua memória."
    },
    

    "BER_PE": {
        "name": "Museu Pergamon",
        "city": "Berlim",
        "address": "Bodestraße 1-3, 10178 Berlin, Alemanha",
        "coordinates": {"latitude": 52.5212, "longitude": 13.3967},
        "description": "Famoso por suas antiguidades clássicas, incluindo o Altar de Pérgamo e a Porta do Mercado de Mileto."
    },
    "BER_NE": {
        "name": "Museu Novo (Neues Museum)",
        "city": "Berlim",
        "address": "Bodestraße 1-3, 10178 Berlin, Alemanha",
        "coordinates": {"latitude": 52.5206, "longitude": 13.3975},
        "description": "Aberto ao público em 2009 após uma restauração extensa, abriga a Coleção do Antigo Egito, entre outras."
    },
    "BER_AN": {
        "name": "Alte Nationalgalerie",
        "city": "Berlim",
        "address": "Bodestraße 1-3, 10178 Berlin, Alemanha",
        "coordinates": {"latitude": 52.5209, "longitude": 13.3981},
        "description": "Especializado em arte do século XIX, incluindo pinturas e esculturas de artistas alemães."
    },
    


    "STO_VA": {
        "name": "Vasa Museum",
        "city": "Estocolmo",
        "address": "Galarvarvsvägen 14, 115 21 Stockholm, Suécia",
        "coordinates": {"latitude": 59.3284, "longitude": 18.0916},
        "description": "Abriga o navio Vasa, um navio de guerra do século XVII que afundou em sua viagem inaugural."
    },
    "STO_NO": {
        "name": "Nordiska Museet",
        "city": "Estocolmo",
        "address": "Djurgårdsvägen 6-16, 115 93 Stockholm, Suécia",
        "coordinates": {"latitude": 59.3277, "longitude": 18.1006},
        "description": "Dedicado à cultura nórdica, exibindo trajes, móveis, e objetos do cotidiano."
    },
    "STO_SK": {
        "name": "Skansen",
        "city": "Estocolmo",
        "address": "Djurgårdsslätten 49-51, 115 21 Stockholm, Suécia",
        "coordinates": {"latitude": 59.3257, "longitude": 18.0990},
        "description": "Um museu ao ar livre e zoológico, apresentando a vida rural sueca e animais escandinavos."
    },
    


    "HEL_NM": {
        "name": "Museu Nacional da Finlândia",
        "city": "Helsinque",
        "address": "Mannerheimintie 34, 00100 Helsinki, Finlândia",
        "coordinates": {"latitude": 60.1756, "longitude": 24.9316},
        "description": "Dedicado à história finlandesa, com exposições que abrangem desde a pré-história até os tempos modernos."
    },
    "HEL_AM": {
        "name": "Museu de Arte Ateneum",
        "city": "Helsinque",
        "address": "Kaivokatu 2, 00100 Helsinki, Finlândia",
        "coordinates": {"latitude": 60.1698, "longitude": 24.9449},
        "description": "Um dos principais museus de arte da Finlândia, exibindo uma extensa coleção de arte finlandesa."
    },
   

    "CPH_NM": {
        "name": "Museu Nacional da Dinamarca",
        "city": "Copenhague",
        "address": "Ny Vestergade 10, 1471 København, Dinamarca",
        "coordinates": {"latitude": 55.6761, "longitude": 12.5762},
        "description": "Dedicado à história dinamarquesa, abrange desde a Idade da Pedra até os dias atuais."
    },
    "CPH_DS": {
        "name": "A Biblioteca Real Dinamarquesa - A Diamante Negra",
        "city": "Copenhague",
        "address": "Søren Kierkegaards Plads 1, 1221 København, Dinamarca",
        "coordinates": {"latitude": 55.6786, "longitude": 12.5849},
        "description": "Uma biblioteca e centro cultural moderno, conhecido por sua arquitetura única."
    },
    "CPH_NG": {
        "name": "Ny Carlsberg Glyptotek",
        "city": "Copenhague",
        "address": "Dantes Plads 7, 1556 København, Dinamarca",
        "coordinates": {"latitude": 55.6726, "longitude": 12.5654},
        "description": "Um museu de arte com uma coleção diversificada, incluindo esculturas antigas, arte clássica e impressionista."
    },
    


    "WAW_PN": {
        "name": "Museu Nacional da Polônia",
        "city": "Varsóvia",
        "address": "Al. Jerozolimskie 3, 00-495 Warszawa, Polônia",
        "coordinates": {"latitude": 52.2318, "longitude": 21.0053},
        "description": "O maior museu de arte na Polônia, com coleções abrangendo pinturas, esculturas e artes decorativas."
    },
    "WAW_WU": {
        "name": "Museu do Levante de Varsóvia",
        "city": "Varsóvia",
        "address": "Grzybowska 79, 00-844 Warszawa, Polônia",
        "coordinates": {"latitude": 52.2323, "longitude": 20.9787},
        "description": "Dedicado à Revolta de Varsóvia de 1944 durante a Segunda Guerra Mundial, com exposições interativas."
    },
    "WAW_CS": {
        "name": "Centro de Ciência Copérnico",
        "city": "Varsóvia",
        "address": "Wybrzeże Kościuszkowskie 20, 00-390 Warszawa, Polônia",
        "coordinates": {"latitude": 52.2392, "longitude": 21.0285},
        "description": "Um museu de ciências interativo, oferecendo experiências educativas e exposições sobre ciência e tecnologia."
    },
   
    "LIS_NT": {
        "name": "Museu Nacional do Azulejo",
        "city": "Lisboa",
        "address": "R. da Madre de Deus 4, 1900-312 Lisboa, Portugal",
        "coordinates": {"latitude": 38.7247, "longitude": -9.1156},
        "description": "Dedicado à história e arte dos azulejos em Portugal, exibindo uma coleção impressionante."
    },
    "LIS_NA": {
        "name": "Museu Nacional de Arte Antiga",
        "city": "Lisboa",
        "address": "R. das Janelas Verdes, 1249-017 Lisboa, Portugal",
        "coordinates": {"latitude": 38.7049, "longitude": -9.1596},
        "description": "Apresenta uma vasta coleção de pinturas, esculturas, e artes decorativas de várias épocas."
    },
    "LIS_BT": {
        "name": "Torre de Belém",
        "city": "Lisboa",
        "address": "Av. Brasília, 1400-038 Lisboa, Portugal",
        "coordinates": {"latitude": 38.6916, "longitude": -9.2160},
        "description": "Uma torre defensiva histórica que agora funciona como museu, oferecendo vistas panorâmicas do rio Tejo."
    },
    


    "PRG_NM": {
        "name": "Museu Nacional de Praga",
        "city": "Praga",
        "address": "Wenceslas Square 68, 115 79 Praha, República Tcheca",
        "coordinates": {"latitude": 50.0803, "longitude": 14.4244},
        "description": "O maior museu em Praga, abriga coleções de história natural, ciência e cultura checa."
    },
    "PRG_PC": {
        "name": "Castelo de Praga",
        "city": "Praga",
        "address": "119 08 Praha 1, República Tcheca",
        "coordinates": {"latitude": 50.0919, "longitude": 14.3995},
        "description": "Um complexo histórico que inclui o Palácio Real, a Catedral de São Vito e outros edifícios notáveis."
    },
    "PRG_NG": {
        "name": "Galeria Nacional em Praga",
        "city": "Praga",
        "address": "Staroměstské náměstí 12, 110 15 Praha, República Tcheca",
        "coordinates": {"latitude": 50.0878, "longitude": 14.4193},
        "description": "Com várias filiais, exibe uma rica coleção de arte checa e internacional, incluindo pinturas e esculturas."
    },
    "PRG_MD": {
        "name": "Museu de Artes Decorativas em Praga",
        "city": "Praga",
        "address": "17. listopadu 2, 110 00 Praha, República Tcheca",
        "coordinates": {"latitude": 50.0911, "longitude": 14.4035},
        "description": "Focado em artes decorativas, incluindo móveis, cerâmica, vidro e têxteis."
    },
    "PRG_LP": {
        "name": "Museu do Palácio Lobkowicz",
        "city": "Praga",
        "address": "Jiřská 3, 119 00 Praha, República Tcheca",
        "coordinates": {"latitude": 50.0913, "longitude": 14.4041},
        "description": "Localizado no Castelo de Praga, exibe a coleção privada da família Lobkowicz, incluindo arte, música e história."
    },
    "PRG_JM": {
        "name": "Museu Judeu em Praga",
        "city": "Praga",
        "address": "U Staré školy 141/1, 110 00 Praha, República Tcheca",
        "coordinates": {"latitude": 50.0903, "longitude": 14.4171},
        "description": "Com várias sinagogas e o Cemitério Judeu, documenta a história da comunidade judaica em Praga."
    },
    "PRG_KM": {
        "name": "Museu Kampa",
        "city": "Praga",
        "address": "U Sovových mlýnů 2, 118 00 Praha, República Tcheca",
        "coordinates": {"latitude": 50.0868, "longitude": 14.4085},
        "description": "Dedicado à arte moderna da Europa Central, com uma coleção de pinturas, esculturas e instalações."
    },
    "PRG_NT": {
        "name": "Museu Técnico Nacional de Praga",
        "city": "Praga",
        "address": "Kostelní 42, 170 78 Praha, República Tcheca",
        "coordinates": {"latitude": 50.0995, "longitude": 14.4229},
        "description": "Aborda a história da ciência e da tecnologia, com exposições interativas e uma coleção variada."
    },
    "PRG_MA": {
        "name": "Museu dos Alquimistas e Magos",
        "city": "Praga",
        "address": "Jánský vršek 8, 118 00 Praha, República Tcheca",
        "coordinates": {"latitude": 50.0877, "longitude": 14.4079},
        "description": "Um museu temático que explora o mundo da alquimia e magia, com instrumentos e exposições relacionadas."
    },
    "PRG_DO": {
        "name": "DOX - Centro de Arte Contemporânea",
        "city": "Praga",
        "address": "Poupětova 595/1, 170 00 Praha, República Tcheca",
        "coordinates": {"latitude": 50.1097, "longitude": 14.4443},
        "description": "Um espaço dedicado à arte contemporânea, com exposições, eventos e instalações inovadoras."
    },

    "DUB_NM": {
        "name": "Museu Nacional da Irlanda - Arqueologia",
        "city": "Dublin",
        "address": "Kildare St, Dublin 2, Irlanda",
        "coordinates": {"latitude": 53.3403, "longitude": -6.2552},
        "description": "Exibe artefatos arqueológicos que contam a história da Irlanda desde a pré-história até a Idade Média."
    },
    "DUB_NG": {
        "name": "Galeria Nacional da Irlanda",
        "city": "Dublin",
        "address": "Merrion Square West, Dublin, D02 K303, Irlanda",
        "coordinates": {"latitude": 53.3409, "longitude": -6.2523},
        "description": "Apresenta uma vasta coleção de arte irlandesa e europeia, incluindo pinturas, esculturas e artes decorativas."
    },
   


    "OSL_MM": {
        "name": "Museu Munch",
        "city": "Oslo",
        "address": "Tøyengata 53, 0578 Oslo, Noruega",
        "coordinates": {"latitude": 59.9133, "longitude": 10.7775},
        "description": "Dedicado ao famoso pintor Edvard Munch, exibindo muitas de suas obras icônicas."
    },
    "OSL_VS": {
        "name": "Museu dos Barcos Vikings",
        "city": "Oslo",
        "address": "Huk Aveny 35, 0287 Oslo, Noruega",
        "coordinates": {"latitude": 59.9078, "longitude": 10.6866},
        "description": "Abrigando barcos vikings incrivelmente preservados e artefatos relacionados à cultura nórdica."
    },
   

    "BUD_MF": {
        "name": "Museu de Belas Artes",
        "city": "Budapeste",
        "address": "Dózsa György út 41, 1146 Budapeste, Hungria",
        "coordinates": {"latitude": 47.5259, "longitude": 19.0810},
        "description": "Uma coleção abrangente de arte europeia, com ênfase em pinturas e esculturas."
    },
    "BUD_HN": {
        "name": "Museu Nacional Húngaro",
        "city": "Budapeste",
        "address": "Múzeum krt. 14-16, 1088 Budapeste, Hungria",
        "coordinates": {"latitude": 47.4871, "longitude": 19.0658},
        "description": "Conta a história da Hungria desde os tempos antigos até os dias atuais, exibindo artefatos históricos."
    },
    "BUD_HR": {
        "name": "Museu Hospital in the Rock Nuclear Bunker",
        "city": "Budapeste",
        "address": "Lovas út 4/c, 1012 Budapeste, Hungria",
        "coordinates": {"latitude": 47.5022, "longitude": 19.0354},
        "description": "Um museu localizado em um abrigo nuclear da Segunda Guerra Mundial, mostrando a história médica e militar."
    },


     "VIE_AH": {
        "name": "Museu de História da Arte",
        "city": "Viena",
        "address": "Maria-Theresien-Platz, 1010 Viena, Áustria",
        "coordinates": {"latitude": 48.2035, "longitude": 16.3615},
        "description": "Casa uma vasta coleção de arte, incluindo obras de mestres como Rembrandt e Vermeer."
    },
    "VIE_BP": {
        "name": "Palácio Belvedere e Museu",
        "city": "Viena",
        "address": "Prinz Eugen-Straße 27, 1030 Viena, Áustria",
        "coordinates": {"latitude": 48.1911, "longitude": 16.3806},
        "description": "Um palácio barroco com uma coleção de arte impressionante, incluindo obras de Gustav Klimt."
    },
    "VIE_AL": {
        "name": "Albertina",
        "city": "Viena",
        "address": "Albertinaplatz 1, 1010 Viena, Áustria",
        "coordinates": {"latitude": 48.2044, "longitude": 16.3688},
        "description": "Uma galeria de arte e museu que exibe uma vasta coleção de desenhos, gravuras e fotografias."
    },


    "BRU_RM": {
        "name": "Museu Real de Belas Artes da Bélgica",
        "city": "Bruxelas",
        "address": "Rue de la Régence 3, 1000 Bruxelas, Bélgica",
        "coordinates": {"latitude": 50.8433, "longitude": 4.3595},
        "description": "Uma extensa coleção de arte belga, incluindo pinturas, esculturas e artes decorativas."
    },
    "BRU_MM": {
        "name": "Museu Magritte",
        "city": "Bruxelas",
        "address": "Koningsplein 1, 1000 Bruxelas, Bélgica",
        "coordinates": {"latitude": 50.8444, "longitude": 4.3565},
        "description": "Dedicado ao famoso artista surrealista René Magritte, exibindo suas obras mais icônicas."
    },
    "BRU_HM": {
        "name": "Museu Horta",
        "city": "Bruxelas",
        "address": "Rue Américaine 25, 1060 Bruxelas, Bélgica",
        "coordinates": {"latitude": 50.8229, "longitude": 4.3454},
        "description": "Uma casa-museu dedicada ao arquiteto Art Nouveau Victor Horta, exibindo suas criações inovadoras."
    },


    "LUX_CM": {
        "name": "Museu de História da Cidade de Luxemburgo",
        "city": "Luxemburgo",
        "address": "14 Rue du St Esprit, 1475 Luxemburgo",
        "coordinates": {"latitude": 49.6101, "longitude": 6.1319},
        "description": "Conta a história da cidade de Luxemburgo através de exposições interativas e artefatos históricos."
    },
    "LUX_MM": {
        "name": "Mudam - Museu de Arte Moderna",
        "city": "Luxemburgo",
        "address": "3 Park Dräi Eechelen, 1499 Luxemburgo",
        "coordinates": {"latitude": 49.6109, "longitude": 6.1339},
        "description": "Um museu de arte moderna que apresenta exposições temporárias de artistas contemporâneos."
    },
    "LUX_CB": {
        "name": "Casemates du Bock",
        "city": "Luxemburgo",
        "address": "10 Montée de Clausen, 1343 Luxemburgo",
        "coordinates": {"latitude": 49.6084, "longitude": 6.1307},
        "description": "Uma rede de túneis subterrâneos históricos que foram usados como fortificações, oferecendo uma visão única da história militar de Luxemburgo."
    },


     "ATH_AM": {
        "name": "Museu da Acrópole",
        "city": "Atenas",
        "address": "Dionysiou Areopagitou 15, 117 42 Atenas, Grécia",
        "coordinates": {"latitude": 37.9686, "longitude": 23.7263},
        "description": "Um museu moderno que abriga esculturas e artefatos da Acrópole de Atenas."
    },
    "ATH_NA": {
        "name": "Museu Nacional de Arqueologia de Atenas",
        "city": "Atenas",
        "address": "44 Patission Street, 10682 Atenas, Grécia",
        "coordinates": {"latitude": 37.9838, "longitude": 23.7275},
        "description": "Uma extensa coleção de artefatos arqueológicos gregos, desde a Pré-história até a Antiguidade Clássica."
    },
    "ATH_BM": {
        "name": "Museu Benaki",
        "city": "Atenas",
        "address": "Koumpari 1, 10674 Atenas, Grécia",
        "coordinates": {"latitude": 37.9769, "longitude": 23.7360},
        "description": "Um museu de arte grega que exibe uma ampla gama de objetos, desde arte folclórica até arte contemporânea."
    },

    "SOF_NM": {
        "name": "Museu Nacional de História Militar",
        "city": "Sofia",
        "address": "92 Cherkovna Street, 1504 Sofia, Bulgária",
        "coordinates": {"latitude": 42.6978, "longitude": 23.3174},
        "description": "Conta a história militar da Bulgária, exibindo uniformes, armas e equipamentos militares."
    },
    "SOF_NG": {
        "name": "Galeria Nacional de Arte Estrangeira",
        "city": "Sofia",
        "address": "1 St Alexander Nevsky Square, 1000 Sofia, Bulgária",
        "coordinates": {"latitude": 42.6979, "longitude": 23.3219},
        "description": "Uma galeria de arte que apresenta coleções de arte estrangeira, incluindo pinturas, esculturas e artes decorativas."
    },
    "SOF_NH": {
        "name": "Museu Nacional de História Natural",
        "city": "Sofia",
        "address": "1 Tsar Osvoboditel Blvd., 1000 Sofia, Bulgária",
        "coordinates": {"latitude": 42.6941, "longitude": 23.3323},
        "description": "Focado na história natural, com exposições que cobrem a fauna, flora e geologia da Bulgária."
    },

    "ZAG_MM": {
        "name": "Museu Mimara",
        "city": "Zagreb",
        "address": "Rooseveltov trg 5, 10000 Zagreb, Croácia",
        "coordinates": {"latitude": 45.8078, "longitude": 15.9682},
        "description": "Uma coleção eclética de arte, incluindo pinturas, esculturas, cerâmica e objetos de arte aplicada."
    },
    "ZAG_MZ": {
        "name": "Museu de Arte Contemporânea de Zagreb",
        "city": "Zagreb",
        "address": "Avenija Dubrovnik 17, 10000 Zagreb, Croácia",
        "coordinates": {"latitude": 45.7814, "longitude": 15.9742},
        "description": "Dedicado à arte contemporânea, exibindo obras de artistas croatas e internacionais."
    },
    "ZAG_AZ": {
        "name": "Museu Arqueológico de Zagreb",
        "city": "Zagreb",
        "address": "Trg Nikole Šubića Zrinskog 19, 10000 Zagreb, Croácia",
        "coordinates": {"latitude": 45.8080, "longitude": 15.9772},
        "description": "Uma rica coleção de artefatos arqueológicos que contam a história da região desde a pré-história até a Idade Média."
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
                "price": round(random.uniform(50.0, 1000.0), 2),
                "seats": random.randint(1, 300)
            }

            all_flights.append(voo_ida)
            all_flights.append(voo_volta)

    return all_flights


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
    # lat = museums[key]['latitude']
    # long = museums[key]['longitude']
    description = [key]['description']
    opening_hours = f"{random.randint(9, 14)}:00 - {random.randint(17,20)}:00"
    adult_ticket = round(random.uniform(5.0, 20.0), 2)
    child_ticket = round(random.uniform(3.0, adult_ticket-1), 2)
    adult_group_ticket = round(random.uniform(45, 60.0), 2)
    child_group_ticket = round(random.uniform(30, 40), 2)
    return {
        "museumName": name,
        "streetAddress": address,
        "museumLocation": city,
        # "latitude": lat,
        # "longitude": long,
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
    print("Sending hotel data")
    producer.produce(topic, key=str(hotel_data['hotelName']), value=json.dumps(hotel_data))
    producer.flush()
    

send_airport_data_to_kafka('airports_topic')  
send_airline_data_to_kafka('airlines_topic')
send_station_data_to_kafka('station_topic')
send_train_company_data_to_kafka('train_company_topic')  




for _ in range(15):
    flights = generate_flights()
    for flight in flights:
        send_to_kafka('flighs_data', flight)
    
    trains = generate_random_train()
    send_to_kafka_trains('train_data', trains)


    hotel_data = generate_random_hotels()

# send museums information
# for key in museums.keys():
#     museum_data = generate_random_museums(key)
#     send_museum_data_to_kafka('museums_topic', museum_data)
    send_to_kafka_hotel('hotel_data', hotel_data)
