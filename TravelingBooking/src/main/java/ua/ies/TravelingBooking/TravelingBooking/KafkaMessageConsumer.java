// package ua.ies.TravelingBooking.TravelingBooking;

// import org.springframework.kafka.annotation.KafkaListener;
// import org.springframework.stereotype.Component;


// @Component
// public class KafkaMessageConsumer {

//     @KafkaListener(topics = "flighs_data", groupId = "my-consumer-group")
//     public void listenFlighs_data(String message) {
//         System.out.println("Received message Flighs_data: " + message);
//     }

//     @KafkaListener(topics = "airports_topic", groupId = "my-consumer-group")
//     public void listenAirports_topic(String message) {
//         System.out.println("Received message Airports_topic: " + message);
//     }

//     @KafkaListener(topics = "airlines_topic", groupId = "my-consumer-group")
//     public void listenAirlines_topic(String message) {
//         System.out.println("Received message Airlines_topic: " + message);
//     }
// }

package ua.ies.TravelingBooking.TravelingBooking;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.databind.ObjectMapper;
import ua.ies.TravelingBooking.TravelingBooking.entity.Airport;
import ua.ies.TravelingBooking.TravelingBooking.entity.Airline;
import ua.ies.TravelingBooking.TravelingBooking.entity.Flight;
import ua.ies.TravelingBooking.TravelingBooking.repository.AirportsRepository;
import ua.ies.TravelingBooking.TravelingBooking.repository.AirlinesRepository;
import ua.ies.TravelingBooking.TravelingBooking.repository.FlightsRepository;

import java.io.IOException;
import java.text.SimpleDateFormat;

@Component
public class KafkaMessageConsumer {

    // private final FlightsRepository flightsRepository;
    private final AirportsRepository airportsRepository;
    private final AirlinesRepository airlinesRepository;
    private final ObjectMapper objectMapper;

    // Constructor
    // public KafkaMessageConsumer(FlightsRepository flightsRepository, 
    //                             AirportsRepository airportsRepository,
    //                             AirlinesRepository airlinesRepository,
    //                             ObjectMapper objectMapper) {
    //     this.flightsRepository = flightsRepository;
    //     this.airportsRepository = airportsRepository;
    //     this.airlinesRepository = airlinesRepository;
    //     this.objectMapper = objectMapper;
    // }

    public KafkaMessageConsumer(AirportsRepository airportsRepository,
                                AirlinesRepository airlinesRepository,
                                ObjectMapper objectMapper) {
        this.airportsRepository = airportsRepository;
        this.airlinesRepository = airlinesRepository;
        this.objectMapper = objectMapper;
    }

    // Listener for airport data
    @KafkaListener(topics = "airports_topic", groupId = "my-consumer-group")
    public void listenAirportsTopic(String message) {
        try {
            Airport airport = objectMapper.readValue(message, Airport.class);
            
            
            System.out.println("Received airport data: " + airport);
            System.out.println("Received airport data code: " + airport.getAirportCode());
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

    // Listener for airline data
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
}
