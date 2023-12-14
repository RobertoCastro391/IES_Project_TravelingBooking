package ua.ies.TravelingBooking.TravelingBooking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import ua.ies.TravelingBooking.TravelingBooking.entity.HotelReservation;
import ua.ies.TravelingBooking.TravelingBooking.entity.User;

public interface HotelsReservationRepository extends JpaRepository<HotelReservation, String> {
    List<HotelReservation> findByUser(User user);
}
