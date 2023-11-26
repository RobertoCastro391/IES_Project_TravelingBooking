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
@Table(name = "Aeroportos")
public class Aeroporto {
    
    @Id
    @Column(name = "Code")
    private String code;

    @Column(name = "AeroportoName", nullable = false)
    private String aeroportoName;

    @Column(name = "City", nullable = false)
    private String city;

    // Getters and Setters
}
