package ua.ies.TravelingBooking.TravelingBooking.repository;

import ua.ies.TravelingBooking.TravelingBooking.entity.TicketFlight;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketFlightRepository extends JpaRepository<TicketFlight, String>{
    List<TicketFlight> findByTicketNumber(String ticketNumber);
}
