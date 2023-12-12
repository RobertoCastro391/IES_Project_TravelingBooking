package ua.ies.TravelingBooking.TravelingBooking.service;

import java.util.Date;
import java.util.List;

import ua.ies.TravelingBooking.TravelingBooking.entity.Station;

public interface StationService {
    Station createStation(Station station);
    Station getStation(String stationCode);
    List<Station> getAllStations();
}