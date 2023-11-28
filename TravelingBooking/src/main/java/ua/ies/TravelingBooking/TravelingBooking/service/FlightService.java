package ua.ies.TravelingBooking.TravelingBooking.service;

import java.util.List;

import ua.ies.TravelingBooking.TravelingBooking.entity.Flight;

public interface FlightService {
    Flight createFlight(Flight flight);
    Flight getFlight(String flightNumber);
    void deleteFlight(String flightNumber);
    List<Flight> getAllFlights();
}
