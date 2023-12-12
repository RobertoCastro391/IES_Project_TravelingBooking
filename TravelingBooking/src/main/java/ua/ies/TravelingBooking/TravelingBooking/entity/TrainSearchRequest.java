package ua.ies.TravelingBooking.TravelingBooking.entity;

import java.util.Date;

public class TrainSearchRequest {
    private String stationCodeOrigin;
    private String stationCodeDestination;
    private Date departureDate;
    private Date returnDate;
    
    public String getStationCodeOrigin() {
        return stationCodeOrigin;
    }
    public void setStationCodeOrigin(String stationCodeOrigin) {
        this.stationCodeOrigin = stationCodeOrigin;
    }
    public String getStationCodeDestination() {
        return stationCodeDestination;
    }
    public void setStationCodeDestination(String stationCodeDestination) {
        this.stationCodeDestination = stationCodeDestination;
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
