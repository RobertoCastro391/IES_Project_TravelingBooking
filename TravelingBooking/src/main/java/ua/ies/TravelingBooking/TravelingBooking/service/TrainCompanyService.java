package ua.ies.TravelingBooking.TravelingBooking.service;

import java.util.List;

import ua.ies.TravelingBooking.TravelingBooking.entity.TrainCompany;

public interface TrainCompanyService {
    TrainCompany createTrainCompany(TrainCompany trainCompany);
    TrainCompany getTrainCompanyByTrainCompanyCode(String trainCompanyCode);
    List<TrainCompany> getAllTrainCompanies();
}
