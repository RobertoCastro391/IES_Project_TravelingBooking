package ua.ies.TravelingBooking.TravelingBooking.service;

import java.util.List;

import ua.ies.TravelingBooking.TravelingBooking.entity.Ticket_flight;

public interface Ticket_flightService {
    Ticket_flight createTicket_flight(Ticket_flight ticketNumber);
    Ticket_flight getTicket_flight(String ticketNumber);
    void deleteTicket_flight(String ticketNumber);
}
