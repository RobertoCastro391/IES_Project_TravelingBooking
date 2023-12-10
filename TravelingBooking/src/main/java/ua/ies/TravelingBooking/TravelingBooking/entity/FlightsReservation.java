package ua.ies.TravelingBooking.TravelingBooking.entity;

import java.util.Date;
import java.util.HashSet;
import java.util.Random;
import java.util.Set;

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
@Table(name = "FlightsReservation")
public class FlightsReservation {

    @Id
    @Column(name = "reservationId", nullable = false, unique = true)
    private String id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "userID", referencedColumnName = "UserID")
    private User user;

    @Column(name = "flightNumberOutbound", nullable = false)
    private String flightNumberOutbound;

    @Column(name = "flightNumberInbound", nullable = true)
    private String flightNumberInbound;

    @Column(name = "isRoundTrip")
    private boolean roundTrip;

    @Column(name = "totalPrice", nullable = false)
    private double totalPrice;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "reservationDate", nullable = false)
    private Date reservationDate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "flightNumberOutbound", referencedColumnName = "FlightNumber", insertable = false, updatable = false)
    private Flight flightOutbound;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "flightNumberInbound", referencedColumnName = "FlightNumber", insertable = false, updatable = false)
    private Flight flightInbound;

    @OneToMany(mappedBy = "flightsReservation", cascade = CascadeType.ALL)
    private Set<PassengerFlight> passengers = new HashSet<>();

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