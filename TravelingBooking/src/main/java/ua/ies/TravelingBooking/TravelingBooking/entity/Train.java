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

    @Column(name = "StationCodePartida", nullable = false)
    private String aeroCodePartida;

    @Column(name = "StationCodeChegada", nullable = false)
    private String aeroCodeChegada;

    @Column(name = "DepartureHour", nullable = false)
    private String departureHour;

    @Column(name = "ArrivalHour", nullable = false)
    private String arrivalHour;

    @Column(name = "Price2ndclass", nullable = false)
    private Double price2ndclass;

    @Column(name = "Price1stclass", nullable = false)
    private Double price1stclass;
    
    // Getters e Setters
}
