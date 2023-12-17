package ua.ies.TravelingBooking.TravelingBooking.service.impl;

import lombok.AllArgsConstructor;
import ua.ies.TravelingBooking.TravelingBooking.dto.FlightsReservationDTO;
import ua.ies.TravelingBooking.TravelingBooking.dto.PassengerDTO;
import ua.ies.TravelingBooking.TravelingBooking.entity.FlightsReservation;
import ua.ies.TravelingBooking.TravelingBooking.entity.PassengerFlight;
import ua.ies.TravelingBooking.TravelingBooking.entity.User;
import ua.ies.TravelingBooking.TravelingBooking.repository.FlightsReservationRepository;
import ua.ies.TravelingBooking.TravelingBooking.repository.UsersRepository;
import ua.ies.TravelingBooking.TravelingBooking.service.FlightsReservationService;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class FlightsReservationServiceImpl implements FlightsReservationService {
    private FlightsReservationRepository flightsReservationRepository;
    protected UsersRepository usersRepository;

    @Override
    @Transactional
    public FlightsReservation createReservation(FlightsReservationDTO reservationDTO, User user) {
        FlightsReservation reservation = convertToEntity(reservationDTO, user);
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

    private FlightsReservation convertToEntity(FlightsReservationDTO reservationDTO, User user) {
        FlightsReservation reservation = new FlightsReservation();
        
        System.out.println("USER ID: " + user);
        
        reservation.setUser(user);
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
        passenger.setFlightsReservation(reservation);

        return passenger;
    }

    @Override
    public List<FlightsReservation> findReservationsByUser(User user) {
        return flightsReservationRepository.findByUser(user);
    }
}