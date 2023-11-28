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

    @Column(name = "User_id")
    private String userId;

    @Column(name = "Ticket_number")
    private String ticketNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "User_id", referencedColumnName = "UserID", insertable = false, updatable = false)
    private User UserID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Ticket_number", referencedColumnName = "TicketNumber", insertable = false, updatable = false)
    private Ticket_flight TicketNumber;
}
