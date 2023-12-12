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
@Table(name = "TrainCompanies")
public class TrainCompany {
    
    @Id
    @Column(name = "TrainCompanyCode")
    private String trainCompanyCode;

    @Column(name = "TrainCompanyName", nullable = false)
    private String trainCompanyName;
}
