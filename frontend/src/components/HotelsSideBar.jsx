import { Box, Center, Flex, Text, Select, Stack, Button, Heading, Input, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb } from "@chakra-ui/react";
import React, { useState } from "react";
import { getDestinations } from "../api/services/destinations";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
 
export default function SideBar({ onClose, ...rest }) {
  // const navigate = useNavigate();
  
  // // TODO: Load data from local storage and load reasonable defaults if not present

  // const searchRoute = () => {
  //     // TODO: Add error checking for invalid UIDs
  //     // TODO: Store data to local storage        
  //     // navigate(`/hotels?${selectedDestination}?checkInDate=${selectedDates[0]}&checkOutDate=${selectedDates[1]}&guests=${numAdults + numChildren}&currency=${currency}`);
  //     navigate(`/hotels?uid=${selectedDestination}&checkInDate=${formatDate(selectedDates[0])}&checkOutDate=${formatDate(selectedDates[1])}&guests=${numAdults + numChildren}&currency=SGD`);
  // }

  const initialState = {
    selectedHotel: '',
    starRating: 0,
    // minPrice: 0,
    // maxPrice: 100,
    reviewRange: 0,
    priceRange: [0, 100],
    sort: 0

  };
  // const [minPrice, setMinPrice] = useState(0);
  // const [maxPrice, setMaxPrice] = useState(100);
  const [filters, setFilters] = useState(initialState);
  const [selectedHotel, setHotel] = useState("");
  const [starRating, setStarRating] = useState(0);
  const [reviewRange, setReviewRange] = useState([]);
  const [priceRange, setPriceRange] = useState([0,100]);
  const [sort, setSort] = useState(0);
  // const [typeFilter, setTypeFilters] = useState([]);

  // const updateState= () => {
  //   setFilters({hotel: hotelName, reviews: reviewScore, price_range: pricesChosen, rating: ratingScore});
  // };

  // TODO : reset to initial state
  const resetState = () => {
    setFilters(initialState);
  };
  // TODO: still not working yet
  const handlePrice = (event) => setPriceRange(event.target.value);
  const handleSort = (event) => setSort(event.target.value);
  // TODO: Fix background colour / decide on what colour to use
  return (
      <Center h="100%" backgroundColor="white" p="5">
        <Stack h="100%" w="100%">
          <Stack>
              <Heading size="sm" color="black">Hotel Name</Heading>
              <Input placeholder="Placeholder input"></Input>
          </Stack>

          <Stack>
              <Heading size="sm">Reviews Score</Heading>
              <Input placeholder="Placeholder input"></Input>
          </Stack>

          <Stack>
              <Heading size="sm">Price Range</Heading>
              <RangeSlider 
              defaultValue={[0, 100]}
              // onChangeEnd={handlePrice}
              >
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb boxSize={6} index={0}>
                  <Box />
                </RangeSliderThumb>
                <RangeSliderThumb boxSize={6} index={1}>
                  <Box />
                </RangeSliderThumb>
              </RangeSlider>
          </Stack>

          <Stack>
              <Heading size="sm">Hotel Star Rating</Heading>
              <Input placeholder="Placeholder input"></Input>
          </Stack>

          <Stack>
              <Heading size="sm">Hotels Popular For</Heading>
              <Input placeholder="Placeholder input"></Input>
          </Stack>

          <Stack>
            <Heading size="sm">Sort by</Heading>
            <Select value={sort} onChange={handleSort}>
              <option value='0'>-</option>
              <option value='1'>Price: Low to High</option>
              <option value='2'>Price: High to Low</option>
            </Select>
          </Stack>

          <Stack>
              <Button onClick={ resetState } w="100%" colorScheme="red">Reset</Button>
          </Stack>
        </Stack>
      </Center>
  );
};

