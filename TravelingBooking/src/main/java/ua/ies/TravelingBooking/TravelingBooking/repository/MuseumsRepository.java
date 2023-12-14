package ua.ies.TravelingBooking.TravelingBooking.repository;

import ua.ies.TravelingBooking.TravelingBooking.entity.Museum;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MuseumsRepository extends JpaRepository<Museum, String> {
    Museum findByMuseumID(int museumID);
    List<Museum> findByMuseumLocation(String museumLocation);
}