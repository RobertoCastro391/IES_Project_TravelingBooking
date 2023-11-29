package ua.ies.TravelingBooking.TravelingBooking.repository;

import ua.ies.TravelingBooking.TravelingBooking.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UsersRepository extends JpaRepository<User, Long> {
    User findByUserID(Integer id);
    User findByEmail(String email);
} 