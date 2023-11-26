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

    @Column(name = "HotelDescription", nullable = false)
    private String hotelDescription;

    @Column(name = "HotelLocation", nullable = false)
    private String hotelLocation;

    @Column(name = "HotelImage")
    private String hotelImage;

    @Column(name = "HotelImage2")
    private String hotelImage2;

    @Column(name = "HotelImage3")
    private String hotelImage3;

    @Column(name = "HotelImage4")
    private String hotelImage4;

    @Column(name = "StreetAddress")
    private String streetAddress;

    @Column(name = "PhoneNumber")
    private String phoneNumber;

    @Column(name = "Email", nullable = false)
    private String email;

    @Column(name = "Inicial_price", nullable = false)
    private String initialPrice;

    @Column(name = "Person_number")
    private int personNumber;

    @Column(name = "Baggages")
    private int baggages;

    @Column(name = "Food_included", nullable = false)
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
