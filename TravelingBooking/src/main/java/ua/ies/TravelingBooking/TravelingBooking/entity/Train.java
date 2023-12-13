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
@Table(name = "Trains")
public class Train {
    
    @Id
    @Column(name = "TrainNumber")
    private String trainNumber;

    @Column(name = "TravelDate", nullable = false)
    private Date travelDate;

    @Column(name = "TrainCompanyCode", nullable = false)
    private String trainCompanyCode;

    @Column(name = "StationCodeOrigin", nullable = false)
    private String stationCodeOrigin;

    @Column(name = "StationCodeDestination", nullable = false)
    private String stationCodeDestination;

    @Column(name = "DepartureHour", nullable = false)
    private String departureHour;

    @Column(name = "ArrivalHour", nullable = false)
    private String arrivalHour;

    @Column(name = "Duration", nullable = false)
    private String duration;

    @Column(name = "Price2ndclass", nullable = false)
    private Double price2ndclass;

    @Column(name = "Price1stclass", nullable = false)
    private Double price1stclass;

    @Column(name = "Carriages", nullable = false)
    private Integer carriages;

    @Column(name = "Seats", nullable = false)
    private Integer seats;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "TrainCompanyCode", referencedColumnName = "TrainCompanyCode", insertable = false, updatable = false)
    private TrainCompany companyCode;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "StationCodeOrigin", referencedColumnName = "StationCode", insertable = false, updatable = false)
    private Station stationOriginInfo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "StationCodeDestination", referencedColumnName = "StationCode", insertable = false, updatable = false)
    private Station stationDestinationInfo;
}
