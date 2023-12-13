package ua.ies.TravelingBooking.TravelingBooking.service;

import java.util.Date;
import java.util.List;

import ua.ies.TravelingBooking.TravelingBooking.dto.TrainsReservationDTO;
import ua.ies.TravelingBooking.TravelingBooking.entity.TrainsReservation;

public interface TrainsReservationService {
    TrainsReservation createReservation(TrainsReservationDTO reservationDTO);
    TrainsReservation getReservation(String reservationId);
    void deleteReservation(String reservationId);
    List<TrainsReservation> getAllReservations();
    List<TrainsReservation> findReservationsByOutboundTrain(String trainNumber);
    List<TrainsReservation> findReservationsByInboundTrain(String trainNumber);
    List<TrainsReservation> findReservationsByDate(Date reservationDate);
    List<TrainsReservation> findReservationsBetweenDates(Date startDate, Date endDate);
    List<TrainsReservation> findReservationsByUser(Integer userId);
}