package ua.ies.TravelingBooking.TravelingBooking.controller;

import lombok.AllArgsConstructor;
import ua.ies.TravelingBooking.TravelingBooking.entity.Museum;
import ua.ies.TravelingBooking.TravelingBooking.repository.MuseumsRepository;
import ua.ies.TravelingBooking.TravelingBooking.service.MuseumService;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:5656")
@RestController
@AllArgsConstructor
@RequestMapping("/api/museums")
public class MuseumsController {
    
    private MuseumService museumsService;

    @GetMapping("/museums")
    public ResponseEntity<List<String>> getTop12MuseumLocations(){
        List<String> top10Locations = museumsService.findTop12MuseumLocations();
        return new ResponseEntity<>(top10Locations, HttpStatus.OK);

    }


    @GetMapping("/museumscity/{museumLocation}")
    public ResponseEntity<List<Museum>> searchMuseum(@PathVariable("museumLocation") String museumLocation){
        List<Museum> cityMuseums = museumsService.getAllCityMuseums(museumLocation);
        return new ResponseEntity<>(cityMuseums, HttpStatus.OK);
    }

    //name or id?
    @GetMapping("/museumscitydetails/{museumID}")
    public ResponseEntity<Museum> getDetails(@PathVariable("museumID") int museumID){
        Museum museumInfo = museumsService.getMuseum(museumID);
        return new ResponseEntity<>(museumInfo, HttpStatus.OK);
    }

}
