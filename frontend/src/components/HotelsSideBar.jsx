import { Box, Center, Flex, Text, Select, Stack, Button, Heading, Input, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderMark } from "@chakra-ui/react";
import React, { useState } from "react";
import { getDestinations } from "../api/services/destinations";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
 
export default function SideBar(props) {
    // get functions to build form with useForm() hook
  // const navigate = useNavigate();
  
  // // TODO: Load data from local storage and load reasonable defaults if not present

  // const searchRoute = () => {
  //     // TODO: Add error checking for invalid UIDs
  //     // TODO: Store data to local storage        
  //     // navigate(`/hotels?${selectedDestination}?checkInDate=${selectedDates[0]}&checkOutDate=${selectedDates[1]}&guests=${numAdults + numChildren}&currency=${currency}`);
  //     navigate(`/hotels?uid=${selectedDestination}&checkInDate=${formatDate(selectedDates[0])}&checkOutDate=${formatDate(selectedDates[1])}&guests=${numAdults + numChildren}&currency=SGD`);
  // }

  // TODO : reset to initial state
  const resetState = () => {
    setHotel("");
    setPriceRange([0,100]);
    setStarsRange([0,100]);
    setSort(0);
    
  };

  const [selectedHotel, setHotel] = useState(""); // autocomplete?
  // const [minPrice] = props.minPrice;
  // const [maxPrice] = props.maxPrice;
  // const [priceRange, setPriceRange] = useState([minPrice,maxPrice]);
  const [priceRange, setPriceRange] = useState([0,100]); // replace with min and max price of search
  const [starsRange, setStarsRange] = useState([0,100]);
  const [sort, setSort] = useState(0);
  // const [typeFilter, setTypeFilters] = useState([]);

  function handlePrice(val) {
    setPriceRange(val);
    console.log("Price change: " + val[0] + " " + val[1]*10);
    props.setPriceRange(val);
  }
  function handleStars(val) {
    setStarsRange(val)
    props.setStarsRange(val);
  }
  function handleSort(event) {
    setSort(event.target.value);
    props.setSort(event.target.value);
  }
  
    
  
  // TODO: fix slider reset sort 
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
              <Text height="5"></Text>
              <RangeSlider 
              // min={minPrice} max={maxPrice} 
              defaultValue={[0,100]}
              step={1}
              onChangeEnd={(val)=> handlePrice(val)}
              >
                <RangeSliderMark
                  value={priceRange[0]}
                  fontSize="small"
                  textAlign='center'
                  bg='blue.500'
                  color='white'
                  mt='-10'
                  ml='-5'
                  w='8'
                >
                  {priceRange[0]*10}
                </RangeSliderMark>
                <RangeSliderMark
                  value={priceRange[1]}
                  fontSize="small"
                  textAlign='center'
                  bg='blue.500'
                  color='white'
                  mt='-10'
                  ml='-5'
                  w='8'
                >
                  {priceRange[1]*10}
                </RangeSliderMark>
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb
                boxSize={6} index={0}>
                  <Box />
                </RangeSliderThumb>
                <RangeSliderThumb
                boxSize={6} index={1}>
                  <Box />
                </RangeSliderThumb>
              </RangeSlider>
          </Stack>

          <Stack>
              <Heading size="sm">Hotel Star Rating</Heading>
              <Text height="5"></Text>
              <RangeSlider 
              defaultValue={[0, 100]} min={0} max={100} step={10}
              onChangeEnd={(val)=> handleStars(val)}
              >
                <RangeSliderMark
                  value={starsRange[0]}
                  fontSize="small"
                  textAlign='center'
                  bg='blue.500'
                  color='white'
                  mt='-10'
                  ml='-5'
                  w='8'
                >
                  {starsRange[0]/20}
                </RangeSliderMark>
                <RangeSliderMark
                  value={starsRange[1]}
                  fontSize="small"
                  textAlign='center'
                  bg='blue.500'
                  color='white'
                  mt='-10'
                  ml='-5'
                  w='8'
                >
                  {starsRange[1]/20}
                </RangeSliderMark>
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
              <Heading size="sm">Hotels Popular For</Heading>
              <Input placeholder="Placeholder input"></Input>
          </Stack>

          <Stack>
            <Heading size="sm">Sort by</Heading>
            <Select value={sort} onChange={handleSort}>
              <option value='0'>-</option>
              <option value='1'>Price: Low to High</option>
              <option value='2'>Price: High to Low</option>
              <option value='3'>Stars: Low to High</option>
              <option value='4'>Stars: High to Low</option>
              <option value='5'>Distance to City Centre</option>
            </Select>
          </Stack>

          <Stack>
              <Button onClick={ resetState } w="100%" colorScheme="red">Reset</Button>
          </Stack>
        </Stack>
      </Center>
  );
};

