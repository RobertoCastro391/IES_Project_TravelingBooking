package ua.ies.TravelingBooking.TravelingBooking.service.impl;


import lombok.AllArgsConstructor;
import ua.ies.TravelingBooking.TravelingBooking.entity.Airline;
import ua.ies.TravelingBooking.TravelingBooking.repository.AirlinesRepository;
import ua.ies.TravelingBooking.TravelingBooking.service.AirlineService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class AirlineServiceImpl implements AirlineService {
    private AirlinesRepository airlinesRepository;

    @Override
    public Airline createAirline(Airline airline) {
        return airlinesRepository.save(airline);
    }

    @Override
    public Airline getAirlineByAirlineCode(String airlineCode) {
        return airlinesRepository.findByAirlineCode(airlineCode);
    }

    @Override
    public List<Airline> getAllAirlines() {
        return airlinesRepository.findAll();
    }
}
