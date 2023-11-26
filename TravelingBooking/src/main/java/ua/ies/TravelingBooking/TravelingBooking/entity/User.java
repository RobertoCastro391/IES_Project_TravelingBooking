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
@Table(name = "Users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserID")
    private int userID;

    @Column(name = "FirstName", nullable = false)
    private String firstName;

    @Column(name = "LastName", nullable = false)
    private String lastName;

    @Column(name = "Sex")
    private String sex;

    @Column(name = "BirthDate")
    private Date birthDate;

    @Column(name = "PassportNumber")
    private String passportNumber;

    @Column(name = "Nacionality")
    private String nationality;

    @Column(name = "Email", nullable = false)
    private String email;

    @Column(name = "UserPassword", nullable = false)
    private String userPassword;

    @Column(name = "Locality", nullable = false)
    private String locality;

    @Column(name = "StreetAddress", nullable = false)
    private String streetAddress;

    @Column(name = "PostalCode", nullable = false)
    private String postalCode;

    @Column(name = "City", nullable = false)
    private String city;

    @Column(name = "Country", nullable = false)
    private String country;

    @Column(name = "CardNumber")
    private String cardNumber;

    @Column(name = "CardPIN")
    private String cardPIN;

    // Getters e Setters
}