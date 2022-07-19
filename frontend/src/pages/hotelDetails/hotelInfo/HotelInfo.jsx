import React from "react";
import ImageGallery from "react-image-gallery";
import { Box, Heading, HStack, VStack, Text, Center, StackDivider, Link, Spacer, Container, Flex } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import ReactDOMServer from 'react-dom/server';

function HotelInfo(props) {
  // TODO: Figure out why image quality sucks
  console.log(props);
  const images = [];
  for (let i = 0; i < props.hotel_details.images.count; i++) {
    const img_url = props.hotel_details.images.prefix + i + props.hotel_details.images.suffix;
    images.push({original: img_url, thumbnail: img_url, thumbnailWidth: 640, thumbnailHeight: 360});
  }
  console.log(images);

  var stars = Array(props.hotel_details.rating).fill(<StarIcon color="gold" />).concat(Array(5 - props.hotel_details.rating).fill(<StarIcon color="grey" />));
  return (
    <Center w="100%" h="100%">
      <VStack w="70%" h="100%">
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
                    {stars}
                  </Box>
                </HStack>
                <Text w="100%" align="left">
                  {props.hotel_details.address}
                </Text>
                <Spacer />
                <Link color="teal.500" href="#map" w="100%" align="left">
                  Show on map
                </Link>
                <Spacer />
              </VStack>
              <Box w="100%">
                <HStack w="100%">
                  <VStack w="50%">
                    <Text w="100%" align="left" fontSize="lg">Select a room starting from:</Text>
                    <Text w="100%" align="left">Earn at least</Text>
                  </VStack>
                  <VStack w="50%">
                    <Heading w="100%" align="right" size="md">SGD 100</Heading>
                    <Heading w="100%" align="right" size="sm">100 points</Heading>
                  </VStack>
                </HStack>
              </Box>
            </VStack>
          </HStack>
        </Center>
        <Spacer />
        <Center borderWidth="1px" w="100%" background="white" p="6">
          {<div dangerouslySetInnerHTML={{__html: props.hotel_details.description}}></div>}
        </Center>
      </VStack>
    </Center>
    
    
  );
}

export default HotelInfo;
