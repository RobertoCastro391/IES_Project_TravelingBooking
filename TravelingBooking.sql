CREATE DATABASE IF NOT EXISTS TravelingBookingIES;
USE TravelingBookingIES;

DROP TABLE IF EXISTS AeroCompany;
CREATE TABLE AeroCompany(
    CompanyCode varchar(16) not null primary key,
    CompanyName varchar(64) not null
);

DROP TABLE IF EXISTS Aeroportos;
CREATE TABLE Aeroportos(
    Code varchar(16) not null primary key,
    AeroportoName varchar(64) not null,
    City varchar(64) not null
);

DROP TABLE IF EXISTS Flights;
CREATE TABLE Flights(
    FlightNumber varchar(16) primary key,
    FlightDate DATE not null,
    FlightCompany varchar(64) not null,
    Aeroporto varchar(64) not null,
    AeroportoCode varchar(16) not null,
    AeroCode_partida varchar(16) not null,
    AeroCode_chegada varchar(16) not null,
    Departure_hour varchar(16) not null,
    Arrival_hour varchar(16) not null,
    foreign key (FlightCompany) references AeroCompany(CompanyName),
    foreign key (Aeroporto) references AeroCompany(AeroportoName),
    foreign key (AeroportoCode) references AeroCompany(Code)
);

DROP TABLE IF EXISTS Users;
CREATE TABLE Users(
    UserID int auto_increment primary key,
    FirstName varchar(50) not null,
    LastName varchar(50) not null,
    Sex varchar(16),
    BirthDate DATE,
    PassportNumber varchar(50),
    Nacionality varchar(50),
    Email varchar(100) not null,
    UserPassword varchar(100) not null,
    Locality varchar(50) not null,
    StreetAddress varchar(100) not null,
    PostalCode varchar(50) not null,
    City varchar(50) not null,
    Country varchar(50) not null
    CardNumber varchar(50),
    CardPIN varchar (16)
);

DROP TABLE IF EXISTS Trains;
CREATE TABLE Trains(
    TrainNumber varchar(16) primary key,
    TravelDate DATE not null,
    AeroCode_partida varchar(16) not null,
    AeroCode_chegada varchar(16) not null,
    Departure_hour varchar(16) not null,
    Arrival_hour varchar(16) not null
);

DROP TABLE IF EXISTS Museums;
CREATE TABLE Museums(
    MuseumID int auto_increment primary key,
    MuseumName varchar(100) not null,
    MuseumDescription varchar(512) not null,
    MuseumLocation varchar(16) not null,
    MuseumImage varchar(255), -- armazena o caminho da imagem
    StreetAddress varchar(100),
    PhoneNumber varchar(16),
    Email varchar(100) not null,
    Ticketprice_adult varchar(16) not null,
    Ticketprice_child varchar(16),
    Ticketprice_group varchar(16),
    Ticketprice_groupchild varchar(16)
);

DROP TABLE IF EXISTS Hotels;
CREATE TABLE Hotels(
    HotelID int auto_increment primary key,
    HotelName varchar(100) not null,
    HotelDescription varchar(512) not null,
    HotelLocation varchar(16) not null,
    HotelImage varchar(255), -- armazena o caminho da imagem
    HotelImage2 varchar(255), -- armazena o caminho da imagem
    HotelImage3 varchar(255), -- armazena o caminho da imagem
    HotelImage4 varchar(255), -- armazena o caminho da imagem
    StreetAddress varchar(100),
    PhoneNumber varchar(16),
    Email varchar(100) not null,
    Inicial_price varchar(16) not null,
    Person_number int,
    Baggages int,
    Food_included varchar(64) not null,
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
    ReservationID int auto_increment primary key,
    HotelID int not null,
    UserID int not null,
    FirstName varchar(50) not null,
    LastName varchar(50)
    CheckinDate DATE not null,
    CheckoutDate DATE not null,
    NumberOfAdults int not null,
    NumberOfChilds int,
    Animals boolean,
    TotalPrice int not null,
    foreign key (HotelID) references Hotels(HotelID),
    foreign key (UserID) references Users(UserID),
    foreign key (FirstName) references Users(FirstName),
    foreign key (LastName) references Users(LastName)
);


DROP TABLE IF EXISTS Rooms;
CREATE TABLE Rooms(
    RoomID int auto_increment primary key,
    HotelID int,
    RoomPort int,
    NumberOfKeys int,
    NumberOfPersons int not null,
    AvaliabilityNights int,
    RoomMeters int,
    NumberOfDoubleBed int not null,
    NumberOfSingleBed int,
    Smoking boolen,
    Meals_included int not null
    foreign key HotelID references Hotles(HotelID)
);