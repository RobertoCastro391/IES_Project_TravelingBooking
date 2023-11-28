package ua.ies.TravelingBooking.TravelingBooking.service;

import java.util.List;

import ua.ies.TravelingBooking.TravelingBooking.entity.Airport;

public interface AirportService {
    Airport createAirport(Airport airport);
    Airport getAirportByAirportCode(String airportCode);
    List<Airport> getAllAirports();
}