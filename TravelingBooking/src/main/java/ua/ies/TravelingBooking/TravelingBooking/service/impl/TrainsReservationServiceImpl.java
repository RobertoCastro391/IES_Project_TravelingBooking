package ua.ies.TravelingBooking.TravelingBooking.service.impl;

import lombok.AllArgsConstructor;
import ua.ies.TravelingBooking.TravelingBooking.dto.TrainsReservationDTO;
import ua.ies.TravelingBooking.TravelingBooking.dto.PassengerDTO;
import ua.ies.TravelingBooking.TravelingBooking.entity.TrainsReservation;
import ua.ies.TravelingBooking.TravelingBooking.entity.PassengerTrain;
import ua.ies.TravelingBooking.TravelingBooking.repository.TrainsReservationRepository;
import ua.ies.TravelingBooking.TravelingBooking.repository.UsersRepository;
import ua.ies.TravelingBooking.TravelingBooking.service.TrainsReservationService;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TrainsReservationServiceImpl implements TrainsReservationService {
    private TrainsReservationRepository trainsReservationRepository;
    protected UsersRepository usersRepository;

    @Override
    @Transactional
    public TrainsReservation createReservation(TrainsReservationDTO reservationDTO) {
        TrainsReservation reservation = convertToEntity(reservationDTO);
        reservation = trainsReservationRepository.save(reservation);
        return reservation;
    }

    @Override
    public TrainsReservation getReservation(String reservationId) {
        Optional<TrainsReservation> reservation = trainsReservationRepository.findById(reservationId);
        return reservation.orElse(null);
    }

    @Override
    public void deleteReservation(String reservationId) {
        trainsReservationRepository.deleteById(reservationId);
    }

    @Override
    public List<TrainsReservation> getAllReservations() {
        return trainsReservationRepository.findAll();
    }

    @Override
    public List<TrainsReservation> findReservationsByOutboundTrain(String trainNumber) {
        return trainsReservationRepository.findByTrainNumberOutbound(trainNumber);
    }

    @Override
    public List<TrainsReservation> findReservationsByInboundTrain(String trainNumber) {
        return trainsReservationRepository.findByTrainNumberInbound(trainNumber);
    }

    @Override
    public List<TrainsReservation> findReservationsByDate(Date reservationDate) {
        return trainsReservationRepository.findByReservationDate(reservationDate);
    }

    @Override
    public List<TrainsReservation> findReservationsBetweenDates(Date startDate, Date endDate) {
        return trainsReservationRepository.findByReservationDateBetween(startDate, endDate);
    }

    private TrainsReservation convertToEntity(TrainsReservationDTO reservationDTO) {
        TrainsReservation reservation = new TrainsReservation();
        
        System.out.println("USER ID: " + reservationDTO.getUserID());
        System.out.println("USER: " + usersRepository.findByUserID(reservationDTO.getUserID()));
        
        reservation.setUser(usersRepository.findByUserID(reservationDTO.getUserID()));
        reservation.generateReservationId();
        reservation.setTrainNumberOutbound(reservationDTO.getTrainNumberOutbound());
        
        if (reservationDTO.getTrainNumberInbound() != null) {
            reservation.setTrainNumberInbound(reservationDTO.getTrainNumberInbound());
        }
        else {
            reservation.setTrainNumberInbound(null);
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

        Set<PassengerTrain> passengers = reservationDTO.getPassengers().stream()
                .map(passengerDTO -> convertPassengerDtoToEntity(passengerDTO, reservation))
                .collect(Collectors.toSet());
        reservation.setPassengers(passengers);

        return reservation;
    }

    private PassengerTrain convertPassengerDtoToEntity(PassengerDTO passengerDTO, TrainsReservation reservation) {
        PassengerTrain passenger = new PassengerTrain();
        passenger.setType(passengerDTO.getType());
        passenger.setFirstName(passengerDTO.getFirstName());
        passenger.setLastName(passengerDTO.getLastName());
        passenger.setSex(passengerDTO.getSex());
        passenger.setNationality(passengerDTO.getNationality());
        passenger.setBirthDate(passengerDTO.getBirthDate());
        passenger.setPassportNumber(passengerDTO.getPassportNumber());
        passenger.setTrainsReservation(reservation); // Set the reservation ID

        return passenger;
    }

    @Override
    public List<TrainsReservation> findReservationsByUser(Integer userId) {
        return trainsReservationRepository.findByUser(usersRepository.findByUserID(userId));
    }
}