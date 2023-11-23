CREATE DATABASE IF NOT EXISTS TravelingBookingIES;
USE TravelingBookingIES;

DROP TABLE IF EXISTS Flights;
CREATE TABLE Flights(
    FlightNumber varchar(16) primary key,
    FlightDate DATE not null,
    AeroCode_partida varchar(16) not null,
    AeroCode_chegada varchar(16) not null,
    Departure_hour varchar(16) not null,
    Arrival_hour varchar(16) not null
);

DROP TABLE IF EXISTS Users;
CREATE TABLE Users(
    UserID int auto_increment primary key,
    FirstName varchar(50) not null,
    LastName varchar(50) not null,
    Email varchar(100) not null,
    UserPassword varchar(100) not null,
    Locality varchar(50) not null,
    StreetAddress varchar(100) not null,
    PostalCode varchar(50) not null,
    City varchar(50) not null,
    Country varchar(50) not null
);

DROP TABLE IF EXISTS Trains;
CREATE TABLE Trains();

DROP TABLE IF EXISTS Museums;
CREATE TABLE Museums(
    MuseumID int auto_increment primary key,
    MuseumName varchar(100) not null,
    MuseumDescription varchar(512) not null,
    PhoneNumber varchar(16),
    Email varchar(100) not null,
);