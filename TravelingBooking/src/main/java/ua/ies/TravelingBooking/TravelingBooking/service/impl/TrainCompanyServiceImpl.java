package ua.ies.TravelingBooking.TravelingBooking.service.impl;

import lombok.AllArgsConstructor;
import ua.ies.TravelingBooking.TravelingBooking.entity.TrainCompany;
import ua.ies.TravelingBooking.TravelingBooking.repository.TrainsCompanyRepository;
import ua.ies.TravelingBooking.TravelingBooking.service.TrainCompanyService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TrainCompanyServiceImpl implements TrainCompanyService {
    private TrainsCompanyRepository trainsCompanyRepository;

    @Override
    public TrainCompany createTrainCompany(TrainCompany trainCompany) {
        return trainsCompanyRepository.save(trainCompany);
    }

    @Override
    public TrainCompany getTrainCompanyByTrainCompanyCode(String trainCompanyCode) {
        return trainsCompanyRepository.findByTrainCompanyCode(trainCompanyCode);
    }

    @Override
    public List<TrainCompany> getAllTrainCompanies() {
        return trainsCompanyRepository.findAll();
    }
}