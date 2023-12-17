// package ua.ies.TravelingBooking.TravelingBooking.service.impl;

// import lombok.AllArgsConstructor;
// import ua.ies.TravelingBooking.TravelingBooking.entity.User;
// import ua.ies.TravelingBooking.TravelingBooking.repository.UsersRepository;
// import ua.ies.TravelingBooking.TravelingBooking.service.UserService;

// import org.springframework.stereotype.Service;

// import java.util.List;
// import java.util.Optional;

// @Service
// @AllArgsConstructor
// public class UserServiceImpl implements UserService {
//     private UsersRepository usersRepository;

//     @Override
//     public User registerUser(User user) {
//         return usersRepository.save(user);
//     }

//     @Override
//     public Optional<User> getUser(String email) {
//         return usersRepository.findByEmail(email);
//     }

//     @Override
//     public void deleteUser(User user) {
//         usersRepository.delete(user);
//     }

//     @Override
//     public List<User> getAllUsers() {
//         return usersRepository.findAll();
//     }

//     @Override
//     public User findByUserID(Integer id) {
//         return usersRepository.findByUserID(id);
//     }
    
//     @Override
//     public User authenticateUser(String email, String password) {
//         // Find the user by email
//         Optional<User> user = usersRepository.findByEmail(email);
    
//         System.out.println("USER: " + user);
        
//         if (user != null && password.equals(user.getUserPassword())) {
//             System.out.println("USERR232");
//             return user;
//         } else {
//             return null;
//         }
//     }
// }
