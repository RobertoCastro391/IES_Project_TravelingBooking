package ua.ies.TravelingBooking.TravelingBooking.service.impl;

import lombok.AllArgsConstructor;
import ua.ies.TravelingBooking.TravelingBooking.dto.FlightsReservationDTO;
import ua.ies.TravelingBooking.TravelingBooking.dto.PassengerDTO;
import ua.ies.TravelingBooking.TravelingBooking.entity.FlightsReservation;
import ua.ies.TravelingBooking.TravelingBooking.entity.PassengerFlight;
import ua.ies.TravelingBooking.TravelingBooking.repository.FlightsReservationRepository;
import ua.ies.TravelingBooking.TravelingBooking.repository.UsersRepository;
import ua.ies.TravelingBooking.TravelingBooking.service.ReservationService;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ReservationServiceImpl implements ReservationService {
    private FlightsReservationRepository flightsReservationRepository;
    protected UsersRepository usersRepository;

    @Override
    @Transactional
    public FlightsReservation createReservation(FlightsReservationDTO reservationDTO) {
        FlightsReservation reservation = convertToEntity(reservationDTO);
        reservation = flightsReservationRepository.save(reservation);
        return reservation;
    }

    @Override
    public FlightsReservation getReservation(String reservationId) {
        Optional<FlightsReservation> reservation = flightsReservationRepository.findById(reservationId);
        return reservation.orElse(null);
    }

    @Override
    public void deleteReservation(String reservationId) {
        flightsReservationRepository.deleteById(reservationId);
    }

    @Override
    public List<FlightsReservation> getAllReservations() {
        return flightsReservationRepository.findAll();
    }

    @Override
    public List<FlightsReservation> findReservationsByOutboundFlight(String flightNumber) {
        return flightsReservationRepository.findByFlightNumberOutbound(flightNumber);
    }

    @Override
    public List<FlightsReservation> findReservationsByInboundFlight(String flightNumber) {
        return flightsReservationRepository.findByFlightNumberInbound(flightNumber);
    }

    @Override
    public List<FlightsReservation> findReservationsByDate(Date reservationDate) {
        return flightsReservationRepository.findByReservationDate(reservationDate);
    }

    @Override
    public List<FlightsReservation> findReservationsBetweenDates(Date startDate, Date endDate) {
        return flightsReservationRepository.findByReservationDateBetween(startDate, endDate);
    }

    private FlightsReservation convertToEntity(FlightsReservationDTO reservationDTO) {
        FlightsReservation reservation = new FlightsReservation();
        
        System.out.println("USER ID: " + reservationDTO.getUserID());
        System.out.println("USER: " + usersRepository.findByUserID(reservationDTO.getUserID()).getEmail());
        
        reservation.setUser(usersRepository.findByUserID(reservationDTO.getUserID()));
        reservation.generateReservationId();
        reservation.setFlightNumberOutbound(reservationDTO.getFlightNumberOutbound());
        
        if (reservationDTO.getFlightNumberInbound() != null) {
            reservation.setFlightNumberInbound(reservationDTO.getFlightNumberInbound());
        }
        else {
            reservation.setFlightNumberInbound(null);
        }
        System.out.println("IS ROUND TRIP: " + reservationDTO.getRoundTrip());
        reservation.setRoundTrip(reservationDTO.getRoundTrip());
        reservation.setTotalPrice(reservationDTO.getTotalPrice());
        reservation.setReservationDate(reservationDTO.getReservationDate());
        reservation.setEmailContact(reservationDTO.getEmailContact());
        reservation.setPhoneContact(reservationDTO.getPhoneContact());
        reservation.setNameCard(reservationDTO.getNameCard());
        reservation.setNumberCard(reservationDTO.getNumberCard());
        reservation.setExpirationDateCard(reservationDTO.getExpirationDateCard());
        reservation.setCvvCard(reservationDTO.getCvvCard());
        reservation.setAddressCard1(reservationDTO.getAddressCard1());

        if (reservationDTO.getAddressCard2() != null) {
            reservation.setAddressCard2(reservationDTO.getAddressCard2());
        }
        else {
            reservation.setAddressCard2(null);
        }

        reservation.setCityCard(reservationDTO.getCityCard());
        reservation.setZipCodeCard(reservationDTO.getZipCodeCard());
        reservation.setCountryCard(reservationDTO.getCountryCard());

        Set<PassengerFlight> passengers = reservationDTO.getPassengers().stream()
                .map(passengerDTO -> convertPassengerDtoToEntity(passengerDTO, reservation))
                .collect(Collectors.toSet());
        reservation.setPassengers(passengers);

        return reservation;
    }

    private PassengerFlight convertPassengerDtoToEntity(PassengerDTO passengerDTO, FlightsReservation reservation) {
        PassengerFlight passenger = new PassengerFlight();
        passenger.setType(passengerDTO.getType());
        passenger.setFirstName(passengerDTO.getFirstName());
        passenger.setLastName(passengerDTO.getLastName());
        passenger.setSex(passengerDTO.getSex());
        passenger.setNationality(passengerDTO.getNationality());
        passenger.setBirthDate(passengerDTO.getBirthDate());
        passenger.setPassportNumber(passengerDTO.getPassportNumber());
        passenger.setFlightsReservation(reservation); // Set the reservation ID

        return passenger;
    }

    @Override
    public List<FlightsReservation> findReservationsByUser(Integer userId) {
        return flightsReservationRepository.findByUser(usersRepository.findByUserID(userId));
    }
}