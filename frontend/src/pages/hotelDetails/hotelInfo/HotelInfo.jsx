import React from "react";
import PhotoGallery from "../photoGallery/PhotoGallery";
import StarRatingComponent from "react-star-rating-component";

function HotelInfo(props) {
  return (
    <div className="hotelInfo">
      <h1 className="hotelName">{props.name}</h1>
      <div className="stars">
        <StarRatingComponent
          name=""
          starCount={props.stars}
          editing={false}
          renderStarIcon={() => <span>⭐</span>}
        />
      </div>
      <h5 className="address">{props.address}</h5>
      <div className="ratings">💕{props.rating}/100</div>
      <PhotoGallery images={props.images} />
      <h5>Hotel Overview</h5>
      <div className="hotelDescription"> {props.hotelDescription} </div>
      <h5>Hotel Amenities</h5>
      <div className="hotelAmenities"> ... </div>
    </div>
  );
}

export default HotelInfo;
