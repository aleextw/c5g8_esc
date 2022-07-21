import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Box, AspectRatio } from "@chakra-ui/react";
import 'leaflet/dist/leaflet.css';

function HotelMap(props) {
  console.log(props.lat);
  console.log(props.long);
  return (
    <Box w="100%" align="center">
      {/** TODO: Fix the anchor linking not working **/}
      <a href="#map">Map</a>
      <AspectRatio ratio={16 / 9} w="70%">
        <MapContainer center={props.pos} zoom={25}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={props.pos}>
            <Popup>{props.name}</Popup>
          </Marker>
        </MapContainer>
      </AspectRatio>
    </Box>
  );
}

export default HotelMap;
