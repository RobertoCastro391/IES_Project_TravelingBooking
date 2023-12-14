package ua.ies.TravelingBooking.TravelingBooking;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.databind.ObjectMapper;
import ua.ies.TravelingBooking.TravelingBooking.entity.Airport;
import ua.ies.TravelingBooking.TravelingBooking.entity.Airline;
import ua.ies.TravelingBooking.TravelingBooking.entity.Flight;
import ua.ies.TravelingBooking.TravelingBooking.entity.Hotel;
import ua.ies.TravelingBooking.TravelingBooking.entity.Station;
import ua.ies.TravelingBooking.TravelingBooking.entity.Train;
import ua.ies.TravelingBooking.TravelingBooking.entity.TrainCompany;
import ua.ies.TravelingBooking.TravelingBooking.repository.AirportsRepository;
import ua.ies.TravelingBooking.TravelingBooking.repository.AirlinesRepository;
import ua.ies.TravelingBooking.TravelingBooking.repository.FlightsRepository;
import ua.ies.TravelingBooking.TravelingBooking.repository.StationsRepository;
import ua.ies.TravelingBooking.TravelingBooking.repository.TrainsCompanyRepository;
import ua.ies.TravelingBooking.TravelingBooking.repository.TrainsRepository;
import ua.ies.TravelingBooking.TravelingBooking.repository.HotelsRepository;

import java.io.IOException;

@Component
public class KafkaMessageConsumer {

    private final FlightsRepository flightsRepository;
    private final AirportsRepository airportsRepository;
    private final AirlinesRepository airlinesRepository;
    private final StationsRepository stationsRepository;
    private final TrainsCompanyRepository trainCompanyRepository;
    private final TrainsRepository trainsRepository;
    private final HotelsRepository hotelsRepository;


    private final ObjectMapper objectMapper;

    public KafkaMessageConsumer(FlightsRepository flightsRepository, 
                                AirportsRepository airportsRepository,
                                AirlinesRepository airlinesRepository,
                                StationsRepository stationsRepository,
                                TrainsCompanyRepository trainCompanyRepository,
                                TrainsRepository trainsRepository,
                                HotelsRepository hotelsRepository,
                                ObjectMapper objectMapper) {
        this.flightsRepository = flightsRepository;
        this.airportsRepository = airportsRepository;
        this.airlinesRepository = airlinesRepository;
        this.stationsRepository = stationsRepository;
        this.trainCompanyRepository = trainCompanyRepository;
        this.trainsRepository = trainsRepository;
        this.hotelsRepository = hotelsRepository;
        this.objectMapper = objectMapper;
    }

    @KafkaListener(topics = "flighs_data", groupId = "my-consumer-group")
    public void listenFlighs_data(String message) {
        System.out.println("AQUIiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
        System.out.println("Received message Flighs_data: " + message);
        
        try {
            Flight flight = objectMapper.readValue(message, Flight.class);
            flightsRepository.save(flight);
            System.out.println("Saved flight data to database: " + flight);
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("Error processing flight message: " + message);
        }
    }

    @KafkaListener(topics = "airports_topic", groupId = "my-consumer-group")
    public void listenAirportsTopic(String message) {
        try {
            Airport airport = objectMapper.readValue(message, Airport.class);
            if (airport.getAirportCode() == null || airport.getAirportCode().isEmpty()) {
                System.out.println("Received airport data with null or empty ID");
                return;
            }
            airportsRepository.save(airport);
            System.out.println("Saved airport data to database: " + airport);
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("Error processing airport message: " + message);
        }
    }

    @KafkaListener(topics = "airlines_topic", groupId = "my-consumer-group")
    public void listenAirlinesTopic(String message) {
        try {
            Airline airline = objectMapper.readValue(message, Airline.class);
            airlinesRepository.save(airline);
            System.out.println("Saved airline data to database: " + airline);
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("Error processing airline message: " + message);
        }
    }

    @KafkaListener(topics = "station_topic", groupId = "my-consumer-group")
    public void listenStationTopic(String message) {
        try {
            System.out.println(message);
            Station station = objectMapper.readValue(message, Station.class);

            stationsRepository.save(station);

            System.out.println("Received and processed station data: " + station);
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("Error processing station message: " + message);
        }
    }

    @KafkaListener(topics = "train_company_topic", groupId = "my-consumer-group")
    public void listenTrainCompanyTopic(String message) {
        try {
            System.out.println(message);
            TrainCompany trainCompany = objectMapper.readValue(message, TrainCompany.class);

            trainCompanyRepository.save(trainCompany);

            System.out.println("Received and processed train company data: " + trainCompany);
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("Error processing train company message: " + message);
        }
    }

    @KafkaListener(topics = "train_data", groupId = "my-consumer-group")
    public void listenTrainDataTopic(String message) {
        try {
            System.out.println(message);
            Train train = objectMapper.readValue(message, Train.class);
            
            trainsRepository.save(train);

            System.out.println("Received and processed train data: " + train);
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("Error processing train message: " + message);
        }
    }

    @KafkaListener(topics = "hotel_data", groupId = "my-consumer-group")
    public void listenHotelTopic(String message) {
        try {
            System.out.println(message);
            Hotel hotel = objectMapper.readValue(message, Hotel.class);
            
            hotelsRepository.save(hotel);

            System.out.println("Received and processed hotel data: " + hotel);
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("Error processing train message: " + message);
        }
    }
}