package ua.ies.TravelingBooking.TravelingBooking.service;

import ua.ies.TravelingBooking.TravelingBooking.dto.AuthResponse;
import ua.ies.TravelingBooking.TravelingBooking.dto.LoginDTO;
import ua.ies.TravelingBooking.TravelingBooking.dto.RegisterDTO;

public interface AuthService {
    AuthResponse register(RegisterDTO registerDTO);
    AuthResponse login(LoginDTO loginDTO);
}
