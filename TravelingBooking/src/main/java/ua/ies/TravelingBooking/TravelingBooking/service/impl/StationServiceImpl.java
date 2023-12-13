package ua.ies.TravelingBooking.TravelingBooking.service.impl;

import lombok.AllArgsConstructor;
import ua.ies.TravelingBooking.TravelingBooking.entity.Station;
import ua.ies.TravelingBooking.TravelingBooking.repository.StationsRepository;
import ua.ies.TravelingBooking.TravelingBooking.service.StationService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class StationServiceImpl implements StationService {

    private StationsRepository stationsRepository;
    
    @Override
    public Station createStation(Station station) {
        return stationsRepository.save(station);
    }

    @Override
    public Station getStation(String stationCode) {
        return stationsRepository.findByStationCode(stationCode); 
    }

    @Override
    public List<Station> getAllStations() {
        return stationsRepository.findAll();
    }
}
