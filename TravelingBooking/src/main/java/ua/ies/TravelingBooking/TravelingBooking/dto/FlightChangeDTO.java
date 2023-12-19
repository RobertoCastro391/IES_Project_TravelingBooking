package ua.ies.TravelingBooking.TravelingBooking.dto;

import java.util.Date;

public class FlightChangeDTO {
    private String flightNumber;
    private String newState;
    private String newDepartureHour;
    private String newArrivalHour;

    public String getFlightNumber() {
        return flightNumber;
    }

    public void setFlightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
    }

    public String getNewState() {
        return newState;
    }

    public void setNewState(String newState) {
        this.newState = newState;
    }

    public String getNewDepartureHour() {
        return newDepartureHour;
    }

    public void setNewDepartureHour(String newDepartureHour) {
        this.newDepartureHour = newDepartureHour;
    }

    public String getNewArrivalHour() {
        return newArrivalHour;
    }

    public void setNewArrivalHour(String newArrivalHour) {
        this.newArrivalHour = newArrivalHour;
    }

}
