package ua.ies.TravelingBooking.TravelingBooking.service;

import java.util.List;

import ua.ies.TravelingBooking.TravelingBooking.entity.Reservation;

public interface ReservationService {
    Reservation createReservation(Reservation reservationNumber);
    Reservation getReservation(String reservationNumber);
    void deleteReservation(String reservationNumber);
}
