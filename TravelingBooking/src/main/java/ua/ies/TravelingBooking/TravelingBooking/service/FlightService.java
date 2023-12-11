package ua.ies.TravelingBooking.TravelingBooking.service;


import java.util.Date;
import java.util.List;

import ua.ies.TravelingBooking.TravelingBooking.entity.Flight;

public interface FlightService {
    Flight createFlight(Flight flight);
    Flight getFlight(String flightNumber);
    void deleteFlight(String flightNumber);
    List<Flight> getAllFlights();
    List<Flight> searchFlights(String airportCodeOrigin, String airportCodeDestination, Date date);
}

