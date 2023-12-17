package ua.ies.TravelingBooking.TravelingBooking.controller;

import lombok.AllArgsConstructor;
import ua.ies.TravelingBooking.TravelingBooking.entity.Airline;
import ua.ies.TravelingBooking.TravelingBooking.entity.Airport;
import ua.ies.TravelingBooking.TravelingBooking.entity.Flight;
import ua.ies.TravelingBooking.TravelingBooking.entity.FlightSearchRequest;
import ua.ies.TravelingBooking.TravelingBooking.entity.FlightsReservation;
import ua.ies.TravelingBooking.TravelingBooking.entity.User;
import ua.ies.TravelingBooking.TravelingBooking.repository.UsersRepository;
import ua.ies.TravelingBooking.TravelingBooking.service.AirlineService;
import ua.ies.TravelingBooking.TravelingBooking.service.AirportService;
import ua.ies.TravelingBooking.TravelingBooking.service.FlightService;
import ua.ies.TravelingBooking.TravelingBooking.service.FlightsReservationService;
import ua.ies.TravelingBooking.TravelingBooking.dto.FlightsReservationDTO;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5656")
@RestController
@AllArgsConstructor
@RequestMapping("/api/flights")
public class FlightsController {

    private AirlineService airlineService;
    private AirportService airportService;
    private FlightService flightService;
    private FlightsReservationService reservationService;
    private UsersRepository usersRespository;


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

    @GetMapping("/flightCheckout/{flightId}")
    public ResponseEntity<Flight> getFlightCheckout(@PathVariable("flightId") String flightId) {
        Flight flight = flightService.getFlight(flightId);
        return new ResponseEntity<>(flight, HttpStatus.OK);
    }

    @PostMapping(path = "/searchFlight", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> searchFlights(@RequestBody FlightSearchRequest request) {
        List<Flight> outboundFlights = flightService.searchFlights(
                request.getAirportCodeOrigin(), request.getAirportCodeDestination(), request.getDepartureDate());

        List<Flight> returnFlights = new ArrayList<>();

        if (request.getReturnDate() != null) {
            returnFlights = flightService.searchFlights(
                    request.getAirportCodeDestination(), request.getAirportCodeOrigin(), request.getReturnDate());
        }

        Map<String, Object> response = new HashMap<>();
        response.put("outboundFlights", outboundFlights);

        if (request.getReturnDate() != null) {
            response.put("returnFlights", returnFlights);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/createReservation")
    public ResponseEntity<?> createReservation(@RequestBody FlightsReservationDTO reservationDTO) {
        
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName(); 
        User user = usersRespository.findByUsername(username).orElseThrow();
        
        var reservation = reservationService.createReservation(reservationDTO, user);
        if (reservation == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating reservation");
        }
        else {
            Map<String, Object> response = new HashMap<>();
            response.put("reservationId", reservation.getId());
            return ResponseEntity.ok().body(response);
        }
    }

    @GetMapping("/getAllReservations")
    public ResponseEntity<List<FlightsReservation>> getAllReservations() {
        List<FlightsReservation> reservations = reservationService.getAllReservations();
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }

    @GetMapping("/getReservation/{reservationId}")
    public ResponseEntity<FlightsReservation> getReservation(@PathVariable("reservationId") String reservationId) {
        FlightsReservation reservation = reservationService.getReservation(reservationId);
        return new ResponseEntity<>(reservation, HttpStatus.OK);
    }

    // @GetMapping("/getReservationsByUser/{userId}")
    // public ResponseEntity<List<FlightsReservation>> getReservationsByUser(@PathVariable("userId") String userId) {
    //     List<FlightsReservation> reservations = reservationService.findReservationsByUser(Integer.parseInt(userId));
    //     return new ResponseEntity<>(reservations, HttpStatus.OK);
    // }

    @GetMapping("/getReservationsByUser")
    public ResponseEntity<List<FlightsReservation>> getReservationsByUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName(); 
        User user = usersRespository.findByUsername(username).orElseThrow();

        List<FlightsReservation> reservations = reservationService.findReservationsByUser(user);
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }
}