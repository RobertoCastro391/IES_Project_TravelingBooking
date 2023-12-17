package ua.ies.TravelingBooking.TravelingBooking.controller;

import lombok.AllArgsConstructor;
import ua.ies.TravelingBooking.TravelingBooking.entity.TrainCompany;
import ua.ies.TravelingBooking.TravelingBooking.dto.TrainsReservationDTO;
import ua.ies.TravelingBooking.TravelingBooking.entity.TrainsReservation;
import ua.ies.TravelingBooking.TravelingBooking.entity.User;
import ua.ies.TravelingBooking.TravelingBooking.repository.UsersRepository;
import ua.ies.TravelingBooking.TravelingBooking.entity.Station;
import ua.ies.TravelingBooking.TravelingBooking.entity.Train;
import ua.ies.TravelingBooking.TravelingBooking.entity.TrainSearchRequest;
import ua.ies.TravelingBooking.TravelingBooking.service.TrainCompanyService;
import ua.ies.TravelingBooking.TravelingBooking.service.TrainsReservationService;
import ua.ies.TravelingBooking.TravelingBooking.service.StationService;
import ua.ies.TravelingBooking.TravelingBooking.service.TrainService;

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
@RequestMapping("/api/trains")
public class TrainsController {
    
    private TrainCompanyService trainCompanyService;
    private StationService stationService;
    private TrainService trainService;
    private TrainsReservationService reservationService;
    private UsersRepository usersRespository;


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

    @PostMapping("/createReservation")
    public ResponseEntity<?> createReservation(@RequestBody TrainsReservationDTO reservationDTO) {
        
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

    @GetMapping("/getAllReservations")
    public ResponseEntity<List<TrainsReservation>> getAllReservations() {
        List<TrainsReservation> reservations = reservationService.getAllReservations();
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }

    @GetMapping("/getReservation/{reservationId}")
    public ResponseEntity<TrainsReservation> getReservation(@PathVariable("reservationId") String reservationId) {
        TrainsReservation reservation = reservationService.getReservation(reservationId);
        return new ResponseEntity<>(reservation, HttpStatus.OK);
    }

    // @GetMapping("/getReservationsByUser/{userId}")
    // public ResponseEntity<List<TrainsReservation>> getReservationsByUser(@PathVariable("userId") String userId) {
    //     List<TrainsReservation> reservations = reservationService.findReservationsByUser(Integer.parseInt(userId));
    //     return new ResponseEntity<>(reservations, HttpStatus.OK);
    // }

    @GetMapping("/getReservationsByUser")
    public ResponseEntity<List<TrainsReservation>> getReservationsByUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName(); 
        User user = usersRespository.findByUsername(username).orElseThrow();

        List<TrainsReservation> reservations = reservationService.findReservationsByUser(user);
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }
}