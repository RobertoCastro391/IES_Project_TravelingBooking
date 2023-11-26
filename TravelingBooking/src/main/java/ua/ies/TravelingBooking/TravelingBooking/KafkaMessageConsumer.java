package ua.ies.TravelingBooking.TravelingBooking;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class KafkaMessageConsumer {

    @KafkaListener(topics = "flighs_data", groupId = "my-consumer-group")
    public void listen(String message) {
        System.out.println("Received message: " + message);
    }
}
