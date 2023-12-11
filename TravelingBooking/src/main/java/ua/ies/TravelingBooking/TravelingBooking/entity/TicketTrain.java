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
@Table(name = "TicketsTrain")
public class TicketTrain {
    
    @Id
    @Column(name = "TicketNumber")
    private String ticketNumber;
    
    @Column(name = "UserId")
    private String userId;

    @Column(name = "TrainNumber")
    private String trainNumber;

    @Column(name = "Seat", nullable = false)
    private String seat;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "UserId", referencedColumnName = "UserID", insertable = false, updatable = false)
    private User UserID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TrainNumber", referencedColumnName = "TrainNumber", insertable = false, updatable = false)
    private Train TrainNumber;
}
