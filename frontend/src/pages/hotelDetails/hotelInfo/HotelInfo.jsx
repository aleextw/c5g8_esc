import React from "react";
import ImageGallery from "react-image-gallery";
import { Box, Heading } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

function HotelInfo(props) {
  console.log(props);
  const images = [];
  for (let i = 0; i < props.hotel_details.images.count; i++) {
    const img_url = props.hotel_details.images.prefix + i + props.hotel_details.images.suffix;
    images.push({original: img_url, thumbnail: img_url});
  }
  console.log(images);
  return (
    <Box>
      <Heading>
        {props.hotel_details.name}
      </Heading>
      <Box>
        { <StarIcon color="gold" /> * props.hotel_details.rating}
        { <StarIcon color="grey" /> * (5 - props.hotel_details.rating)}
      </Box>
      <Heading>
        {props.hotel_details.address}
      </Heading>
      <Heading>
        💕 {props.hotel_details.rating}/100
      </Heading>
      <Box>
        {/* <ImageGallery items={images} />; */}
      </Box>
      <Heading>
        Hotel Overview
      </Heading>
      <Box>
        {props.hotel_details.hotelDescription}
      </Box>
      <Heading>
        Hotel Amenities
      </Heading>
    </Box>
  );
}

export default HotelInfo;
