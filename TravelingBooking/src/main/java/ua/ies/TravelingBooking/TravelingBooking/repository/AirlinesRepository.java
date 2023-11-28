package ua.ies.TravelingBooking.TravelingBooking.repository;

import ua.ies.TravelingBooking.TravelingBooking.entity.Airline;
import org.springframework.data.jpa.repository.JpaRepository;


public interface AirlinesRepository extends JpaRepository<Airline, String> {
    Airline findByAirlineCode(String airlineCode);
} 