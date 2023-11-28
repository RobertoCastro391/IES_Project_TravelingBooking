package ua.ies.TravelingBooking.TravelingBooking.service;

import java.util.List;

import ua.ies.TravelingBooking.TravelingBooking.entity.Airline;

public interface AirlineService {
    Airline createAirline(Airline airline);
    Airline getAirlineByAirlineCode(String airlineCode);
    List<Airline> getAllAirlines();
}