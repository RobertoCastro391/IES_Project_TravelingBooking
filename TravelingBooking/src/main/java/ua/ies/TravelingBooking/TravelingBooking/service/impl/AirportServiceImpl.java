package ua.ies.TravelingBooking.TravelingBooking.service.impl;


import lombok.AllArgsConstructor;
import ua.ies.TravelingBooking.TravelingBooking.entity.Airport;
import ua.ies.TravelingBooking.TravelingBooking.repository.AirportsRepository;
import ua.ies.TravelingBooking.TravelingBooking.service.AirportService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AirportServiceImpl implements AirportService {

    private AirportsRepository airportsRepository;
    
    @Override
    public Airport createAirport(Airport airport) {
        return airportsRepository.save(airport);
    }

    @Override
    public Airport getAirportByAirportCode(String airportCode) {
        return airportsRepository.findByAirportCode(airportCode); 
    }

    @Override
    public List<Airport> getAllAirports() {
        return airportsRepository.findAll();
    }
}
