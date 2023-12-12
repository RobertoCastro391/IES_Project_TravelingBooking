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
@Table(name = "Hotels")
public class Hotel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "HotelID")
    private int hotelID;

    @Column(name = "HotelName", nullable = false)
    private String hotelName;

    private String hotelImage4;

    @Column(name = "Address")
    private String Address;

    @Column(name = "PhoneNumber")
    private String phoneNumber;

    @Column(name = "InicialPrice", nullable = false)
    private String initialPrice;

    @Column(name = "FinalPrice")
    private String finalPrice;

    @Column(name = "Baggages")
    private int baggages;

    @Column(name = "FoodIncluded", nullable = false)
    private String foodIncluded;

    @Column(name = "AC")
    private boolean ac;

    @Column(name = "Wifi")
    private boolean wifi;

    @Column(name = "NumberOfReviews")
    private int numberOfReviews;

    @Column(name = "CleanlinessReview")
    private String cleanlinessReview;

    @Column(name = "ServiceReview")
    private String serviceReview;

    @Column(name = "ValueReview")
    private String valueReview;

    @Column(name = "LocationReview")
    private String locationReview;

    @Column(name = "RoomsReview")
    private String roomsReview;

    @Column(name = "SleepQualityReview")
    private String sleepQualityReview;

    // Getters e Setters
}
