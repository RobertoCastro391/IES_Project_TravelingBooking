package ua.ies.TravelingBooking.TravelingBooking.entity;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
@Table(name = "Passengers")
public class PassengerFlight {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Type", nullable = false)
    private String type;

    @Column(name = "FirstName", nullable = false)
    private String firstName;
    
    @Column(name = "LastName", nullable = false)
    private String lastName;

    @Column(name = "Sex", nullable = false)
    private String sex;

    @Column(name = "Nationality", nullable = false)
    private String nationality;

    @Column(name = "BirthDate", nullable = false)
    private Date birthDate;

    @Column(name = "PassportNumber", nullable = false)
    private String passportNumber;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ReservationID", referencedColumnName = "reservationId")
    @JsonIgnore
    private FlightsReservation flightsReservation;
}