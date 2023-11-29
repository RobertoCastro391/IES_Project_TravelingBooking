package ua.ies.TravelingBooking.TravelingBooking.service.impl;

import lombok.AllArgsConstructor;
import ua.ies.TravelingBooking.TravelingBooking.entity.Ticket_flight;
import ua.ies.TravelingBooking.TravelingBooking.repository.Ticket_flightRepository;
import ua.ies.TravelingBooking.TravelingBooking.service.Ticket_flightService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor
public class Ticket_flightServiceImpl implements Ticket_flightService {
    private Ticket_flightRepository ticket_flightRepository;

    @Override
    public Ticket_flight createTicket_flight(Ticket_flight ticketNumber) {
        return ticket_flightRepository.save(ticketNumber);
    }

    @Override
    public Ticket_flight getTicket_flight(String ticketNumber) {
        Optional<Ticket_flight> ticket_flight = ticket_flightRepository.findById(ticketNumber);
        return ticket_flight.get();
    }

    @Override
    public void deleteTicket_flight(String ticketNumber) {
        ticket_flightRepository.deleteById(ticketNumber);
    }  
}
