import React from "react";
import HotelInfo from "./hotelInfo/HotelInfo";
import HotelMap from "./hotelMap/HotelMap";
import HotelRooms from "./hotelRooms/HotelRooms";

const mockData = {
  name: "Shangri-La Hotel",
  address: "22 Grove Road",
  stars: 5,
  rating: 97,
  images: [
    {
      original:
        "https://ak-d.tripcdn.com/images/20020z000000mttx77BD6_R_550_412_R5_Q70_D.jpg",
      thumbnail:
        "https://ak-d.tripcdn.com/images/20020z000000mttx77BD6_R_550_412_R5_Q70_D.jpg",
      originalWidth: 640,
      originalHeight: 360
    },
    {
      original:
        "https://images.cvent.com/CSN/bf656888-0c30-4f7f-a3f4-e0863f94f226/images/91e89a1a9efc4cee8ee11334a5b6cc3d_LARGE!_!a6086316eb5cc66a3a090e29ed8be8f0.jpg",
      thumbnail:
        "https://images.cvent.com/CSN/bf656888-0c30-4f7f-a3f4-e0863f94f226/images/91e89a1a9efc4cee8ee11334a5b6cc3d_LARGE!_!a6086316eb5cc66a3a090e29ed8be8f0.jpg",
      originalWidth: 640,
      originalHeight: 360
    },
    {
      original:
        "https://res.klook.com/image/upload/fl_lossy.progressive,q_85/w_750/v1638766347/hotel/zg1npoiw89vcdgk3rolb.jpg",
      thumbnail:
        "https://res.klook.com/image/upload/fl_lossy.progressive,q_85/w_750/v1638766347/hotel/zg1npoiw89vcdgk3rolb.jpg",
      originalWidth: 640,
      originalHeight: 360
    }
  ],
  description: (
    <div>
      <p>
        <b>Property Location</b> <br />
        With a stay at The Fullerton Hotel Singapore, you'll be centrally
        located in Singapore, steps from Cavenagh Bridge and Anderson Bridge.
        This 5-star hotel is close to Chinatown Heritage Center and{" "}
        <b>Universal Studios Singapore</b>®.
      </p>
      <p>
        <b>Rooms</b> <br />
        Make yourself at home in one of the 400 individually furnished
        guestrooms, featuring refrigerators and plasma televisions.
        Complimentary wired and wireless Internet access keeps you connected,
        and satellite programming provides entertainment. Private bathrooms with
        separate bathtubs and showers feature deep soaking bathtubs and
        complimentary toiletries. Conveniences include phones, as well as
        laptop-compatible safes and desks.
      </p>
      <p>
        <b>Amenities</b> <br />
        Pamper yourself with a visit to the spa, which offers massages, body
        treatments, and facials. If you're looking for recreational
        opportunities, you'll find an outdoor pool and a fitness center. This
        Colonial hotel also features complimentary wireless Internet access,
        concierge services, and gift shops/newsstands. Guests can get to nearby
        shops on the complimentary shuttle.
      </p>
      <p>
        <b>Dining</b> <br />
        Grab a bite at one of the hotel's 5 restaurants, or stay in and take
        advantage of 24-hour room service. Quench your thirst with your favorite
        drink at a bar/lounge. Buffet breakfasts are available for a fee.
      </p>
      <p>
        <b>Business, Other Amenities</b> <br />
        Featured amenities include complimentary high-speed (wired) Internet
        access, a 24-hour business center, and limo/town car service. Planning
        an event in Singapore? This hotel has 7524 square feet (699 square
        meters) of space consisting of a conference center and meeting rooms. A
        roundtrip airport shuttle is provided for a surcharge (available 24
        hours), and free self parking is available onsite.
      </p>
    </div>
  ),
  lat: 1.311,
  long: 103.8265
};

function HotelDetails() {
  return (
    <div>
      <HotelInfo
        name={mockData.name}
        address={mockData.address}
        stars={mockData.stars}
        rating={mockData.rating}
        images={mockData.images}
        hotelDescription={mockData.description}
      />
      <br />
      <div>
        <HotelMap
          lat={mockData.lat}
          long={mockData.long}
          name={mockData.name}
        />
      </div>
      <div>
        <HotelRooms />
      </div>
    </div>
  );
}

export default HotelDetails;
