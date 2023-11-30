package ua.ies.TravelingBooking.TravelingBooking.controller;

import lombok.AllArgsConstructor;
import ua.ies.TravelingBooking.TravelingBooking.entity.Airline;
import ua.ies.TravelingBooking.TravelingBooking.entity.Airport;
import ua.ies.TravelingBooking.TravelingBooking.entity.Flight;
import ua.ies.TravelingBooking.TravelingBooking.entity.LoginDTO;
import ua.ies.TravelingBooking.TravelingBooking.entity.User;
import ua.ies.TravelingBooking.TravelingBooking.service.AirlineService;
import ua.ies.TravelingBooking.TravelingBooking.service.AirportService;
import ua.ies.TravelingBooking.TravelingBooking.service.FlightService;
import ua.ies.TravelingBooking.TravelingBooking.service.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5656")
@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class ApiController {

    private AirlineService airlineService;
    private AirportService airportService;
    private FlightService flightService;
    private UserService userService;

    @GetMapping("/airports")
    public ResponseEntity<List<Airport>> getAirports() {
        List<Airport> airports = airportService.getAllAirports();
        return new ResponseEntity<>(airports, HttpStatus.OK);
    }

    @GetMapping("/airlines")
    public ResponseEntity<List<Airline>> getAirlines() {
        List<Airline> airlines = airlineService.getAllAirlines();
        return new ResponseEntity<>(airlines, HttpStatus.OK);
    }

    @GetMapping("/flights")
    public ResponseEntity<List<Flight>> getFlights() {
        List<Flight> flights = flightService.getAllFlights();
        return new ResponseEntity<>(flights, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        User registeredUser = userService.registerUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        
        System.out.println("HERERERE");
        System.out.println(loginDTO.getEmail());
        System.out.println(loginDTO.getPassword());
        
        User user = userService.authenticateUser(loginDTO.getEmail(), loginDTO.getPassword());
        if (user != null) {
            Map<String, Object> response = new HashMap<>();
            response.put("userId", user.getUserID());
            return ResponseEntity.ok().body(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @GetMapping("/flightCheckout/{flightId}")
    public ResponseEntity<Flight> getFlightCheckout(@PathVariable("flightId") String flightId) {
        Flight flight = flightService.getFlight(flightId);
        return new ResponseEntity<>(flight, HttpStatus.OK);
    }
}
