package ua.ies.TravelingBooking.TravelingBooking.service.impl;

import lombok.AllArgsConstructor;
import ua.ies.TravelingBooking.TravelingBooking.entity.Reservation;
import ua.ies.TravelingBooking.TravelingBooking.repository.ReservationRepository;
import ua.ies.TravelingBooking.TravelingBooking.service.ReservationService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor
public class ReservationServiceImpl implements ReservationService {
    private ReservationRepository reservationRepository;

    @Override
    public Reservation createReservation(Reservation reservationNumber) {
        return reservationRepository.save(reservationNumber);
    }

    @Override
    public Reservation getReservation(String reservationNumber) {
        Optional<Reservation> reservation = reservationRepository.findById(reservationNumber);
        return reservation.get();
    }

    @Override
    public void deleteReservation(String reservationNumber) {
        reservationRepository.deleteById(reservationNumber);
    }  
}
