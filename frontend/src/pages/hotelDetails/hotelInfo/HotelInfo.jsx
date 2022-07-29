import React from "react";
import ImageGallery from "react-image-gallery";
import { Box, Heading, HStack, VStack, Text, Center, StackDivider, Link, Spacer, Container, Flex,Icon, IconButton, Tooltip, Stack} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import ReactDOMServer from 'react-dom/server';
import ReactStars from "react-rating-stars-component";
import {MdSmokeFree,MdOutlineBusinessCenter,MdOutlineIron,MdOutlineDryCleaning,MdOutlineDry,MdPool, MdRoomService, MdSettingsEthernet,MdHotTub,MdOutlineMonitor, MdOutlineRecordVoiceOver, MdOutlineDriveEta, MdFitnessCenter} from "react-icons/md";
import{TbSnowflake,TbParking} from "react-icons/tb";
import {BiFridge,BiHandicap} from "react-icons/bi";
import {BsSafe} from "react-icons/bs";


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
  "tVInRoom": [<MdOutlineMonitor/>, "TV in Rooom"],
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
    <Center w="100%" h="100%">
      <VStack w="100%" h="100%">
        <Spacer />
        <Center borderWidth="1px" w="100%" background="white">
          <HStack w="100%">
            <Box maxW="50%">
              <Container>
                <ImageGallery items={images} ></ImageGallery>
              </Container>
            </Box>
            <VStack minW="50%" w="100%" h="100%" vertical-align="top" p="6" divider={<StackDivider borderColor='#gray.200' borderWidth="1px"/>}>
              <VStack w="100%">
                <HStack w="100%">
                  <Heading size="md" w="50%" align="left">
                    {props.hotel_details.name}
                  </Heading>
                  <Box w="50%" align="right">
                  <ReactStars
                    count={5}
                    value={props.hotel_details.rating}
                    edit={false}
                    size={24}
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                    color="#D3D3D3"
                  />
                  </Box>
                </HStack>
                <Text w="100%" align="left">
                  {props.hotel_details.address}
                </Text>
                <Spacer />
                <Flex align='left' direction={"row"} flexWrap={"wrap"} justifyContent={"flex-start"} alignContent={"flex-start"}>
                  {
                    amenities.slice(0, amenities.length).map((amenity) => {
                      // console.log("amenity: ", amenity);
                      if (amenity[0] in icons) {
                        return (
                        <IconComponent amenity={amenity} align="left"/>
                      )
                  }
                  })}
                </Flex>
                <Spacer/>
                <Spacer />
              </VStack>
              <Box w="100%" mt={5}>
                <HStack w="100%">
                  <Container>
                    <Stack spacing={5} direction="column">
                      <Stack spacing={5} direction="row">
                        <Text w="100%" align="center" fontSize={18} fontWeight={"medium"} verticalAlign={"middle"}>Rooms starting from:</Text>
                        <Heading w="100%" align="center" size="md" verticalAlign={"middle"}>{localStorage.getItem("currency")} {props.price}</Heading>
                      </Stack>

                      <Stack spacing={5} direction="row">
                        <Text w="100%" align="center" fontSize={18} fontWeight={"medium"}>Earn at least:</Text>
                        <Heading w="100%" align="center" fontSize={18} color="teal.500" >{props.points} points</Heading>
                      </Stack>
                    </Stack>
                  </Container>
                </HStack>
              </Box>
            </VStack>
          </HStack>
        </Center>
        <Spacer />
        {/* <Box borderWidth="1px" w="100%" background="white" p="6" h="100vh" dangerouslySetInnerHTML={{__html: props.hotel_details.description}}>
        </Box> */}
      </VStack>
    </Center>
    
    
  );
}

export default HotelInfo;
