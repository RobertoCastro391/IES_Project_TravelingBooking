package ua.ies.TravelingBooking.TravelingBooking.service;

import java.util.List;

import ua.ies.TravelingBooking.TravelingBooking.entity.Museum;

public interface MuseumService {
    Museum createMuseum(Museum museum);
    Museum getMuseum(int museumID);
    List<Museum> getAllCityMuseums(String museumLocation);
    List<String> findTop12MuseumLocations();
}
