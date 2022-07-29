import { Box, Center, Text, Select, Stack, Button, Heading, Input, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb } from "@chakra-ui/react";
import React from "react";
import {FaDotCircle} from "react-icons/fa"
 
export default function SideBar(props) {
  return (
      <Center h="100%" backgroundColor="white" p="5">
        <Stack h="100%" w="100%">
          <Stack>
              <Heading size="sm" color="black">Hotel Name</Heading>
              <Input isDisabled={!props.completed} onChange={(e) => props.setHotelFilter(e.target.value)}></Input>
          </Stack>

          <Stack>
              <Heading size="sm">Reviews Score</Heading>
              <Stack direction="row" w="100%">
                <Text size="sm" w="100%" align="left">
                  {props.reviewRange[0]}
                </Text>
                <Text size="sm" w="100%" align="right">
                  {props.reviewRange[1]}
                </Text>
              </Stack>
              <RangeSlider
                isDisabled={!props.completed}
                min={props.reviewBounds[0]} max={props.reviewBounds[1]} 
                defaultValue={[0, 1000000]}
                step={1}
                onChange={(e) => props.setReviewRange(e)}
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
                  {localStorage.getItem("currency")} {props.priceRange[0]}
                </Text>
                <Text size="sm" w="100%" align="right">
                  {localStorage.getItem("currency")} {props.priceRange[1]}
                </Text>
              </Stack>
              <RangeSlider
                isDisabled={!props.completed}
                min={props.priceBounds[0]} max={props.priceBounds[1]} 
                defaultValue={[0, 1000000]}
                step={1}
                onChange={(e)=> props.setPriceRange(e)}
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
                  {props.starsRange[0]}
                </Text>
                <Text size="sm" w="100%" align="right">
                  {props.starsRange[1]}
                </Text>
              </Stack>
              <RangeSlider
                isDisabled={!props.completed}
                defaultValue={[1, 5]} min={1} max={5} step={1}
                onChange={(e) => props.setStarsRange(e)}
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
            <Select value={props.sort} onChange={(e) => props.setSort(e.target.value)} isDisabled={!props.completed}>
              <option value='0'>-</option>
              <option value='1'>Price: Low to High</option>
              <option value='2'>Price: High to Low</option>
              <option value='3'>Stars: Low to High</option>
              <option value='4'>Stars: High to Low</option>
              <option value='5'>Distance to City Centre</option>
            </Select>
          </Stack>

          <Stack>
              <Button onClick={ props.resetState } w="100%" colorScheme="red" isDisabled={!props.completed}>Reset</Button>
          </Stack>
        </Stack>
      </Center>
  );
};

