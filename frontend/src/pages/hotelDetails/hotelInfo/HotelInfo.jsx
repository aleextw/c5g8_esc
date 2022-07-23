import React from "react";
import ImageGallery from "react-image-gallery";
import { Box, Heading, HStack, VStack, Text, Center, StackDivider, Link, Spacer, Container, Flex,Icon, IconButton} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import ReactDOMServer from 'react-dom/server';
import ReactStars from "react-rating-stars-component";
import {MdOutlineBusinessCenter,MdOutlineIron,MdOutlineDryCleaning,MdOutlineDry,MdPool, MdRoomService, MdSettingsEthernet,MdHotTub,MdOutlineMonitor, MdOutlineRecordVoiceOver, MdOutlineDriveEta } from "react-icons/md";
import{TbSnowflake,TbParking} from "react-icons/tb";
import {BiFridge,} from "react-icons/bi";
import {BsSafe} from "react-icons/bs";


const icons = {
  "airConditioning": <TbSnowflake/>,
  "businessCenter": <MdOutlineBusinessCenter/>,
  "clothingIron": <MdOutlineIron/>,
  "dataPorts": <MdSettingsEthernet/>,
  "dryCleaning": <MdOutlineDryCleaning/>,
  "hairDryer": <MdOutlineDry/>,
  "miniBarInRoom": <BiFridge/>,
  "outdoorPool": <MdPool/>,
  "parkingGarage": <TbParking/>,
  "roomService": <MdRoomService/>,
  "safe": <BsSafe/>,
  "sauna": <MdHotTub/>,
  "tVInRoom": <MdOutlineMonitor/>,
  "valetParking": <MdOutlineDriveEta/>,
  "voiceMail": <MdOutlineRecordVoiceOver/>
}

function IconComponent(props) {
  const amenity= props.amenity[0];

  if (amenity !== "valetParking" || amenity) {
    return (
            <IconButton
              variant="link"
              colorScheme='teal'
              aria-label= {amenity}
              fontSize='24px'
              icon= {icons[amenity]}
              title={amenity}
              />
    )
  }
}


function HotelInfo(props) {
  // TODO: Figure out why image quality sucks
  const images = [];
  for (let i = 0; i < props.hotel_details.images.count; i++) {
    const img_url = props.hotel_details.images.prefix + i + props.hotel_details.images.suffix;
    images.push({original: img_url, thumbnail: img_url, thumbnailWidth: 640, thumbnailHeight: 360});
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
                <ImageGallery items={images} useBrowserFullscreen={false}></ImageGallery>
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
                  />
                  </Box>
                </HStack>
                <Text w="100%" align="left">
                  {props.hotel_details.address}
                </Text>
                <Spacer />
                <Box align='left'>
                  {
                    amenities.slice(0, amenities.length).map((amenity) => {
                      return (
                        <IconComponent amenity={amenity} align="left"/>
                      )
                  })}
                </Box>
                <Spacer/>
                {/*<Link color="teal.500" href="#map" w="100%" align="left">
                  Show on map
                </Link> */}
                <Spacer />
              </VStack>
              <Box w="100%">
                <HStack w="100%">
                  <VStack w="50%">
                    <Text w="100%" align="left" fontSize="lg">Select a room starting from:</Text>
                    <Text w="100%" align="left">Earn at least</Text>
                  </VStack>
                  <VStack w="50%">
                    <Heading w="100%" align="right" size="md">SGD {props.price}</Heading>
                    <Heading w="100%" align="right" size="sm">{props.points} points</Heading>
                  </VStack>
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
