package ua.ies.TravelingBooking.TravelingBooking.service.impl;

import lombok.AllArgsConstructor;
import ua.ies.TravelingBooking.TravelingBooking.entity.User;
import ua.ies.TravelingBooking.TravelingBooking.repository.UsersRepository;
import ua.ies.TravelingBooking.TravelingBooking.service.UserService;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private UsersRepository usersRepository;

    @Override
    public User registerUser(User user) {
        return usersRepository.save(user);
    }

    @Override
    public User getUser(String email) {
        return usersRepository.findByEmail(email);
    }

    @Override
    public void deleteUser(User user) {
        usersRepository.delete(user);
    }

    @Override
    public List<User> getAllUsers() {
        return usersRepository.findAll();
    }
}
