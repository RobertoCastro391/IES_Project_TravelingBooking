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
@Table(name = "Reservations")
public class Reservation {
    
    @Id
    @Column(name = "ReservationNumber")
    private String reservationNumber;

    @Column(name = "UserId")
    private String userId;

    @Column(name = "TicketNumber")
    private String ticketNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "UserId", referencedColumnName = "UserID", insertable = false, updatable = false)
    private User UserID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TicketNumber", referencedColumnName = "TicketNumber", insertable = false, updatable = false)
    private TicketFlight TicketNumber;
}
