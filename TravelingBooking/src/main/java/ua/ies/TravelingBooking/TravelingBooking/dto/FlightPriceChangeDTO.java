package ua.ies.TravelingBooking.TravelingBooking.dto;

public class FlightPriceChangeDTO {
    private String flightNumber;
    private Integer price;

    public String getFlightNumber() {
        return flightNumber;
    }

    public void setFlightNumber(String flightNumber) {
        this.flightNumber = flightNumber;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }
}
