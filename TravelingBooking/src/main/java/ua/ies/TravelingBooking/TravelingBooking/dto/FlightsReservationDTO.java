package ua.ies.TravelingBooking.TravelingBooking.dto;

import java.util.Date;
import java.util.List;

public class FlightsReservationDTO {
    private int userID;
    private String flightNumberOutbound;
    private String flightNumberInbound;
    private boolean roundTrip;
    private double totalPrice;
    private Date reservationDate;
    private List<PassengerDTO> passengers;

    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public String getFlightNumberOutbound() {
        return flightNumberOutbound;
    }

    public void setFlightNumberOutbound(String flightNumberOutbound) {
        this.flightNumberOutbound = flightNumberOutbound;
    }

    public String getFlightNumberInbound() {
        return flightNumberInbound;
    }

    public void setFlightNumberInbound(String flightNumberInbound) {
        this.flightNumberInbound = flightNumberInbound;
    }

    public boolean getRoundTrip() {
        return roundTrip;
    }

    public void setRoundTrip(boolean roundTrip) {
        this.roundTrip = roundTrip;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalprice) {
        this.totalPrice = totalprice;
    }

    public Date getReservationDate() {
        return reservationDate;
    }

    public void setReservationDate(Date reservationDate) {
        this.reservationDate = reservationDate;
    }

    public List<PassengerDTO> getPassengers() {
        return passengers;
    }

    public void setPassengers(List<PassengerDTO> passengers) {
        this.passengers = passengers;
    }

}