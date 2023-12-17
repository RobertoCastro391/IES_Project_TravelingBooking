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
    @Column(name = "reservationIdHotel", nullable = false, unique = true)
    private String id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "userID", referencedColumnName = "UserID")
    private User user;

    @Column(name = "totalPrice", nullable = false)
    private double totalPrice;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "reservationDate", nullable = false)
    private Date reservationDate;

    @Column(name = "emailContact", nullable = false)
    private String emailContact;

    @Column(name = "phoneContact", nullable = false)
    private String phoneContact;

    @Column(name = "nameCard", nullable = false)
    private String nameCard;

    @Column(name = "numberCard", nullable = false)
    private String numberCard;

    @Column(name = "expirationDateCard", nullable = false)
    private String expirationDateCard;

    @Column(name = "cvvCard", nullable = false)
    private String cvvCard;

    @Column(name = "AddressCard1", nullable = false)
    private String addressCard1;

    @Column(name = "AddressCard2")
    private String addressCard2;

    @Column(name = "CityCard", nullable = false)
    private String cityCard;

    @Column(name = "ZipCodeCard", nullable = false)
    private String zipCodeCard;

    @Column(name = "CountryCard", nullable = false)
    private String countryCard;

    @OneToMany(mappedBy = "hotelReservation", cascade = CascadeType.ALL)
    private Set<PassengerHotel> passengers = new HashSet<>();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "HotelID", referencedColumnName = "HotelID")
    private Hotel hotel;

    @PrePersist
    public void generateReservationId() {
        this.id = generateRandomId();
    }

    private String generateRandomId() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder result = new StringBuilder(5);
        Random random = new Random();
        for (int i = 0; i < 5; i++) {
            result.append(characters.charAt(random.nextInt(characters.length())));
        }
        return result.toString();
    }
}
