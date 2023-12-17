package ua.ies.TravelingBooking.TravelingBooking.controller;

import lombok.AllArgsConstructor;
import ua.ies.TravelingBooking.TravelingBooking.dto.HotelReservationDTO;
import ua.ies.TravelingBooking.TravelingBooking.entity.Hotel;
import ua.ies.TravelingBooking.TravelingBooking.entity.HotelReservation;
import ua.ies.TravelingBooking.TravelingBooking.entity.TrainsReservation;
import ua.ies.TravelingBooking.TravelingBooking.entity.User;
import ua.ies.TravelingBooking.TravelingBooking.repository.HotelsReservationRepository;
import ua.ies.TravelingBooking.TravelingBooking.repository.UsersRepository;
import ua.ies.TravelingBooking.TravelingBooking.service.HotelsService;
import ua.ies.TravelingBooking.TravelingBooking.service.HotelsReservationService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5656")
@RestController
@AllArgsConstructor
@RequestMapping("/api/hotels")
public class HotelsController {

    private HotelsService hotelsService;
    private HotelsReservationService reservationService;
    private HotelsReservationRepository hotelsRepository;
    private UsersRepository usersRespository;

    @GetMapping("/getAllHotels")
    public ResponseEntity<List<Hotel>> getAllHotels() {
        List<Hotel> hotels = hotelsService.getAllHotels();
        return new ResponseEntity<>(hotels, HttpStatus.OK);
    }

    @GetMapping("/getHotelByHotelCode/{hotelCode}")
    public ResponseEntity<Hotel> getHotelByHotelCode(@PathVariable("hotelCode") Integer hotelCode) {
        Hotel hotel = hotelsService.getHotelByHotelCode(hotelCode);
        return new ResponseEntity<>(hotel, HttpStatus.OK);
    }

    // @GetMapping("/getReservationsByUser/{userId}")
    // public ResponseEntity<List<HotelReservation>> getReservationsByUser(@PathVariable("userId") String userId) {
    //     List<HotelReservation> reservations = reservationService.findReservationsByUser(Integer.parseInt(userId));
    //     return new ResponseEntity<>(reservations, HttpStatus.OK);
    // }

    @GetMapping("/getReservationsByUser")
    public ResponseEntity<List<HotelReservation>> getReservationsByUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName(); 
        User user = usersRespository.findByUsername(username).orElseThrow();

        List<HotelReservation> reservations = reservationService.findReservationsByUser(user);
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }

    @GetMapping("/getAllReservations")
    public ResponseEntity<List<HotelReservation>> getAllReservations() {
        List<HotelReservation> reservations = hotelsRepository.findAll();
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }


    @PostMapping("/searchHotels")
    public ResponseEntity<List<Hotel>> searchHotels(@RequestBody Map<String, String> body) {
        String city = body.get("city");
        String checkIn = body.get("checkIn");
        String checkOut = body.get("checkOut");
        List<Hotel> hotels = hotelsService.searchHotels(city, checkIn, checkOut);
        return new ResponseEntity<>(hotels, HttpStatus.OK);
    }

    @PostMapping("/createReservation")
    public ResponseEntity<?> createReservation(@RequestBody HotelReservationDTO reservationDTO) {
        
        System.out.println("AQUIIiiiiiinicla");
        System.out.println(reservationDTO.getHotelId());
        System.out.println(reservationDTO.getPassengers().get(0).getFirstName());
        System.out.println(reservationDTO.getPassengers().get(0).getLastName());
        System.out.println(reservationDTO.getPassengers().get(0).getNationality());

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName(); 
        User user = usersRespository.findByUsername(username).orElseThrow();
        
        
        var reservation = reservationService.createReservation(reservationDTO, user);
        if (reservation == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating reservation");
        }
        else {
            
            System.out.println("AQUIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII");
            System.out.println("okkk");
            Map<String, Object> response = new HashMap<>();
            response.put("reservationId", reservation.getId());
            return ResponseEntity.ok().body(response);
        }
    }

}
