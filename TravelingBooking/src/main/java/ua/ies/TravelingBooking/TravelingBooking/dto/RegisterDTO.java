package ua.ies.TravelingBooking.TravelingBooking.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String userPassword;
    private String streetAddress;
    private String postalCode;
    private String city;
    private String country;
}
