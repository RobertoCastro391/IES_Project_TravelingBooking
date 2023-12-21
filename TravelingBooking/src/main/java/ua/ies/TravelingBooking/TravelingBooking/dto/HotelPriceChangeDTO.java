package ua.ies.TravelingBooking.TravelingBooking.dto;

public class HotelPriceChangeDTO {
    private String hotelName;
    private Integer price;

    public String getHotelName() {
        return hotelName;
    }

    public void setHotelName(String hotelName) {
        this.hotelName = hotelName;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }
}
