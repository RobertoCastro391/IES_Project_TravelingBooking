package ua.ies.TravelingBooking.TravelingBooking.service;

import java.util.List;

import ua.ies.TravelingBooking.TravelingBooking.dto.HotelReservationDTO;
import ua.ies.TravelingBooking.TravelingBooking.entity.HotelReservation;
public interface HotelsReservationService {
    HotelReservation createReservation(HotelReservationDTO reservationDTO);
    List<HotelReservation> findReservationsByUser(Integer userId);
}