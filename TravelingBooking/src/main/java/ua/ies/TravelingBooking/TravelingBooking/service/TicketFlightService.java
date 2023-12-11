package ua.ies.TravelingBooking.TravelingBooking.service;

import java.util.List;

import ua.ies.TravelingBooking.TravelingBooking.entity.TicketFlight;

public interface TicketFlightService {
    TicketFlight createTicket_flight(TicketFlight ticketNumber);
    TicketFlight getTicket_flight(String ticketNumber);
    void deleteTicket_flight(String ticketNumber);
}
