package ua.ies.TravelingBooking.TravelingBooking.repository;

import ua.ies.TravelingBooking.TravelingBooking.entity.Reservation;
import ua.ies.TravelingBooking.TravelingBooking.entity.Ticket_flight;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public class ReservationRepository extends JpaRepository<Reservation, String>{
    List<Reservation> findByReservationNumber(String reservationNumber);
}
