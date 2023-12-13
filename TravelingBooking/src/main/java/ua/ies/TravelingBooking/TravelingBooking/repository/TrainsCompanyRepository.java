package ua.ies.TravelingBooking.TravelingBooking.repository;

import ua.ies.TravelingBooking.TravelingBooking.entity.TrainCompany;
import org.springframework.data.jpa.repository.JpaRepository;


public interface TrainsCompanyRepository extends JpaRepository<TrainCompany, String> {
    TrainCompany findByTrainCompanyCode(String trainCompanyCode);
} 