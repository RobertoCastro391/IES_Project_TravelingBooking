package ua.ies.TravelingBooking.TravelingBooking.repository;

import java.util.List;
import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.ies.TravelingBooking.TravelingBooking.entity.TrainsReservation;
import ua.ies.TravelingBooking.TravelingBooking.entity.User;

public interface TrainsReservationRepository extends JpaRepository<TrainsReservation, String> {
    List<TrainsReservation> findByTrainNumberOutbound(String trainNumberOutbound);
    List<TrainsReservation> findByTrainNumberInbound(String trainNumberInbound);
    List<TrainsReservation> findByUser(User user);
    List<TrainsReservation> findByReservationDate(Date reservationDate);
    List<TrainsReservation> findByReservationDateBetween(Date startDate, Date endDate);
}
