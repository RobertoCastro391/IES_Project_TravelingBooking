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
@Table(name = "Stations")
public class Station {
    
    @Id
    @Column(name = "StationCode")
    private String stationCode;

    @Column(name = "StationName", nullable = false)
    private String stationName;

    @Column(name = "stationCity", nullable = false)
    private String stationCity;

    @Column(name = "StationLat", nullable = false)
    private Double stationLat;

    @Column(name = "StationLong", nullable = false)
    private Double stationLong;
}

