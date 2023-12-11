package ua.ies.TravelingBooking.TravelingBooking.repository;

import java.util.List;
import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.ies.TravelingBooking.TravelingBooking.entity.FlightsReservation;
import ua.ies.TravelingBooking.TravelingBooking.entity.User;

public interface FlightsReservationRepository extends JpaRepository<FlightsReservation, String> {
    List<FlightsReservation> findByFlightNumberOutbound(String flightNumberOutbound);
    List<FlightsReservation> findByFlightNumberInbound(String flightNumberInbound);
    List<FlightsReservation> findByUser(User user);
    List<FlightsReservation> findByReservationDate(Date reservationDate);
    List<FlightsReservation> findByReservationDateBetween(Date startDate, Date endDate);
}
