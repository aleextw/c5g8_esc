import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Box, AspectRatio, Heading } from "@chakra-ui/react";
import 'leaflet/dist/leaflet.css';

function HotelMap(props) {
  console.log(props.lat);
  console.log(props.long);
  return (
    <Box w="100%" align="center" shadow="base" borderRadius="md" p="5" bgColor="white">
      <Heading w="100%" align="left" size="md" pb="2">Location</Heading>
    
      <AspectRatio ratio={16 / 9}>
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
