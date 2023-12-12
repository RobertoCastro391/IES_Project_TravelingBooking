package ua.ies.TravelingBooking.TravelingBooking.entity;

import java.util.Date;

public class FlightSearchRequest {
    private String airportCodeOrigin;
    private String airportCodeDestination;
    private Date departureDate;
    private Date returnDate;
    
    public String getAirportCodeOrigin() {
        return airportCodeOrigin;
    }
    public void setAirportCodeOrigin(String airportCodeOrigin) {
        this.airportCodeOrigin = airportCodeOrigin;
    }
    public String getAirportCodeDestination() {
        return airportCodeDestination;
    }
    public void setAirportCodeDestination(String airportCodeDestination) {
        this.airportCodeDestination = airportCodeDestination;
    }
    public Date getDepartureDate() {
        return departureDate;
    }
    public void setDepartureDate(Date departureDate) {
        this.departureDate = departureDate;
    }
    public Date getReturnDate() {
        return returnDate;
    }
    public void setReturnDate(Date returnDate) {
        this.returnDate = returnDate;
    }
}