import React from "react";
import PhotoGallery from "../photoGallery/PhotoGallery";
import StarRatingComponent from "react-star-rating-component";
import { Box, Heading } from "@chakra-ui/react";

function HotelInfo(props) {
  return (
    <Box mt="2" mb="2">
      <Heading as="h1" size="4xl" ml="2">
        {props.name}
      </Heading>
      <Box mt="2" mb="2" ml="2">
        <StarRatingComponent
          name=""
          starCount={props.stars}
          editing={false}
          renderStarIcon={() => <span>⭐</span>}
        />
      </Box>
      <Heading size="1xl" fontSize="25px" mt="2" mb="2" ml="2">
        {props.address}
      </Heading>
      <Heading size="1xl" fontSize="18px" mt="2" mb="2" ml="2">
        💕 {props.rating}/100
      </Heading>
      <Box mt="2" mb="5">
        <PhotoGallery images={props.images} />
      </Box>
      <Heading size="2xl" mt="2" mb="3" ml="2">
        Hotel Overview
      </Heading>
      <Box mt="2" mb="5" ml="2">
        {" "}
        {props.hotelDescription}{" "}
      </Box>
      <Heading size="2xl" mt="2" mb="2" ml="2">
        Hotel Amenities
      </Heading>
    </Box>
  );
}

export default HotelInfo;
