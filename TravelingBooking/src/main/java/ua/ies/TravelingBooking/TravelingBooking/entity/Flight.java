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
@Table(name = "Flights")
public class Flight {
 
    @Id
    @Column(name = "FlightNumber")
    private String flightNumber;

    @Column(name = "FlightDate", nullable = false)
    private Date flightDate;

    @Column(name = "AirlineCode", nullable = false)
    private String airlineCode;

    @Column(name = "AirportCodeOrigin", nullable = false)
    private String airportCodeOrigin;

    @Column(name = "AirportCodeDestination", nullable = false)
    private String airportCodeDestination;

    @Column(name = "Departure_hour", nullable = false)
    private String departureHour;

    @Column(name = "Arrival_hour", nullable = false)
    private String arrivalHour;

    @Column(name = "Duration", nullable = false)
    private String duration;

    @Column(name = "Price", nullable = false)
    private Double price;

    @Column(name = "Seats", nullable = false)
    private Integer seats;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "AirlineCode", referencedColumnName = "airline_Code", insertable = false, updatable = false)
    private Airline airline_Code;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "AirportCodeOrigin", referencedColumnName = "Airport_Code", insertable = false, updatable = false)
    private Airport airportOriginInfo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "AirportCodeDestination", referencedColumnName = "Airport_Code", insertable = false, updatable = false)
    private Airport airportDestinationInfo;
}