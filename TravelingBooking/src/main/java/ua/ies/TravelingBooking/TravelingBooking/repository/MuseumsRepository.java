package ua.ies.TravelingBooking.TravelingBooking.repository;

import ua.ies.TravelingBooking.TravelingBooking.entity.Museum;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MuseumsRepository extends JpaRepository<Museum, String> {
    Museum findById(int museumID);
    List<Museum> findByLocation(String museumLocation);
}