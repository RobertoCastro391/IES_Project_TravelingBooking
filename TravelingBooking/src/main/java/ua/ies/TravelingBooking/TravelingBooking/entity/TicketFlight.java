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
public class TicketFlight {
 
    @Id
    @Column(name = "TicketNumber")
    private String ticketNumber;

    @Column(name = "FlightNumber", nullable = false)
    private String flightNumber;

    @Column(name = "Seat", nullable = false)
    private String seat;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FlightNumber", referencedColumnName = "FlightNumber", insertable = false, updatable = false)
    private Flight FlightNumber;
}
