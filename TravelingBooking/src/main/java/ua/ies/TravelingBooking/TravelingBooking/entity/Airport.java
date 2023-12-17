package ua.ies.TravelingBooking.TravelingBooking.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Airports")
public class Airport {
    
    @Id
    @Column(name = "Airport_Code")
    private String airportCode;

    @Column(name = "Airport_Name", nullable = false)
    private String airportName;

    @Column(name = "Airports_Lat", nullable = false)
    private Double airportLat;

    @Column(name = "Airports_Long", nullable = false)
    private Double airportLong;
}
