import { Box, Center, Flex, Text, Select, Stack, Button, Heading, Input, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb } from "@chakra-ui/react";
import React, { useState } from "react";
import { getDestinations } from "../api/services/destinations";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
 
export default function SideBar({ onClose, ...rest }) {
  const navigate = useNavigate();
  
  // TODO: Load data from local storage and load reasonable defaults if not present

  const searchRoute = () => {
      // TODO: Add error checking for invalid UIDs
      // TODO: Store data to local storage        
      // navigate(`/hotels?${selectedDestination}?checkInDate=${selectedDates[0]}&checkOutDate=${selectedDates[1]}&guests=${numAdults + numChildren}&currency=${currency}`);
      navigate(`/hotels?uid=${selectedDestination}&checkInDate=${formatDate(selectedDates[0])}&checkOutDate=${formatDate(selectedDates[1])}&guests=${numAdults + numChildren}&currency=SGD`);
  }

  const [selectedDates, setSelectedDates] = useState([new Date(), new Date()]);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [numRooms, setNumRooms] = useState(1);
  const [numAdults, setNumAdults] = useState(2);
  const [numChildren, setNumChildren] = useState(0);
  // const [currency, setCurrency] = useState("SGD");
  
  useEffect(() => {
      getDestinations(setDestinations);
  }, []);
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
              <RangeSlider defaultValue={[30, 80]}>
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
              <Button onClick={ searchRoute } w="100%" colorScheme="red">Reset</Button>
          </Stack>
        </Stack>
      </Center>
  );
};

function addLeadingZeros(n) {
    if (n <= 9) {
      return "0" + n;
    }
    return n
}

function formatDate(date) {
    return date.getFullYear() + "-" + addLeadingZeros(date.getMonth() + 1) + "-" + addLeadingZeros(date.getDate())
}
