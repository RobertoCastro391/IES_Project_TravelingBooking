package ua.ies.TravelingBooking.TravelingBooking.service;

import java.util.Date;
import java.util.List;

import ua.ies.TravelingBooking.TravelingBooking.dto.FlightsReservationDTO;
import ua.ies.TravelingBooking.TravelingBooking.entity.FlightsReservation;

public interface ReservationService {
    FlightsReservation createReservation(FlightsReservationDTO reservationDTO);
    FlightsReservation getReservation(String reservationId);
    void deleteReservation(String reservationId);
    List<FlightsReservation> getAllReservations();
    List<FlightsReservation> findReservationsByOutboundFlight(String flightNumber);
    List<FlightsReservation> findReservationsByInboundFlight(String flightNumber);
    List<FlightsReservation> findReservationsByDate(Date reservationDate);
    List<FlightsReservation> findReservationsBetweenDates(Date startDate, Date endDate);
    List<FlightsReservation> findReservationsByUser(Integer userId);
}