package ua.ies.TravelingBooking.TravelingBooking.service;

import java.util.Date;
import java.util.List;

import ua.ies.TravelingBooking.TravelingBooking.entity.Train;

public interface TrainService {
    Train createTrain(Train train);
    Train getTrain(String trainNumber);
    void deleteTrain(String trainNumber);
    List<Train> getAllTrains();
    List<Train> searchTrains(String stationCodeOrigin, String stationCodeDestination, Date traveldate);
}
