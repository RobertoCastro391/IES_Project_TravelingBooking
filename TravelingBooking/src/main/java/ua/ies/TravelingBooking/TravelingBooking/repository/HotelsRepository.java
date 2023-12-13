package ua.ies.TravelingBooking.TravelingBooking.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.ies.TravelingBooking.TravelingBooking.entity.Hotel;


public interface HotelsRepository extends JpaRepository<Hotel, Integer> {
    Hotel findByHotelID(int hotelID);
    List<Hotel> findByAddressContaining(String address);
}
