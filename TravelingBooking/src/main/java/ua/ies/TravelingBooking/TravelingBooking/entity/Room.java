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
@Table(name = "Rooms")
public class Room {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RoomID")
    private int roomID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "HotelID", referencedColumnName = "HotelID")
    private Hotel hotel;

    @Column(name = "RoomPort")
    private int roomPort;

    @Column(name = "NumberOfKeys")
    private int numberOfKeys;

    @Column(name = "NumberOfPersons", nullable = false)
    private int numberOfPersons;

    @Column(name = "AvaliabilityNights")
    private int availabilityNights;

    @Column(name = "RoomMeters")
    private int roomMeters;

    @Column(name = "NumberOfDoubleBed", nullable = false)
    private int numberOfDoubleBed;

    @Column(name = "NumberOfSingleBed")
    private int numberOfSingleBed;

    @Column(name = "Smoking")
    private boolean smoking;

    @Column(name = "MealsIncluded", nullable = false)
    private int mealsIncluded;

    // Getters e Setters
}
