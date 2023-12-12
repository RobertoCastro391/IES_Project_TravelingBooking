package ua.ies.TravelingBooking.TravelingBooking.repository;

import ua.ies.TravelingBooking.TravelingBooking.entity.Train;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


public interface TrainsRepository extends JpaRepository<Train, String> {
    Train findByTrainNumber(String trainNumber);
    List<Train> findByStationCodeOriginAndStationCodeDestinationAndTravelDate(String stationCodeOrigin, String stationCodeDestination, Date travelDate);
}