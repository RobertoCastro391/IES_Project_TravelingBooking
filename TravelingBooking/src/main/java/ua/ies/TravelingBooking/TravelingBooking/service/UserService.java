package ua.ies.TravelingBooking.TravelingBooking.service;

import java.util.List;

import ua.ies.TravelingBooking.TravelingBooking.entity.User;

public interface UserService {
    User registerUser(User user);
    User getUser(String email);
    void deleteUser(User user);
    List<User> getAllUsers();
    User authenticateUser(String email, String password);
}
