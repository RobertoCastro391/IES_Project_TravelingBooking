// package ua.ies.TravelingBooking.TravelingBooking;

// import org.springframework.beans.factory.annotation.Autowired;
// import com.fasterxml.jackson.databind.ObjectMapper; // Import Jackson ObjectMapper

// @Component
// public class KafkaMessageConsumer {

//     @Autowired
//     private FlightDataRepository flightDataRepository;

//     @KafkaListener(topics = "flighs_data", groupId = "my-consumer-group")
//     public void listen(String message) {
//         System.out.println("Received message: " + message);
        
//         ObjectMapper mapper = new ObjectMapper();
//         try {
//             FlightData flightData = mapper.readValue(message, FlightData.class);
//             flightDataRepository.save(flightData);
//         } catch (Exception e) {
//             e.printStackTrace();
//         }
//     }

//     @KafkaListener(topics = "flighs_data", groupId = "my-consumer-group")
//     public void listen(String message) {
//         System.out.println("Received message: " + message);
        
//         ObjectMapper mapper = new ObjectMapper();
//         try {
//             FlightData flightData = mapper.readValue(message, FlightData.class);
//             flightDataRepository.save(flightData);
//         } catch (Exception e) {
//             e.printStackTrace();
//         }
//     }

//     @KafkaListener(topics = "flighs_data", groupId = "my-consumer-group")
//     public void listen(String message) {
//         System.out.println("Received message: " + message);
        
//         ObjectMapper mapper = new ObjectMapper();
//         try {
//             FlightData flightData = mapper.readValue(message, FlightData.class);
//             flightDataRepository.save(flightData);
//         } catch (Exception e) {
//             e.printStackTrace();
//         }
//     }
// }


package ua.ies.TravelingBooking.TravelingBooking;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class KafkaMessageConsumer {

    @KafkaListener(topics = "flighs_data", groupId = "my-consumer-group")
    public void listenFlighs_data(String message) {
        System.out.println("Received message Flighs_data: " + message);
    }

    @KafkaListener(topics = "airports_topic", groupId = "my-consumer-group")
    public void listenAirports_topic(String message) {
        System.out.println("Received message Airports_topic: " + message);
    }

    @KafkaListener(topics = "airlines_topic", groupId = "my-consumer-group")
    public void listenAirlines_topic(String message) {
        System.out.println("Received message Airlines_topic: " + message);
    }
}