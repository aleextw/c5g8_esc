import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "./hotelMap.css";

function HotelMap(props) {
  return (
    <MapContainer center={[props.lat, props.long]} zoom={25}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[props.lat, props.long]}>
        <Popup>{props.name}</Popup>
      </Marker>
    </MapContainer>
  );
}

export default HotelMap;
