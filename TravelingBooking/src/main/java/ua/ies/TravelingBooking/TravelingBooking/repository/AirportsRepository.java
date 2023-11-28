package ua.ies.TravelingBooking.TravelingBooking.repository;

import ua.ies.TravelingBooking.TravelingBooking.entity.Airport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AirportsRepository extends JpaRepository<Airport, String> {
    Airport findByAirportCode(String airportCode);
} 