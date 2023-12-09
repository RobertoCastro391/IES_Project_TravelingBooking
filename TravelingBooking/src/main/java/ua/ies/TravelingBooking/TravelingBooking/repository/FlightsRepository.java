package ua.ies.TravelingBooking.TravelingBooking.repository;

import ua.ies.TravelingBooking.TravelingBooking.entity.Flight;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface FlightsRepository extends JpaRepository<Flight, String> {
    List<Flight> findByFlightNumber(String flightNumber);
    List<Flight> findByAirportCodeOriginAndAirportCodeDestinationAndFlightDate(String airportCodeOrigin, String airportCodeDestination, Date flightDate);
} 