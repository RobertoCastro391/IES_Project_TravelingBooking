package ua.ies.TravelingBooking.TravelingBooking.repository;

import ua.ies.TravelingBooking.TravelingBooking.entity.Ticket_flight;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public class Ticket_flightRepository extends JpaRepository<Ticket_flight, String>{
    List<Ticket_flight> findByTicketNumber(String ticketNumber);
}
