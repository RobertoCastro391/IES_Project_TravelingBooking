package ua.ies.TravelingBooking.TravelingBooking.service.impl;

import lombok.AllArgsConstructor;
import ua.ies.TravelingBooking.TravelingBooking.entity.Museum;
import ua.ies.TravelingBooking.TravelingBooking.repository.MuseumsRepository;
import ua.ies.TravelingBooking.TravelingBooking.service.MuseumService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class MuseumServiceImpl implements MuseumService {
    private MuseumsRepository museumsRepository;

    @Override
    public Museum createMuseum(Museum museum) {
        return museumsRepository.save(museum);
    }

    @Override
    public Museum getMuseum(int museumID) {
        Museum museum = museumsRepository.findById(museumID);
        return museum;
    }

    @Override
    public List<Museum> getAllCityMuseums(String museumLocation) {
        return museumsRepository.findByLocation(museumLocation);
    }

    @Override
    public List<String> findTop12MuseumLocations() {

        List<String> topMuseums = new ArrayList<>();

        List<Museum> museums = museumsRepository.findAll();

        if (museums == null) {
            System.out.println("museums is null");
        } else {
            System.out.println("museums is not null");
            System.out.println(museums);

            for (int i = 0; i < 12; i++) {
                topMuseums.add(museums.get(i).getMuseumLocation());
            }
        }

        return topMuseums;
    }
}
