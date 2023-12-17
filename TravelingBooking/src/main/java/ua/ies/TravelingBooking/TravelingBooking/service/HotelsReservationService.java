package ua.ies.TravelingBooking.TravelingBooking.service;

import java.util.List;

import ua.ies.TravelingBooking.TravelingBooking.dto.HotelReservationDTO;
import ua.ies.TravelingBooking.TravelingBooking.entity.HotelReservation;
import ua.ies.TravelingBooking.TravelingBooking.entity.User;
public interface HotelsReservationService {
    HotelReservation createReservation(HotelReservationDTO reservationDTO, User user);
    List<HotelReservation> findReservationsByUser(User user);
}