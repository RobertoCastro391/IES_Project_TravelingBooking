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

    @Column(name = "FlightCompany", nullable = false)
    private String flightCompany;

    @Column(name = "Aeroporto", nullable = false)
    private String aeroporto;

    @Column(name = "AeroportoCode", nullable = false)
    private String aeroportoCode;

    @Column(name = "AeroCode_partida", nullable = false)
    private String aeroCodePartida;

    @Column(name = "AeroCode_chegada", nullable = false)
    private String aeroCodeChegada;

    @Column(name = "Departure_hour", nullable = false)
    private String departureHour;

    @Column(name = "Arrival_hour", nullable = false)
    private String arrivalHour;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FlightCompany", referencedColumnName = "CompanyName", insertable = false, updatable = false)
    private AeroCompany aeroCompany;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Aeroporto", referencedColumnName = "AeroportoName", insertable = false, updatable = false)
    private Aeroportos aeroporto;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "AeroportoCode", referencedColumnName = "Code", insertable = false, updatable = false)
    private Aeroportos aeroportoCode;

    // Getters e Setters
}