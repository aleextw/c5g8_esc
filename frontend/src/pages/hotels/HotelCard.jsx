import React from "react";
import { WithContext as ReactTags } from "react-tag-input";
import './hotelcard-styles.scss';

function HotelCard(props) {
  return (
    <div className="card">
      <div className="card-body">
        <img src={props.img} className="card-image" alt={props.name} />
        <h2 className="card-title"> {props.name} </h2>
        <ReactTags tags={props.tags} readOnly={true} className="tags" />
        <br />
        <h3 className="card-description">{props.rating}/100</h3>
        <br />
        <p className="card-description">{props.score}</p>
        <br />
        <p className="card-description">{props.address}</p>
      </div>
      <h3 className="card-price"> $ {props.price} per room per night</h3>
      <button className="card-btn">Choose Rooms</button>
    </div>
  );
}

export default HotelCard;
