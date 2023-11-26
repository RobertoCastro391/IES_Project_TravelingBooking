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
@Table(name = "HotelReservation")
public class HotelReservation {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ReservationID")
    private int reservationID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "HotelID", referencedColumnName = "HotelID")
    private Hotel hotel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "UserID", referencedColumnName = "UserID")
    private User user;

    @Column(name = "FirstName", nullable = false)
    private String firstName;

    @Column(name = "LastName")
    private String lastName;

    @Column(name = "CheckinDate", nullable = false)
    private Date checkinDate;

    @Column(name = "CheckoutDate", nullable = false)
    private Date checkoutDate;

    @Column(name = "NumberOfAdults", nullable = false)
    private int numberOfAdults;

    @Column(name = "NumberOfChilds")
    private int numberOfChilds;

    @Column(name = "Animals")
    private boolean animals;

    @Column(name = "TotalPrice", nullable = false)
    private int totalPrice;

    // Getters e Setters
}
