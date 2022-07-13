import React, { useState } from "react";
import RoomInfoPopup from "./RoomInfoPopup";
import "./HotelRooms.scss";
import "../hotelInfo/photoGallery/PhotoGallery";
import PhotoGallery from "../hotelInfo/photoGallery/PhotoGallery";

function HotelRooms() {
  const mockHotelsData = {
    name:
      "Taste the Good Life Package - Premier Courtyard Room (incl $200 SGD dining credit)",
    description: (
      <div>
        <p>
          <strong>1 King Bed</strong>
        </p>
        <p>452-sq-foot room with courtyard views </p>
        <br />
        <p>
          <b>Entertainment</b> - 55-inch LCD TV with satellite channels
        </p>
        <br />
        <p>
          <b>Food & Drink</b> - Coffee/tea maker, minibar, room service (limited
          hours), and free bottled water
        </p>
        <br />
        <p>
          <b>Sleep</b> - Premium bedding, a pillow menu, blackout
          drapes/curtains, turndown service, and bed sheets{" "}
        </p>
        <br />
        <p>
          <b>Bathroom</b> - Private bathroom, deep soaking bathtub and separate
          shower
        </p>
        <br />
        <p>
          <b>Practical</b> - Laptop-compatible safe, laptop workspace, and
          phone; rollaway/extra beds and free cribs/infant beds available on
          request
        </p>
        <br />
        <p>
          <b>Comfort</b> - Air conditioning and daily housekeeping
        </p>
        <br />
        <p>Non-Smoking</p>
      </div>
    ),
    price: 638.03,
    images: [
      {
        original:
          "https://i.travelapi.com/hotels/1000000/900000/893000/892940/2d887f28_z.jpg",
        thumbnail:
          "https://i.travelapi.com/hotels/1000000/900000/893000/892940/2d887f28_b.jpg",
        originalWidth: 450,
        originalHeight: 300
      },
      {
        original:
          "https://i.travelapi.com/hotels/1000000/900000/893000/892940/d01e59fd_z.jpg",
        thumbnail:
          "https://i.travelapi.com/hotels/1000000/900000/893000/892940/d01e59fd_b.jpg",
        originalWidth: 450,
        originalHeight: 300
      },
      {
        original:
          "https://i.travelapi.com/hotels/1000000/900000/893000/892940/8eb83651_z.jpg",
        thumbnail:
          "https://i.travelapi.com/hotels/1000000/900000/893000/892940/8eb83651_b.jpg",
        originalWidth: 450,
        originalHeight: 300
      }
    ]
  };
  return (
    <div className="wrapper">
      <Card
        images={mockHotelsData.images}
        title={mockHotelsData.name}
        description={mockHotelsData.description}
        price={mockHotelsData.price}
      />
      <Card
        images={mockHotelsData.images}
        title={mockHotelsData.name}
        description={mockHotelsData.description}
        price={mockHotelsData.price}
      />
      <Card
        images={mockHotelsData.images}
        title={mockHotelsData.name}
        description={mockHotelsData.description}
        price={mockHotelsData.price}
      />
    </div>
  );
}

function Card(props) {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="card">
      <div>
        <PhotoGallery images={props.images} className="card__img" />
      </div>
      <div className="card__body">
        <h2 className="card__title" onClick={togglePopup}>
          {props.title}
        </h2>
        <p className="card__description">{props.description}</p>
        <h3 className="card__price">{props.price}</h3>
        <button className="card__btn">Book Now</button>
      </div>
      {isOpen && (
        <RoomInfoPopup
          content={<>{props.description}</>}
          handleClose={togglePopup}
        />
      )}
    </div>
  );
}

export default HotelRooms;
