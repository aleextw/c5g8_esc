import { Box, Center, Flex, Text, Select, Stack, Button, Heading, Input, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderMark } from "@chakra-ui/react";
import React, { useState } from "react";
import { getDestinations } from "../api/services/destinations";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {FaDotCircle} from "react-icons/fa"
 
export default function SideBar(props) {
  const resetState = () => {
    setHotelFilter("");
    setReviewRange([0, 100]);
    setPriceRange([0,100]);
    setStarsRange([1,5]);
    setSort(0);
  };

  const [hotelFilter, setHotelFilter] = useState("");
  const [reviewRange, setReviewRange] = useState([0,100]); // replace with min and max price of search
  // const [minPrice] = props.minPrice;
  // const [maxPrice] = props.maxPrice;
  // const [priceRange, setPriceRange] = useState([minPrice,maxPrice]);
  const [priceRange, setPriceRange] = useState([0,100]); // replace with min and max price of search
  const [starsRange, setStarsRange] = useState([1, 5]);
  const [sort, setSort] = useState("0");
  // const [typeFilter, setTypeFilters] = useState([]);

  function handlePrice(val) {
    setPriceRange(val);
    console.log("Price change: " + val[0] + " " + val[1]*10);
    props.setPriceRange(val);
  }
  function handleReviewFilter(val) {
    setReviewRange(val)
    props.setReviewRange(val);
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
              <Input></Input>
          </Stack>

          <Stack>
              <Heading size="sm">Reviews Score</Heading>
              <Stack direction="row" w="100%">
                <Text size="sm" w="100%" align="left">
                  {reviewRange[0]}
                </Text>
                <Text size="sm" w="100%" align="right">
                  {reviewRange[1]}
                </Text>
              </Stack>
              <RangeSlider 
                // min={minPrice} max={maxPrice} 
                defaultValue={[0,100]}
                step={1}
                onChange={(val)=> handleReviewFilter(val)}
              >
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb boxSize={6} index={0}>
                  <Box color="gray.300" as={FaDotCircle}/>
                </RangeSliderThumb>
                <RangeSliderThumb boxSize={6} index={1}>
                  <Box color="gray.300" as={FaDotCircle}/>
                </RangeSliderThumb>
              </RangeSlider>
          </Stack>

          <Stack>
              <Heading size="sm">Price Range</Heading>
              <Stack direction="row" w="100%">
                <Text size="sm" w="100%" align="left">
                  {localStorage.getItem("currency")}{priceRange[0]*10}
                </Text>
                <Text size="sm" w="100%" align="right">
                  {localStorage.getItem("currency")}{priceRange[1]*10}
                </Text>
              </Stack>
              <RangeSlider 
                // min={minPrice} max={maxPrice} 
                defaultValue={[0,100]}
                step={1}
                onChange={(val)=> handlePrice(val)}
              >
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb boxSize={6} index={0}>
                  <Box color="gray.300" as={FaDotCircle}/>
                </RangeSliderThumb>
                <RangeSliderThumb boxSize={6} index={1}>
                  <Box color="gray.300" as={FaDotCircle}/>
                </RangeSliderThumb>
              </RangeSlider>
          </Stack>

          <Stack>
              <Heading size="sm">Hotel Star Rating</Heading>
              <Stack direction="row" w="100%">
                <Text size="sm" w="100%" align="left">
                  {starsRange[0]}
                </Text>
                <Text size="sm" w="100%" align="right">
                  {starsRange[1]}
                </Text>
              </Stack>
              <RangeSlider 
              defaultValue={[1, 5]} min={1} max={5} step={1}
              onChange={(val)=> handleStars(val)}
              >
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb boxSize={6} index={0}>
                  <Box color="gray.300" as={FaDotCircle}/>
                </RangeSliderThumb>
                <RangeSliderThumb boxSize={6} index={1}>
                  <Box color="gray.300" as={FaDotCircle}/>
                </RangeSliderThumb>
              </RangeSlider>
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

