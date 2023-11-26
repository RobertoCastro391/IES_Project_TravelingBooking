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
@Table(name = "Trains")
public class Train {
    
    @Id
    @Column(name = "TrainNumber")
    private String trainNumber;

    @Column(name = "TravelDate", nullable = false)
    private Date travelDate;

    @Column(name = "StationCode_partida", nullable = false)
    private String aeroCodePartida;

    @Column(name = "StationCode_chegada", nullable = false)
    private String aeroCodeChegada;

    @Column(name = "Departure_hour", nullable = false)
    private String departureHour;

    @Column(name = "Arrival_hour", nullable = false)
    private String arrivalHour;

    // Getters e Setters
}
