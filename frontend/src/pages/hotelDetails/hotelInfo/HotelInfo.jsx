import React from "react";
import ImageGallery from "react-image-gallery";
import { Box, Heading, HStack, VStack, Text, Center, StackDivider, Link, Spacer, Container, Flex,Icon, IconButton, Tooltip, Stack} from "@chakra-ui/react";
import {MdSmokeFree,MdOutlineBusinessCenter,MdOutlineIron,MdOutlineDryCleaning,MdOutlineDry,MdPool, MdRoomService, MdSettingsEthernet,MdHotTub,MdOutlineMonitor, MdOutlineRecordVoiceOver, MdOutlineDriveEta, MdFitnessCenter} from "react-icons/md";
import{TbSnowflake,TbParking} from "react-icons/tb";
import {BiFridge,BiHandicap} from "react-icons/bi";
import {BsSafe} from "react-icons/bs";
import {CustomLeftNav, CustomRightNav} from "../../../components/CustomNavButton";
import StarRatingComponent from 'react-star-rating-component';
import { StarIcon } from "@chakra-ui/icons";

const icons = {
  "airConditioning": [<TbSnowflake/>, "Air Conditioning"],
  "businessCenter": [<MdOutlineBusinessCenter/>, "Business Center"],
  "clothingIron": [<MdOutlineIron/>, "Clothing Iron"],
  "dataPorts": [<MdSettingsEthernet/>, "Data Ports"],
  "dryCleaning": [<MdOutlineDryCleaning/>, "Dry Cleaning"],
  "hairDryer": [<MdOutlineDry/>, "Hair Dryer"],
  "miniBarInRoom": [<BiFridge/>, "Fridge"],
  "outdoorPool": [<MdPool/>, "Outdoor Pool"],
  "parkingGarage": [<TbParking/>, "Parking Garage"],
  "roomService": [<MdRoomService/>, "Room Service"],
  "safe": [<BsSafe/>, "Safe"],
  "sauna": [<MdHotTub/>, "Sauna"],
  "tVInRoom": [<MdOutlineMonitor/>, "TV in Room"],
  "valetParking": [<MdOutlineDriveEta/>, "Valet Parking"],
  "voiceMail": [<MdOutlineRecordVoiceOver/>, "Voicemail"],
  "fitnessFacility": [<MdFitnessCenter/>, "Fitness Facility"],
  "handicapAccessible": [<BiHandicap/>, "Handicapped Accessible"],
  "nonSmokingRooms": [<MdSmokeFree/>, "Non-smoking Rooms"]

}

function IconComponent(props) {
  const amenity= props.amenity[0];
  return (
          <Tooltip label={icons[amenity][1]}>
            <IconButton
              variant="link"
              colorScheme='teal'
              aria-label= {amenity}
              fontSize='24px'
              icon= {icons[amenity][0]}
              // title={icons[amenity][1]}
              />
          </Tooltip>
  )
}


function HotelInfo(props) {
  // TODO: Figure out why image quality sucks
  const images = [];
  for (let i = 0; i < props.hotel_details.images.count; i++) {
    const img_url = props.hotel_details.images.prefix + i + props.hotel_details.images.suffix;
    images.push({original: img_url, thumbnail: img_url, thumbnailWidth: 1920, thumbnailHeight: 1080});
  }

  const amenities = Object.keys(props.hotel_details.amenities).map((key) => [key, props.hotel_details.amenities[key]]);
  // console.log("amenities: ", amenities);

  return (
    <Center w="100%" h="100%" shadow="base" borderRadius="md" bgColor="white">
      <VStack w="100%" h="100%">
        <Center w="100%" h="100%">
          <HStack w="100%" h="100%" p="2" align="top">
            <Box w="50%" h="100%">
              <ImageGallery 
                items={images} 
                showThumbnails={false} 
                showPlayButton={false} 
                renderLeftNav={(onClick, disabled) => (
                  <CustomLeftNav onClick={onClick} disabled={disabled} />
                )}
                renderRightNav={(onClick, disabled) => (
                  <CustomRightNav onClick={onClick} disabled={disabled} />
                )}
                onErrorImageURL="https://via.placeholder.com/150.jpeg"
              />
            </Box>
              
            <VStack w="50%" h="100%" p="2" divider={<StackDivider borderColor='#gray.200' borderWidth="1px"/>}>
              <VStack w="100%" h="100%">
                <HStack w="100%" h="100%">
                  <VStack w="70%" h="100%" align="right">
                    <Heading size="md"align="left">
                      {props.hotel_details.name}
                    </Heading>
                    <Text w="100%" align="left">
                      {props.hotel_details.address}
                    </Text>
                  </VStack>
                  <VStack w="30%" align="right">
                    <StarRatingComponent 
                        name={`${props.hotel_details.uid}-star`}
                        editing={false}
                        starCount={5}
                        value={props.hotel_details.rating}
                        activeColor="#ffd700"
                        color="#D3D3D3"
                        renderStarIcon={() => <StarIcon />}
                    />
                    <Text w="100%" align="right">
                      <strong>Rating:</strong> {props.hotel_details.review}
                    </Text>
                  </VStack>
                </HStack>
                <Flex align='left' w="100%" direction={"row"} flexWrap={"wrap"} justifyContent={"flex-start"} alignContent={"flex-start"}>
                  {
                    amenities.slice(0, amenities.length).map((amenity) => {
                      // console.log("amenity: ", amenity);
                      if (amenity[0] in icons) {
                        return (
                          <IconComponent amenity={amenity} align="left"/>
                        );
                      }
                      return "";
                    })
                  }
                </Flex>
                <Spacer/>
                <Spacer />
              </VStack>
              <Box w="100%">
                <VStack w="100%">
                  <HStack w="100%">
                    <Text w="100%" align="left" fontSize="lg">Select a room starting from:</Text>
                    <Heading w="100%" align="right" size="md">{localStorage.getItem("currency")} {props.price}</Heading>
                  </HStack>
                  <HStack w="100%">
                    <Text w="100%" align="left">Earn at least</Text>
                    <Heading w="100%" align="right" size="sm" color="teal.500">{props.points} points</Heading>
                  </HStack>
                </VStack>
                
              </Box>
            </VStack>
          </HStack>
        </Center>
        <Spacer />
      </VStack>
    </Center>
    
    
  );
}

export default HotelInfo;
