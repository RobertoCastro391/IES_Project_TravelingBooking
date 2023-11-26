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
@Table(name = "AeroCompany")
public class AeroCompany {
    
    @Id
    @Column(name = "CompanyCode")
    private String companyCode;

    @Column(name = "CompanyName", nullable = false)
    private String companyName;

    // Getters and Setters
}
