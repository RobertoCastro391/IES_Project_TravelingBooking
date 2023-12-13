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



def send_to_kafka(topic, flight_data):
    """Sends flight data to Kafka."""
    producer.produce(topic, key=str(flight_data['flightNumber']), value=json.dumps(flight_data))
    producer.flush()

send_airport_data_to_kafka('airports_topic')  
send_airline_data_to_kafka('airlines_topic')  


for _ in range(10):
    flight_data = generate_random_flight()
    send_to_kafka('flighs_data', flight_data)









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
        "coord": {"latitude": 48.8606, "longitude": 2.3376},
        "description": "Um dos maiores e mais famosos museus do mundo, localizado no centro de Paris."
    },
    "PAR_OR": {
        "name": "Museu de Orsay",
        "city": "Paris",
        "address": "1 Rue de la Légion d'Honneur, 75007 Paris, França",
        "coord": {"latitude": 48.8599, "longitude": 2.3266},
        "description": "Dedicado à arte do século XIX, situado em uma antiga estação ferroviária."
    },
    

    "MAD_PR": {
        "name": "Museu do Prado",
        "city": "Madrid",
        "address": "Calle de Ruiz de Alarcón, 23, 28014 Madrid, Espanha",
        "coord": {"latitude": 40.4139, "longitude": -3.6922},
        "description": "Um dos museus de arte mais importantes do mundo, focado em arte europeia."
    },
    "MAD_RS": {
        "name": "Museu Nacional Centro de Arte Reina Sofía",
        "city": "Madrid",
        "address": "Calle de Santa Isabel, 52, 28012 Madrid, Espanha",
        "coord": {"latitude": 40.4086, "longitude": -3.6936},
        "description": "Conhecido por abrigar a famosa obra 'Guernica' de Picasso, além de arte contemporânea."
    },
    "MAD_TH": {
        "name": "Museu Thyssen-Bornemisza",
        "city": "Madrid",
        "address": "Paseo del Prado, 8, 28014 Madrid, Espanha",
        "coord": {"latitude": 40.4169, "longitude": -3.6944},
        "description": "Uma coleção única que abrange sete séculos de arte europeia, do século XIII ao século XX."
    },
    


    "ROM_VA": {
        "name": "Museus do Vaticano",
        "city": "Roma",
        "address": "Viale Vaticano, 00165 Roma, Itália",
        "coord": {"latitude": 41.9022, "longitude": 12.4534},
        "description": "Uma das maiores coleções de arte e antiguidades do mundo, incluindo a Capela Sistina."
    },
    "ROM_BO": {
        "name": "Galeria Borghese",
        "city": "Roma",
        "address": "Viale delle Belle Arti, 5, 00197 Roma, Itália",
        "coord": {"latitude": 41.9145, "longitude": 12.4924},
        "description": "Uma magnífica galeria de arte com esculturas, pinturas e antiguidades em um ambiente barroco."
    },
    

    "LON_BR": {
        "name": "Museu Britânico",
        "city": "Londres",
        "address": "Great Russell Street, London WC1B 3DG, Reino Unido",
        "coord": {"latitude": 51.5194, "longitude": -0.1270},
        "description": "Um dos maiores e mais abrangentes museus do mundo, abrigando uma vasta coleção de artefatos globais."
    },
    "LON_NG": {
        "name": "National Gallery",
        "city": "Londres",
        "address": "Trafalgar Square, London WC2N 5DN, Reino Unido",
        "coord": {"latitude": 51.5089, "longitude": -0.1283},
        "description": "Uma das principais galerias de arte do mundo, com uma coleção impressionante de pinturas europeias."
    },
   

    "AMS_RM": {
        "name": "Rijksmuseum",
        "city": "Amsterdã",
        "address": "Museumstraat 1, 1071 XX Amsterdam, Países Baixos",
        "coord": {"latitude": 52.3600, "longitude": 4.8852},
        "description": "O museu nacional dos Países Baixos, com uma vasta coleção de arte e história."
    },
    "AMS_VG": {
        "name": "Museu Van Gogh",
        "city": "Amsterdã",
        "address": "Museumplein 6, 1071 DJ Amsterdam, Países Baixos",
        "coord": {"latitude": 52.3584, "longitude": 4.8818},
        "description": "Dedicado à vida e obra do famoso pintor Vincent van Gogh, com uma extensa coleção de suas pinturas."
    },
    "AMS_AF": {
        "name": "Casa de Anne Frank",
        "city": "Amsterdã",
        "address": "Prinsengracht 263-267, 1016 GV Amsterdam, Países Baixos",
        "coord": {"latitude": 52.3752, "longitude": 4.8837},
        "description": "A casa onde Anne Frank e sua família se esconderam durante a Segunda Guerra Mundial, agora um museu dedicado à sua memória."
    },
    

    "BER_PE": {
        "name": "Museu Pergamon",
        "city": "Berlim",
        "address": "Bodestraße 1-3, 10178 Berlin, Alemanha",
        "coord": {"latitude": 52.5212, "longitude": 13.3967},
        "description": "Famoso por suas antiguidades clássicas, incluindo o Altar de Pérgamo e a Porta do Mercado de Mileto."
    },
    "BER_NE": {
        "name": "Museu Novo (Neues Museum)",
        "city": "Berlim",
        "address": "Bodestraße 1-3, 10178 Berlin, Alemanha",
        "coord": {"latitude": 52.5206, "longitude": 13.3975},
        "description": "Aberto ao público em 2009 após uma restauração extensa, abriga a Coleção do Antigo Egito, entre outras."
    },
    "BER_AN": {
        "name": "Alte Nationalgalerie",
        "city": "Berlim",
        "address": "Bodestraße 1-3, 10178 Berlin, Alemanha",
        "coord": {"latitude": 52.5209, "longitude": 13.3981},
        "description": "Especializado em arte do século XIX, incluindo pinturas e esculturas de artistas alemães."
    },
    


    "STO_VA": {
        "name": "Vasa Museum",
        "city": "Estocolmo",
        "address": "Galarvarvsvägen 14, 115 21 Stockholm, Suécia",
        "coord": {"latitude": 59.3284, "longitude": 18.0916},
        "description": "Abriga o navio Vasa, um navio de guerra do século XVII que afundou em sua viagem inaugural."
    },
    "STO_NO": {
        "name": "Nordiska Museet",
        "city": "Estocolmo",
        "address": "Djurgårdsvägen 6-16, 115 93 Stockholm, Suécia",
        "coord": {"latitude": 59.3277, "longitude": 18.1006},
        "description": "Dedicado à cultura nórdica, exibindo trajes, móveis, e objetos do cotidiano."
    },
    "STO_SK": {
        "name": "Skansen",
        "city": "Estocolmo",
        "address": "Djurgårdsslätten 49-51, 115 21 Stockholm, Suécia",
        "coord": {"latitude": 59.3257, "longitude": 18.0990},
        "description": "Um museu ao ar livre e zoológico, apresentando a vida rural sueca e animais escandinavos."
    },
    


    "HEL_NM": {
        "name": "Museu Nacional da Finlândia",
        "city": "Helsinque",
        "address": "Mannerheimintie 34, 00100 Helsinki, Finlândia",
        "coord": {"latitude": 60.1756, "longitude": 24.9316},
        "description": "Dedicado à história finlandesa, com exposições que abrangem desde a pré-história até os tempos modernos."
    },
    "HEL_AM": {
        "name": "Museu de Arte Ateneum",
        "city": "Helsinque",
        "address": "Kaivokatu 2, 00100 Helsinki, Finlândia",
        "coord": {"latitude": 60.1698, "longitude": 24.9449},
        "description": "Um dos principais museus de arte da Finlândia, exibindo uma extensa coleção de arte finlandesa."
    },
   

    "CPH_NM": {
        "name": "Museu Nacional da Dinamarca",
        "city": "Copenhague",
        "address": "Ny Vestergade 10, 1471 København, Dinamarca",
        "coord": {"latitude": 55.6761, "longitude": 12.5762},
        "description": "Dedicado à história dinamarquesa, abrange desde a Idade da Pedra até os dias atuais."
    },
    "CPH_DS": {
        "name": "A Biblioteca Real Dinamarquesa - A Diamante Negra",
        "city": "Copenhague",
        "address": "Søren Kierkegaards Plads 1, 1221 København, Dinamarca",
        "coord": {"latitude": 55.6786, "longitude": 12.5849},
        "description": "Uma biblioteca e centro cultural moderno, conhecido por sua arquitetura única."
    },
    "CPH_NG": {
        "name": "Ny Carlsberg Glyptotek",
        "city": "Copenhague",
        "address": "Dantes Plads 7, 1556 København, Dinamarca",
        "coord": {"latitude": 55.6726, "longitude": 12.5654},
        "description": "Um museu de arte com uma coleção diversificada, incluindo esculturas antigas, arte clássica e impressionista."
    },
    


    "WAW_PN": {
        "name": "Museu Nacional da Polônia",
        "city": "Varsóvia",
        "address": "Al. Jerozolimskie 3, 00-495 Warszawa, Polônia",
        "coord": {"latitude": 52.2318, "longitude": 21.0053},
        "description": "O maior museu de arte na Polônia, com coleções abrangendo pinturas, esculturas e artes decorativas."
    },
    "WAW_WU": {
        "name": "Museu do Levante de Varsóvia",
        "city": "Varsóvia",
        "address": "Grzybowska 79, 00-844 Warszawa, Polônia",
        "coord": {"latitude": 52.2323, "longitude": 20.9787},
        "description": "Dedicado à Revolta de Varsóvia de 1944 durante a Segunda Guerra Mundial, com exposições interativas."
    },
    "WAW_CS": {
        "name": "Centro de Ciência Copérnico",
        "city": "Varsóvia",
        "address": "Wybrzeże Kościuszkowskie 20, 00-390 Warszawa, Polônia",
        "coord": {"latitude": 52.2392, "longitude": 21.0285},
        "description": "Um museu de ciências interativo, oferecendo experiências educativas e exposições sobre ciência e tecnologia."
    },
   
    "LIS_NT": {
        "name": "Museu Nacional do Azulejo",
        "city": "Lisboa",
        "address": "R. da Madre de Deus 4, 1900-312 Lisboa, Portugal",
        "coord": {"latitude": 38.7247, "longitude": -9.1156},
        "description": "Dedicado à história e arte dos azulejos em Portugal, exibindo uma coleção impressionante."
    },
    "LIS_NA": {
        "name": "Museu Nacional de Arte Antiga",
        "city": "Lisboa",
        "address": "R. das Janelas Verdes, 1249-017 Lisboa, Portugal",
        "coord": {"latitude": 38.7049, "longitude": -9.1596},
        "description": "Apresenta uma vasta coleção de pinturas, esculturas, e artes decorativas de várias épocas."
    },
    "LIS_BT": {
        "name": "Torre de Belém",
        "city": "Lisboa",
        "address": "Av. Brasília, 1400-038 Lisboa, Portugal",
        "coord": {"latitude": 38.6916, "longitude": -9.2160},
        "description": "Uma torre defensiva histórica que agora funciona como museu, oferecendo vistas panorâmicas do rio Tejo."
    },
    


    "PRG_NM": {
        "name": "Museu Nacional de Praga",
        "city": "Praga",
        "address": "Wenceslas Square 68, 115 79 Praha, República Tcheca",
        "coord": {"latitude": 50.0803, "longitude": 14.4244},
        "description": "O maior museu em Praga, abriga coleções de história natural, ciência e cultura checa."
    },
    "PRG_PC": {
        "name": "Castelo de Praga",
        "city": "Praga",
        "address": "119 08 Praha 1, República Tcheca",
        "coord": {"latitude": 50.0919, "longitude": 14.3995},
        "description": "Um complexo histórico que inclui o Palácio Real, a Catedral de São Vito e outros edifícios notáveis."
    },
    "PRG_NG": {
        "name": "Galeria Nacional em Praga",
        "city": "Praga",
        "address": "Staroměstské náměstí 12, 110 15 Praha, República Tcheca",
        "coord": {"latitude": 50.0878, "longitude": 14.4193},
        "description": "Com várias filiais, exibe uma rica coleção de arte checa e internacional, incluindo pinturas e esculturas."
    },
    "PRG_MD": {
        "name": "Museu de Artes Decorativas em Praga",
        "city": "Praga",
        "address": "17. listopadu 2, 110 00 Praha, República Tcheca",
        "coord": {"latitude": 50.0911, "longitude": 14.4035},
        "description": "Focado em artes decorativas, incluindo móveis, cerâmica, vidro e têxteis."
    },
    "PRG_LP": {
        "name": "Museu do Palácio Lobkowicz",
        "city": "Praga",
        "address": "Jiřská 3, 119 00 Praha, República Tcheca",
        "coord": {"latitude": 50.0913, "longitude": 14.4041},
        "description": "Localizado no Castelo de Praga, exibe a coleção privada da família Lobkowicz, incluindo arte, música e história."
    },
    "PRG_JM": {
        "name": "Museu Judeu em Praga",
        "city": "Praga",
        "address": "U Staré školy 141/1, 110 00 Praha, República Tcheca",
        "coord": {"latitude": 50.0903, "longitude": 14.4171},
        "description": "Com várias sinagogas e o Cemitério Judeu, documenta a história da comunidade judaica em Praga."
    },
    "PRG_KM": {
        "name": "Museu Kampa",
        "city": "Praga",
        "address": "U Sovových mlýnů 2, 118 00 Praha, República Tcheca",
        "coord": {"latitude": 50.0868, "longitude": 14.4085},
        "description": "Dedicado à arte moderna da Europa Central, com uma coleção de pinturas, esculturas e instalações."
    },
    "PRG_NT": {
        "name": "Museu Técnico Nacional de Praga",
        "city": "Praga",
        "address": "Kostelní 42, 170 78 Praha, República Tcheca",
        "coord": {"latitude": 50.0995, "longitude": 14.4229},
        "description": "Aborda a história da ciência e da tecnologia, com exposições interativas e uma coleção variada."
    },
    "PRG_MA": {
        "name": "Museu dos Alquimistas e Magos",
        "city": "Praga",
        "address": "Jánský vršek 8, 118 00 Praha, República Tcheca",
        "coord": {"latitude": 50.0877, "longitude": 14.4079},
        "description": "Um museu temático que explora o mundo da alquimia e magia, com instrumentos e exposições relacionadas."
    },
    "PRG_DO": {
        "name": "DOX - Centro de Arte Contemporânea",
        "city": "Praga",
        "address": "Poupětova 595/1, 170 00 Praha, República Tcheca",
        "coord": {"latitude": 50.1097, "longitude": 14.4443},
        "description": "Um espaço dedicado à arte contemporânea, com exposições, eventos e instalações inovadoras."
    },

    "DUB_NM": {
        "name": "Museu Nacional da Irlanda - Arqueologia",
        "city": "Dublin",
        "address": "Kildare St, Dublin 2, Irlanda",
        "coord": {"latitude": 53.3403, "longitude": -6.2552},
        "description": "Exibe artefatos arqueológicos que contam a história da Irlanda desde a pré-história até a Idade Média."
    },
    "DUB_NG": {
        "name": "Galeria Nacional da Irlanda",
        "city": "Dublin",
        "address": "Merrion Square West, Dublin, D02 K303, Irlanda",
        "coord": {"latitude": 53.3409, "longitude": -6.2523},
        "description": "Apresenta uma vasta coleção de arte irlandesa e europeia, incluindo pinturas, esculturas e artes decorativas."
    },
   


    "OSL_MM": {
        "name": "Museu Munch",
        "city": "Oslo",
        "address": "Tøyengata 53, 0578 Oslo, Noruega",
        "coord": {"latitude": 59.9133, "longitude": 10.7775},
        "description": "Dedicado ao famoso pintor Edvard Munch, exibindo muitas de suas obras icônicas."
    },
    "OSL_VS": {
        "name": "Museu dos Barcos Vikings",
        "city": "Oslo",
        "address": "Huk Aveny 35, 0287 Oslo, Noruega",
        "coord": {"latitude": 59.9078, "longitude": 10.6866},
        "description": "Abrigando barcos vikings incrivelmente preservados e artefatos relacionados à cultura nórdica."
    },
   

    "BUD_MF": {
        "name": "Museu de Belas Artes",
        "city": "Budapeste",
        "address": "Dózsa György út 41, 1146 Budapeste, Hungria",
        "coord": {"latitude": 47.5259, "longitude": 19.0810},
        "description": "Uma coleção abrangente de arte europeia, com ênfase em pinturas e esculturas."
    },
    "BUD_HN": {
        "name": "Museu Nacional Húngaro",
        "city": "Budapeste",
        "address": "Múzeum krt. 14-16, 1088 Budapeste, Hungria",
        "coord": {"latitude": 47.4871, "longitude": 19.0658},
        "description": "Conta a história da Hungria desde os tempos antigos até os dias atuais, exibindo artefatos históricos."
    },
    "BUD_HR": {
        "name": "Museu Hospital in the Rock Nuclear Bunker",
        "city": "Budapeste",
        "address": "Lovas út 4/c, 1012 Budapeste, Hungria",
        "coord": {"latitude": 47.5022, "longitude": 19.0354},
        "description": "Um museu localizado em um abrigo nuclear da Segunda Guerra Mundial, mostrando a história médica e militar."
    },


     "VIE_AH": {
        "name": "Museu de História da Arte",
        "city": "Viena",
        "address": "Maria-Theresien-Platz, 1010 Viena, Áustria",
        "coord": {"latitude": 48.2035, "longitude": 16.3615},
        "description": "Casa uma vasta coleção de arte, incluindo obras de mestres como Rembrandt e Vermeer."
    },
    "VIE_BP": {
        "name": "Palácio Belvedere e Museu",
        "city": "Viena",
        "address": "Prinz Eugen-Straße 27, 1030 Viena, Áustria",
        "coord": {"latitude": 48.1911, "longitude": 16.3806},
        "description": "Um palácio barroco com uma coleção de arte impressionante, incluindo obras de Gustav Klimt."
    },
    "VIE_AL": {
        "name": "Albertina",
        "city": "Viena",
        "address": "Albertinaplatz 1, 1010 Viena, Áustria",
        "coord": {"latitude": 48.2044, "longitude": 16.3688},
        "description": "Uma galeria de arte e museu que exibe uma vasta coleção de desenhos, gravuras e fotografias."
    },


    "BRU_RM": {
        "name": "Museu Real de Belas Artes da Bélgica",
        "city": "Bruxelas",
        "address": "Rue de la Régence 3, 1000 Bruxelas, Bélgica",
        "coord": {"latitude": 50.8433, "longitude": 4.3595},
        "description": "Uma extensa coleção de arte belga, incluindo pinturas, esculturas e artes decorativas."
    },
    "BRU_MM": {
        "name": "Museu Magritte",
        "city": "Bruxelas",
        "address": "Koningsplein 1, 1000 Bruxelas, Bélgica",
        "coord": {"latitude": 50.8444, "longitude": 4.3565},
        "description": "Dedicado ao famoso artista surrealista René Magritte, exibindo suas obras mais icônicas."
    },
    "BRU_HM": {
        "name": "Museu Horta",
        "city": "Bruxelas",
        "address": "Rue Américaine 25, 1060 Bruxelas, Bélgica",
        "coord": {"latitude": 50.8229, "longitude": 4.3454},
        "description": "Uma casa-museu dedicada ao arquiteto Art Nouveau Victor Horta, exibindo suas criações inovadoras."
    },


    "LUX_CM": {
        "name": "Museu de História da Cidade de Luxemburgo",
        "city": "Luxemburgo",
        "address": "14 Rue du St Esprit, 1475 Luxemburgo",
        "coord": {"latitude": 49.6101, "longitude": 6.1319},
        "description": "Conta a história da cidade de Luxemburgo através de exposições interativas e artefatos históricos."
    },
    "LUX_MM": {
        "name": "Mudam - Museu de Arte Moderna",
        "city": "Luxemburgo",
        "address": "3 Park Dräi Eechelen, 1499 Luxemburgo",
        "coord": {"latitude": 49.6109, "longitude": 6.1339},
        "description": "Um museu de arte moderna que apresenta exposições temporárias de artistas contemporâneos."
    },
    "LUX_CB": {
        "name": "Casemates du Bock",
        "city": "Luxemburgo",
        "address": "10 Montée de Clausen, 1343 Luxemburgo",
        "coord": {"latitude": 49.6084, "longitude": 6.1307},
        "description": "Uma rede de túneis subterrâneos históricos que foram usados como fortificações, oferecendo uma visão única da história militar de Luxemburgo."
    },


     "ATH_AM": {
        "name": "Museu da Acrópole",
        "city": "Atenas",
        "address": "Dionysiou Areopagitou 15, 117 42 Atenas, Grécia",
        "coord": {"latitude": 37.9686, "longitude": 23.7263},
        "description": "Um museu moderno que abriga esculturas e artefatos da Acrópole de Atenas."
    },
    "ATH_NA": {
        "name": "Museu Nacional de Arqueologia de Atenas",
        "city": "Atenas",
        "address": "44 Patission Street, 10682 Atenas, Grécia",
        "coord": {"latitude": 37.9838, "longitude": 23.7275},
        "description": "Uma extensa coleção de artefatos arqueológicos gregos, desde a Pré-história até a Antiguidade Clássica."
    },
    "ATH_BM": {
        "name": "Museu Benaki",
        "city": "Atenas",
        "address": "Koumpari 1, 10674 Atenas, Grécia",
        "coord": {"latitude": 37.9769, "longitude": 23.7360},
        "description": "Um museu de arte grega que exibe uma ampla gama de objetos, desde arte folclórica até arte contemporânea."
    },

    "SOF_NM": {
        "name": "Museu Nacional de História Militar",
        "city": "Sofia",
        "address": "92 Cherkovna Street, 1504 Sofia, Bulgária",
        "coord": {"latitude": 42.6978, "longitude": 23.3174},
        "description": "Conta a história militar da Bulgária, exibindo uniformes, armas e equipamentos militares."
    },
    "SOF_NG": {
        "name": "Galeria Nacional de Arte Estrangeira",
        "city": "Sofia",
        "address": "1 St Alexander Nevsky Square, 1000 Sofia, Bulgária",
        "coord": {"latitude": 42.6979, "longitude": 23.3219},
        "description": "Uma galeria de arte que apresenta coleções de arte estrangeira, incluindo pinturas, esculturas e artes decorativas."
    },
    "SOF_NH": {
        "name": "Museu Nacional de História Natural",
        "city": "Sofia",
        "address": "1 Tsar Osvoboditel Blvd., 1000 Sofia, Bulgária",
        "coord": {"latitude": 42.6941, "longitude": 23.3323},
        "description": "Focado na história natural, com exposições que cobrem a fauna, flora e geologia da Bulgária."
    },

    "ZAG_MM": {
        "name": "Museu Mimara",
        "city": "Zagreb",
        "address": "Rooseveltov trg 5, 10000 Zagreb, Croácia",
        "coord": {"latitude": 45.8078, "longitude": 15.9682},
        "description": "Uma coleção eclética de arte, incluindo pinturas, esculturas, cerâmica e objetos de arte aplicada."
    },
    "ZAG_MZ": {
        "name": "Museu de Arte Contemporânea de Zagreb",
        "city": "Zagreb",
        "address": "Avenija Dubrovnik 17, 10000 Zagreb, Croácia",
        "coord": {"latitude": 45.7814, "longitude": 15.9742},
        "description": "Dedicado à arte contemporânea, exibindo obras de artistas croatas e internacionais."
    },
    "ZAG_AZ": {
        "name": "Museu Arqueológico de Zagreb",
        "city": "Zagreb",
        "address": "Trg Nikole Šubića Zrinskog 19, 10000 Zagreb, Croácia",
        "coord": {"latitude": 45.8080, "longitude": 15.9772},
        "description": "Uma rica coleção de artefatos arqueológicos que contam a história da região desde a pré-história até a Idade Média."
    }

}


# colocar coordenadas num tuplo

for museum, details in museums.items():

    lat = details["coord"]["latitude"]

    lon = details["coord"]["longitude"]

    details["coord"] = (lat, lon)


## random data for museums

def generate_random_flight():
    """Generates random museum prices and opening hours."""
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



def send_to_kafka(topic, flight_data):
    """Sends flight data to Kafka."""
    producer.produce(topic, key=str(flight_data['flightNumber']), value=json.dumps(flight_data))
    producer.flush()

send_airport_data_to_kafka('airports_topic')  
send_airline_data_to_kafka('airlines_topic')  


for _ in range(10):
    flight_data = generate_random_flight()
    send_to_kafka('flighs_data', flight_data)


