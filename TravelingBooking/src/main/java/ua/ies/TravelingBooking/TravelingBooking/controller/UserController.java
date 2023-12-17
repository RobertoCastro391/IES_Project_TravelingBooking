package ua.ies.TravelingBooking.TravelingBooking.controller;

import lombok.AllArgsConstructor;
import ua.ies.TravelingBooking.TravelingBooking.entity.User;
import ua.ies.TravelingBooking.TravelingBooking.repository.UsersRepository;
import ua.ies.TravelingBooking.TravelingBooking.service.AuthService;
import org.springframework.security.core.Authentication;
import ua.ies.TravelingBooking.TravelingBooking.dto.AuthResponse;
import ua.ies.TravelingBooking.TravelingBooking.dto.LoginDTO;
import ua.ies.TravelingBooking.TravelingBooking.dto.RegisterDTO;
import ua.ies.TravelingBooking.TravelingBooking.dto.UserInfoDTO;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5656")
@RestController
@AllArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private AuthService authService;
    private UsersRepository usersRespository;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterDTO registerDTO) {
        return ResponseEntity.ok(authService.register(registerDTO));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginDTO loginDTO) {
        return ResponseEntity.ok(authService.login(loginDTO));
    }

    @GetMapping("/userinfo")
    public ResponseEntity<UserInfoDTO> getUserInfo() {
        
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName(); 
        System.out.println("username: " + username);

        User user = usersRespository.findByUsername(username).orElseThrow();
       
        UserInfoDTO userInfo = new UserInfoDTO(); 
        userInfo.setName(user.getFirstName());
        userInfo.setSurname(user.getLastName());
        userInfo.setEmail(user.getUsername());
        userInfo.setAddress(user.getStreetAddress());
        userInfo.setPostalCode(user.getPostalCode());
        userInfo.setCity(user.getCity());
        return new ResponseEntity<>(userInfo, HttpStatus.OK);
    }
}