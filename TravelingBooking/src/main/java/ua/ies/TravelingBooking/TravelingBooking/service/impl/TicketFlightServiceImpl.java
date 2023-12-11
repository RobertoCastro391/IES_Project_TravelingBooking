package ua.ies.TravelingBooking.TravelingBooking.service.impl;

import lombok.AllArgsConstructor;
import ua.ies.TravelingBooking.TravelingBooking.entity.TicketFlight;
import ua.ies.TravelingBooking.TravelingBooking.repository.TicketFlightRepository;
import ua.ies.TravelingBooking.TravelingBooking.service.TicketFlightService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor
public class TicketFlightServiceImpl implements TicketFlightService {
    private TicketFlightRepository ticket_flightRepository;

    @Override
    public TicketFlight createTicket_flight(TicketFlight ticketNumber) {
        return ticket_flightRepository.save(ticketNumber);
    }

    @Override
    public TicketFlight getTicket_flight(String ticketNumber) {
        Optional<TicketFlight> ticket_flight = ticket_flightRepository.findById(ticketNumber);
        return ticket_flight.get();
    }

    @Override
    public void deleteTicket_flight(String ticketNumber) {
        ticket_flightRepository.deleteById(ticketNumber);
    }  
}
