package ua.ies.TravelingBooking.TravelingBooking.repository;

import ua.ies.TravelingBooking.TravelingBooking.entity.Station;
import org.springframework.data.jpa.repository.JpaRepository;


public interface StationsRepository extends JpaRepository<Station, String> {
    Station findByStationCode(String stationCode);
} 