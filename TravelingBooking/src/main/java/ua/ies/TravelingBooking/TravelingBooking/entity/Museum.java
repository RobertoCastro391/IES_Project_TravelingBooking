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
@Table(name = "Museums")
public class Museum {

    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MuseumID")
    private int museumID;

    @Column(name = "MuseumName", nullable = false)
    private String museumName;

    @Column(name = "MuseumDescription", nullable = false)
    private String museumDescription;

    @Column(name = "MuseumLocation", nullable = false)
    private String museumLocation;

    @Column(name = "MuseumImage")
    private String museumImage;

    @Column(name = "StreetAddress")
    private String streetAddress;

    @Column(name = "OpeningHours")
    private String openingHours;

    @Column(name = "MuseumLatitude")
    private String museumLatitude;

    @Column(name = "MuseumLongitude")
    private String museumLongitude;

    @Column(name = "TicketpriceAdult", nullable = false)
    private String ticketPriceAdult;

    @Column(name = "TicketpriceChild")
    private String ticketPriceChild;

    @Column(name = "TicketpriceGroup")
    private String ticketPriceGroup;

    @Column(name = "TicketpriceGroupchild")
    private String ticketPriceGroupChild;

    // Getters e Setters
}
