import React from "react";
import HotelInfo from "./hotelInfo/HotelInfo";
import HotelMap from "./hotelMap/HotelMap";

const mockData = {
  name: "Shangri-La Hotel",
  address: "22 Grove Road",
  stars: 5,
  rating: 97,
  images: [
    {
      original:
        "https://ak-d.tripcdn.com/images/20020z000000mttx77BD6_R_550_412_R5_Q70_D.jpg",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
      originalWidth: 640,
      originalHeight: 360
    },
    {
      original:
        "https://images.cvent.com/CSN/bf656888-0c30-4f7f-a3f4-e0863f94f226/images/91e89a1a9efc4cee8ee11334a5b6cc3d_LARGE!_!a6086316eb5cc66a3a090e29ed8be8f0.jpg",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
      originalWidth: 640,
      originalHeight: 360
    },
    {
      original:
        "https://res.klook.com/image/upload/fl_lossy.progressive,q_85/w_750/v1638766347/hotel/zg1npoiw89vcdgk3rolb.jpg",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
      originalWidth: 640,
      originalHeight: 360
    }
  ],
  description:
    "Property Location \n A stay at Shangri-La Hotel Singapore places you in the heart of Singapore, minutes from Tanglin Shopping Centre and close to National Orchid Garden. This 5-star hotel is within close proximity of Orchard Tower and Palais Renaissance. \n Rooms \n Make yourself at home in one of the 747 air-conditioned rooms featuring minibars. Complimentary wired and wireless Internet access keeps you connected, and cable programming provides entertainment. Partially open bathrooms with separate bathtubs and showers feature complimentary toiletries and hair dryers. Conveniences include phones, as well as safes and desks. \n Amenities \n Relax at the full-service spa, where you can enjoy massages, body treatments, and facials. You're sure to appreciate the recreational amenities, including outdoor tennis courts, a health club, and an outdoor pool. This hotel also features complimentary wireless Internet access, babysitting/childcare (surcharge), and gift shops/newsstands. If you'd like to spend the day shopping, you can hop on the complimentary shuttle. \n Dining \n Enjoy a meal at one of the hotel's dining establishments, which include 3 restaurants and a coffee shop/café. From your room, you can also access 24-hour room service. Relax with your favorite drink at a bar/lounge or a poolside bar. \n Business, Other Amenities \n Featured amenities include complimentary high-speed (wired) Internet access, a business center, and limo/town car service. Event facilities at this hotel consist of conference space and meeting rooms.",
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
    </div>
  );
}

export default HotelDetails;
