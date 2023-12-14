package ua.ies.TravelingBooking.TravelingBooking.service.impl;

import lombok.AllArgsConstructor;
import ua.ies.TravelingBooking.TravelingBooking.dto.TrainsReservationDTO;
import ua.ies.TravelingBooking.TravelingBooking.dto.HotelReservationDTO;
import ua.ies.TravelingBooking.TravelingBooking.dto.PassengerDTO;
import ua.ies.TravelingBooking.TravelingBooking.entity.TrainsReservation;
import ua.ies.TravelingBooking.TravelingBooking.entity.HotelReservation;
import ua.ies.TravelingBooking.TravelingBooking.entity.PassengerFlight;
import ua.ies.TravelingBooking.TravelingBooking.entity.PassengerHotel;
import ua.ies.TravelingBooking.TravelingBooking.entity.PassengerTrain;
import ua.ies.TravelingBooking.TravelingBooking.repository.HotelsRepository;
import ua.ies.TravelingBooking.TravelingBooking.repository.HotelsReservationRepository;
import ua.ies.TravelingBooking.TravelingBooking.repository.TrainsReservationRepository;
import ua.ies.TravelingBooking.TravelingBooking.repository.UsersRepository;
import ua.ies.TravelingBooking.TravelingBooking.service.HotelsReservationService;
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
public class HotelReservationServiceImpl implements HotelsReservationService {
    private HotelsReservationRepository hotelReservationRepository;
    private HotelsRepository hotelsRepository;
    protected UsersRepository usersRepository;

    @Override
    @Transactional
    public HotelReservation createReservation(HotelReservationDTO reservationDTO) {
        
        System.out.println("AQUIIiiiiiinicla2");
        System.out.println(reservationDTO.getHotelID());
        System.out.println(reservationDTO.getPassengers().get(0).getFirstName());
        
        HotelReservation reservation = convertToEntity(reservationDTO);
        reservation = hotelReservationRepository.save(reservation);
        return reservation;
    }


    private HotelReservation convertToEntity(HotelReservationDTO reservationDTO) {
        HotelReservation reservation = new HotelReservation();
        
        System.out.println("USER ID: " + reservationDTO.getUserID());
        System.out.println("USER: " + usersRepository.findByUserID(reservationDTO.getUserID()));
        
        reservation.setUser(usersRepository.findByUserID(reservationDTO.getUserID()));
        reservation.generateReservationId();
        reservation.setTotalPrice(reservationDTO.getTotalPrice());
        reservation.setReservationDate(reservationDTO.getReservationDate());
        reservation.setEmailContact(reservationDTO.getEmailContact());
        reservation.setPhoneContact(reservationDTO.getPhoneContact());
        reservation.setNameCard(reservationDTO.getNameCard());
        reservation.setNumberCard(reservationDTO.getNumberCard());
        reservation.setExpirationDateCard(reservationDTO.getExpirationDateCard());
        reservation.setCvvCard(reservationDTO.getCvvCard());
        reservation.setAddressCard1(reservationDTO.getAddressCard1());
        reservation.setHotelID(reservationDTO.getHotelID());
        reservation.setHotel(hotelsRepository.findByHotelID(reservationDTO.getHotelID()));

        if (reservationDTO.getAddressCard2() != null) {
            reservation.setAddressCard2(reservationDTO.getAddressCard2());
        }
        else {
            reservation.setAddressCard2(null);
        }

        reservation.setCityCard(reservationDTO.getCityCard());
        reservation.setZipCodeCard(reservationDTO.getZipCodeCard());
        reservation.setCountryCard(reservationDTO.getCountryCard());

        Set<PassengerHotel> passengers = reservationDTO.getPassengers().stream()
                .map(passengerDTO -> convertPassengerDtoToEntity(passengerDTO, reservation))
                .collect(Collectors.toSet());
        reservation.setPassengers(passengers);

        return reservation;
    }

    private PassengerHotel convertPassengerDtoToEntity(PassengerDTO passengerDTO, HotelReservation reservation) {
        PassengerHotel passenger = new PassengerHotel();
        passenger.setType(passengerDTO.getType());
        passenger.setFirstName(passengerDTO.getFirstName());
        passenger.setLastName(passengerDTO.getLastName());
        passenger.setSex(passengerDTO.getSex());
        passenger.setNationality(passengerDTO.getNationality());
        passenger.setBirthDate(passengerDTO.getBirthDate());
        passenger.setPassportNumber(passengerDTO.getPassportNumber());
        passenger.setHotelReservation(reservation); // Set the reservation ID

        return passenger;
    }

    @Override
    public List<HotelReservation> findReservationsByUser(Integer userId) {
        return hotelReservationRepository.findByUser(usersRepository.findByUserID(userId));
    }
}