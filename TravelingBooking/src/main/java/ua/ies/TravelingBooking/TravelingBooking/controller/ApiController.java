package ua.ies.TravelingBooking.TravelingBooking.controller;

import lombok.AllArgsConstructor;
import ua.ies.TravelingBooking.TravelingBooking.entity.Airline;
import ua.ies.TravelingBooking.TravelingBooking.entity.Airport;
import ua.ies.TravelingBooking.TravelingBooking.entity.Flight;
import ua.ies.TravelingBooking.TravelingBooking.entity.TrainCompany;
import ua.ies.TravelingBooking.TravelingBooking.entity.Station;
import ua.ies.TravelingBooking.TravelingBooking.entity.Train;
import ua.ies.TravelingBooking.TravelingBooking.entity.FlightSearchRequest;
import ua.ies.TravelingBooking.TravelingBooking.entity.FlightsReservation;
import ua.ies.TravelingBooking.TravelingBooking.entity.TrainSearchRequest;
import ua.ies.TravelingBooking.TravelingBooking.entity.User;
import ua.ies.TravelingBooking.TravelingBooking.service.AirlineService;
import ua.ies.TravelingBooking.TravelingBooking.service.AirportService;
import ua.ies.TravelingBooking.TravelingBooking.service.FlightService;
import ua.ies.TravelingBooking.TravelingBooking.service.TrainCompanyService;
import ua.ies.TravelingBooking.TravelingBooking.service.StationService;
import ua.ies.TravelingBooking.TravelingBooking.service.TrainService;
import ua.ies.TravelingBooking.TravelingBooking.service.UserService;
import ua.ies.TravelingBooking.TravelingBooking.dto.FlightsReservationDTO;
import ua.ies.TravelingBooking.TravelingBooking.dto.LoginDTO;
import ua.ies.TravelingBooking.TravelingBooking.service.ReservationService;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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
    private ReservationService reservationService;
    private TrainCompanyService trainCompanyService;
    private StationService stationService;
    private TrainService trainService;

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

    @GetMapping("/stations")
    public ResponseEntity<List<Station>> getStations() {
        List<Station> stations = stationService.getAllStations();
        return new ResponseEntity<>(stations, HttpStatus.OK);
    }

    @GetMapping("/trainCompanies")
    public ResponseEntity<List<TrainCompany>> getTrainCompanies() {
        List<TrainCompany> trainCompanies = trainCompanyService.getAllTrainCompanies();
        return new ResponseEntity<>(trainCompanies, HttpStatus.OK);
    }

    @GetMapping("/trains")
    public ResponseEntity<List<Train>> getTrains() {
        List<Train> trains = trainService.getAllTrains();
        return new ResponseEntity<>(trains, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        User registeredUser = userService.registerUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
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
        var reservation = reservationService.createReservation(reservationDTO);
        if (reservation == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating reservation");
        }
        else {
            Map<String, Object> response = new HashMap<>();
            response.put("reservationId", reservation.getId());
            return ResponseEntity.ok().body(response);
        }
    }
    

    @GetMapping("/users/{userId}")
    public ResponseEntity<User> getUser(@PathVariable("userId") String userId) {
        User user = userService.findByUserID(Integer.parseInt(userId));
        return new ResponseEntity<>(user, HttpStatus.OK);
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

    @GetMapping("/getReservationsByUser/{userId}")
    public ResponseEntity<List<FlightsReservation>> getReservationsByUser(@PathVariable("userId") String userId) {
        List<FlightsReservation> reservations = reservationService.findReservationsByUser(Integer.parseInt(userId));
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }

    @GetMapping("/trainCheckout/{trainId}")
    public ResponseEntity<Train> getTrainCheckout(@PathVariable("trainId") String trainId) {
        Train train = trainService.getTrain(trainId);
        return new ResponseEntity<>(train, HttpStatus.OK);
    }

    @PostMapping(path = "/searchTrain", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> searchTrains(@RequestBody TrainSearchRequest request) {
        List<Train> outboundTrains = trainService.searchTrains(
                request.getStationCodeOrigin(), request.getStationCodeDestination(), request.getDepartureDate());

        List<Train> returnTrains = new ArrayList<>();

        if (request.getReturnDate() != null) {
            returnTrains = trainService.searchTrains(
                    request.getStationCodeDestination(), request.getStationCodeOrigin(), request.getReturnDate());
        }

        Map<String, Object> response = new HashMap<>();
        response.put("outboundTrains", outboundTrains);

        if (request.getReturnDate() != null) {
            response.put("returnTrains", returnTrains);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}