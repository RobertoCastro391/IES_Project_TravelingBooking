package ua.ies.TravelingBooking.TravelingBooking.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import ua.ies.TravelingBooking.TravelingBooking.service.HotelsService;
import ua.ies.TravelingBooking.TravelingBooking.repository.HotelsRepository;
import ua.ies.TravelingBooking.TravelingBooking.entity.Hotel;


@Service
@AllArgsConstructor
public class HotelsServiceImpl implements HotelsService {
    private HotelsRepository hotelsRepository;

    @Override
    public Hotel createHotel(Hotel hotel) {
        return hotelsRepository.save(hotel);
    }

    @Override
    public Hotel getHotelByHotelCode(Integer hotelID) {
        return hotelsRepository.findByHotelID(hotelID);
    }

    @Override
    public java.util.List<Hotel> getAllHotels() {
        return hotelsRepository.findAll();
    }

    @Override
    public java.util.List<Hotel> searchHotels(String city, String checkIn, String checkOut) {
        return hotelsRepository.findByAddressContaining(city);
    }
}