package ua.ies.TravelingBooking.TravelingBooking.service.impl;

import lombok.AllArgsConstructor;
import ua.ies.TravelingBooking.TravelingBooking.entity.Train;
import ua.ies.TravelingBooking.TravelingBooking.repository.TrainsRepository;
import ua.ies.TravelingBooking.TravelingBooking.service.TrainService;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor
public class TrainServiceImpl implements TrainService {
    private TrainsRepository trainsRepository;

    @Override
    public Train createTrain(Train train) {
        return trainsRepository.save(train);
    }

    @Override
    public Train getTrain(String trainNumber) {
        Optional<Train> train = trainsRepository.findById(trainNumber);
        return train.get();
    }

    @Override
    public void deleteTrain(String trainNumber) {
        trainsRepository.deleteById(trainNumber);
    }

    @Override
    public List<Train> getAllTrains() {
        return trainsRepository.findAll();
    }

    @Override
    public List<Train> searchTrains(String stationCodeOrigin, String stationCodeDestination, Date traveldate) {
        System.out.println("searchTrains");

        System.out.println("stationCodeOrigin: " + stationCodeOrigin);
        System.out.println("stationCodeDestination: " + stationCodeDestination);
        System.out.println("date: " + traveldate);

        
        List<Train> trains = trainsRepository.findByStationCodeOriginAndStationCodeDestinationAndTravelDate(
                stationCodeOrigin, stationCodeDestination, traveldate);

        if (trains == null) {
            System.out.println("trains is null");
        } else {
            System.out.println("trains is not null");
            System.out.println(trains);
        }
        
        return trainsRepository.findByStationCodeOriginAndStationCodeDestinationAndTravelDate(
                stationCodeOrigin, stationCodeDestination, traveldate);
    }
} 
