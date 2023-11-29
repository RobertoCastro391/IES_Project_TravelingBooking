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

    @Column(name = "Seats", nullable = false)
    private Integer seats;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "AirlineCode", referencedColumnName = "airline_Code", insertable = false, updatable = false)
    private Airline airline_Code;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "Airport_code_origin", referencedColumnName = "Airport_Code", insertable = false, updatable = false)
    private Airport airportcodeorigin;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "Airport_code_destination", referencedColumnName = "Airport_Code", insertable = false, updatable = false)
    private Airport airportcodedestination;
}