package ua.ies.TravelingBooking.TravelingBooking.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "TicketsFlight")
public class Ticket_flight {
 
    @Id
    @Column(name = "TicketNumber")
    private String ticketNumber;

    @Column(name = "User_id")
    private String userId;

    @Column(name = "Flight_number")
    private String flightNumber;

    @Column(name = "FlightDate", nullable = false)
    private Date flightDate;

    @Column(name = "AirlineCode", nullable = false)
    private String airlineCode;

    @Column(name = "Airport_code_origin", nullable = false)
    private String airport_code_origin;

    @Column(name = "Airport_code_destination", nullable = false)
    private String airport_code_destination;

    @Column(name = "Departure_hour", nullable = false)
    private String departureHour;

    @Column(name = "Arrival_hour", nullable = false)
    private String arrivalHour;

    @Column(name = "Duration", nullable = false)
    private String duration;

    @Column(name = "Price", nullable = false)
    private Double price;

    @Column(name = "Seat", nullable = false)
    private String seat;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "User_id", referencedColumnName = "UserID", insertable = false, updatable = false)
    private User UserID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Flight_number", referencedColumnName = "FlightNumber", insertable = false, updatable = false)
    private Flight FlightNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "AirlineCode", referencedColumnName = "airline_Code", insertable = false, updatable = false)
    private Airline airline_Code;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Airport_code_origin", referencedColumnName = "Airport_Code", insertable = false, updatable = false)
    private Airport airportcodeorigin;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Airport_code_destination", referencedColumnName = "Airport_Code", insertable = false, updatable = false)
    private Airport airportcodedestination;
}
