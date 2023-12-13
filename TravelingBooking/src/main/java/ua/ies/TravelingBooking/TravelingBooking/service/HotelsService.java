package ua.ies.TravelingBooking.TravelingBooking.service;
import ua.ies.TravelingBooking.TravelingBooking.entity.Hotel;
import java.util.List;

public interface HotelsService {
    Hotel createHotel(Hotel hotel);
    Hotel getHotelByHotelCode(Integer hotelID);
    List<Hotel> getAllHotels();
    List<Hotel> searchHotels(String city, String checkIn, String checkOut);
}
