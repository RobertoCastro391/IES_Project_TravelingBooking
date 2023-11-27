CREATE DATABASE IF NOT EXISTS TravelingBookingIES;
USE TravelingBookingIES;

DROP TABLE IF EXISTS AeroCompany;

CREATE TABLE AeroCompany(
    CompanyCode varchar(16) NOT NULL PRIMARY KEY,
    CompanyName varchar(64) NOT NULL
);

DROP TABLE IF EXISTS Aeroportos;
CREATE TABLE Aeroportos(
    AeroCode varchar(16) NOT NULL PRIMARY KEY,
    AeroportoName varchar(64) NOT NULL,
    City varchar(64) NOT NULL
);

DROP TABLE IF EXISTS Flights;
CREATE TABLE Flights(
    FlightNumber varchar(16) PRIMARY KEY,
    FlightDate DATE NOT NULL,
    CompanyCode varchar(64) NOT NULL,
    AeroCode_partida varchar(16) NOT NULL,
    AeroCode_chegada varchar(16) NOT NULL,
    Departure_hour varchar(16) NOT NULL,
    Arrival_hour varchar(16) NOT NULL,
    Duration int NOT NULL,
    Fare Decimal(10,2) NOT NULL,
    Places int NOT NULL,
    FOREIGN KEY (CompanyCode) REFERENCES AeroCompany(CompanyCode),
    FOREIGN KEY (AeroCode_partida) REFERENCES Aeroportos(AeroCode),
    FOREIGN KEY (AeroCode_chegada) REFERENCES Aeroportos(AeroCode)
);

DROP TABLE IF EXISTS Users;
CREATE TABLE Users(
    UserID int auto_increment PRIMARY KEY,
    FirstName varchar(50) NOT NULL,
    LastName varchar(50) NOT NULL,
    Sex varchar(16),
    BirthDate DATE,
    PassportNumber varchar(50),
    Nacionality varchar(50),
    Email varchar(100) NOT NULL,
    UserPassword varchar(100) NOT NULL,
    Locality varchar(50) NOT NULL,
    StreetAddress varchar(100) NOT NULL,
    PostalCode varchar(50) NOT NULL,
    City varchar(50) NOT NULL,
    Country varchar(50) NOT NULL,
    CardNumber varchar(50),
    CardPIN varchar(16)
);

DROP TABLE IF EXISTS Trains;
CREATE TABLE Trains(
    TrainNumber varchar(16) PRIMARY KEY,
    TravelDate DATE NOT NULL,
    StationCode_partida varchar(16) NOT NULL,
    StaionCode_chegada varchar(16) NOT NULL,
    Departure_hour varchar(16) NOT NULL,
    Arrival_hour varchar(16) NOT NULL
);

DROP TABLE IF EXISTS Museums;
CREATE TABLE Museums(
    MuseumID int auto_increment PRIMARY KEY,
    MuseumName varchar(100) NOT NULL,
    MuseumDescription varchar(512) NOT NULL,
    MuseumLocation varchar(16) NOT NULL,
    MuseumImage varchar(255),
    StreetAddress varchar(100),
    PhoneNumber varchar(16),
    Email varchar(100) NOT NULL,
    Ticketprice_adult varchar(16) NOT NULL,
    Ticketprice_child varchar(16),
    Ticketprice_group varchar(16),
    Ticketprice_groupchild varchar(16)
);

DROP TABLE IF EXISTS Hotels;
CREATE TABLE Hotels(
    HotelID int auto_increment PRIMARY KEY,
    HotelName varchar(100) NOT NULL,
    HotelDescription varchar(512) NOT NULL,
    HotelLocation varchar(16) NOT NULL,
    HotelImage varchar(255), -- armazena o caminho da imagem
    HotelImage2 varchar(255), -- armazena o caminho da imagem
    HotelImage3 varchar(255), -- armazena o caminho da imagem
    HotelImage4 varchar(255), -- armazena o caminho da imagem
    StreetAddress varchar(100),
    PhoneNumber varchar(16),
    Email varchar(100) NOT NULL,
    Inicial_price varchar(16) NOT NULL,
    Person_number int,
    Baggages int,
    Food_included varchar(64) NOT NULL,
    AC boolean,
    Wifi boolean,
    NumberOfReviews int,
    CleanlinessReview varchar(16),
    ServiceReview varchar(16),
    ValueReview varchar(16),
    LocationReview varchar(16),
    RoomsReview varchar(16),
    SleepQualityReview varchar(16)
);

DROP TABLE IF EXISTS HotelReservation;
CREATE TABLE HotelReservation(
    ReservationID int auto_increment PRIMARY KEY,
    HotelID int NOT NULL,
    UserID int NOT NULL,
    FirstName varchar(50) NOT NULL,
    LastName varchar(50),
    CheckinDate DATE NOT NULL,
    CheckoutDate DATE NOT NULL,
    NumberOfAdults int NOT NULL,
    NumberOfChilds int,
    Animals boolean,
    TotalPrice int NOT NULL,
    FOREIGN KEY (HotelID) REFERENCES Hotels(HotelID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);


DROP TABLE IF EXISTS Rooms;
CREATE TABLE Rooms (
    RoomID int auto_increment NOT NULL,
    HotelID int NOT NULL,
    RoomPort int,
    NumberOfKeys int,
    NumberOfPersons int NOT NULL,
    AvaliabilityNights int,
    RoomMeters int,
    NumberOfDoubleBed int NOT NULL,
    NumberOfSingleBed int,
    Smoking boolean,
    Meals_included int NOT NULL,
    FOREIGN KEY (HotelID) REFERENCES Hotels(HotelID),
    PRIMARY KEY (RoomID, HotelID)
<<<<<<< HEAD
);
=======
);
>>>>>>> 4c5949d7bc0ac575a79afe78d62f06b5166aaf60
