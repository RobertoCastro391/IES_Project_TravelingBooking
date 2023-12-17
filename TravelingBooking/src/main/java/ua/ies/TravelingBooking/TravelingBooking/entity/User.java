package ua.ies.TravelingBooking.TravelingBooking.entity;

import java.util.Collection;
import java.util.List;
import java.util.Date;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ua.ies.TravelingBooking.TravelingBooking.Roles;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="user", uniqueConstraints = {@UniqueConstraint(columnNames = {"username"})})
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserID")
    int userID;
    @Basic
    @Column(name = "FirstName", nullable = false)
    String firstName;
    
    @Column(name = "LastName", nullable = false)
    String lastName;

    @Column(name = "Sex")
    String sex;

    @Column(name = "BirthDate")
    Date birthDate;

    @Column(name = "PassportNumber")
    String passportNumber;

    @Column(name = "Nacionality")
    String nationality;

    @Column(name = "Username", nullable = false)
    String username;

    @Column(name = "UserPassword", nullable = false)
    String password;

    @Column(name = "Locality")
    String locality;

    @Column(name = "StreetAddress", nullable = false)
    String streetAddress;

    @Column(name = "PostalCode", nullable = false)
    String postalCode;

    @Column(name = "City", nullable = false)
    String city;

    @Column(name = "Country", nullable = false)
    String country;

    @Column(name = "CardNumber")
    String cardNumber;

    @Column(name = "CardPIN")
    String cardPIN;

    @Column(name = "PhoneNumber")
    String phoneNumber;

    @Enumerated(EnumType.STRING) 
    Roles role;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority((role.name())));
    }
    
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
       return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public static User builder() {
        return null;
    }
}