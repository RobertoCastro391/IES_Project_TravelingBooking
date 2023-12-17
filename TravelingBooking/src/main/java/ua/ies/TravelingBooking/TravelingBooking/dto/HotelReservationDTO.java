package ua.ies.TravelingBooking.TravelingBooking.dto;

import java.util.Date;
import java.util.List;

public class HotelReservationDTO {
    private int hotelid;
    private double totalPrice;
    private Date reservationDate;
    private List<PassengerDTO> passengers;
    private String emailContact;
    private String phoneContact;
    private String nameCard;
    private String numberCard;
    private String expirationDateCard;
    private String cvvCard;
    private String addressCard1;
    private String addressCard2;
    private String cityCard;
    private String zipCodeCard;
    private String countryCard;

    public int getHotelId() {
        return hotelid;
    }

    public void setHotelId(Integer hotelid) {
        this.hotelid = hotelid;
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

    public String getEmailContact() {
        return emailContact;
    }

    public void setEmailContact(String emailcontact) {
        this.emailContact = emailcontact;
    }

    public String getPhoneContact() {
        return phoneContact;
    }

    public void setPhoneContact(String phonecontact) {
        this.phoneContact = phonecontact;
    }

    public String getNameCard() {
        return nameCard;
    }

    public void setNameCard(String namecard) {
        this.nameCard = namecard;
    }

    public String getNumberCard() {
        return numberCard;
    }

    public void setNumberCard(String numbercard) {
        this.numberCard = numbercard;
    }   

    public String getExpirationDateCard() {
        return expirationDateCard;
    }

    public void setExpirationDateCard(String expirationdatecard) {
        this.expirationDateCard = expirationdatecard;
    }

    public String getCvvCard() {
        return cvvCard;
    }

    public void setCvvCard(String cvvcard) {
        this.cvvCard = cvvcard;
    }

    public String getAddressCard1() {
        return addressCard1;
    }

    public void setAddressCard1(String addresscard1) {
        this.addressCard1 = addresscard1;
    }

    public String getAddressCard2() {
        return addressCard2;
    }

    public void setAddressCard2(String addresscard2) {
        this.addressCard2 = addresscard2;
    }

    public String getCityCard() {
        return cityCard;
    }

    public void setCityCard(String citycard) {
        this.cityCard = citycard;
    }

    public String getZipCodeCard() {
        return zipCodeCard;
    }

    public void setZipCodeCard(String zipcodecard) {
        this.zipCodeCard = zipcodecard;
    }

    public String getCountryCard() {
        return countryCard;
    }

    public void setCountryCard(String countrycard) {
        this.countryCard = countrycard;
    }
}
