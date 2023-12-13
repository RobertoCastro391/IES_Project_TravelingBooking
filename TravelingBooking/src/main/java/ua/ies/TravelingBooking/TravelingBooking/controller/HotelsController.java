package ua.ies.TravelingBooking.TravelingBooking.controller;

import lombok.AllArgsConstructor;
import ua.ies.TravelingBooking.TravelingBooking.entity.Hotel;
import ua.ies.TravelingBooking.TravelingBooking.repository.HotelsRepository;
import ua.ies.TravelingBooking.TravelingBooking.service.HotelsService;
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
@RequestMapping("/api/hotels")
public class HotelsController {

    private HotelsService hotelsService;

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


    @PostMapping("/searchHotels")
    public ResponseEntity<List<Hotel>> searchHotels(@RequestBody Map<String, String> body) {
        String city = body.get("city");
        String checkIn = body.get("checkIn");
        String checkOut = body.get("checkOut");
        List<Hotel> hotels = hotelsService.searchHotels(city, checkIn, checkOut);
        return new ResponseEntity<>(hotels, HttpStatus.OK);
    }
}
