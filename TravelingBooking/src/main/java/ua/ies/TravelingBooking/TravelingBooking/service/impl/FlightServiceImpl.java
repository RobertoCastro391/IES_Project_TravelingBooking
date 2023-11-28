package ua.ies.TravelingBooking.TravelingBooking.service.impl;

import lombok.AllArgsConstructor;
import ua.ies.TravelingBooking.TravelingBooking.entity.Flight;
import ua.ies.TravelingBooking.TravelingBooking.repository.FlightsRepository;
import ua.ies.TravelingBooking.TravelingBooking.service.FlightService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor
public class FlightServiceImpl implements FlightService {
    private FlightsRepository flightsRepository;

    @Override
    public Flight createFlight(Flight flight) {
        return flightsRepository.save(flight);
    }

    @Override
    public Flight getFlight(String flightNumber) {
        Optional<Flight> flight = flightsRepository.findById(flightNumber);
        return flight.get();
    }

    @Override
    public void deleteFlight(String flightNumber) {
        flightsRepository.deleteById(flightNumber);
    }

    @Override
    public List<Flight> getAllFlights() {
        return flightsRepository.findAll();
    }
} 