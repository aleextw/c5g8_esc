import React from "react";
import RoomInfoPopup from "./RoomInfoPopup";
import PhotoGallery from "../photoGallery/PhotoGallery";
import {
  Stack,
  Grid,
  Text,
  Heading,
  Button,
  Flex,
  Center
} from "@chakra-ui/react";

function HotelRooms(props) {
  return (
    <Grid margin="5rem" gap={2} templateColumns="1fr" template-rows="1fr">
      <Card
        images={props.images}
        title={props.name}
        description={props.description}
        price={props.price}
      />
      <Card
        images={props.images}
        title={props.name}
        description={props.description}
        price={props.price}
      />
      <Card
        images={props.images}
        title={props.name}
        description={props.description}
        price={props.price}
      />
    </Grid>
  );
}

function Card(props) {
  return (
    <Flex boxShadow="lg" p="6" rounded="md" bg="white">
      <Stack spacing={3} direction="column">
        <Flex margin="1rem" flexGrow="1">
          <Heading size="2xl" lineHeight="1.4rem" mb="0.5rem" fontSize="20px">
            {props.title}
          </Heading>
        </Flex>
        <Flex
          mt="auto"
          mb="1"
          w="40rem"
          h="30rem"
          ml="auto"
          mr="auto"
          objectFit="cover"
          justifyContent="center"
        >
          {/* <PhotoGallery images={props.images} /> */}
        </Flex>
        <Center ml="auto" mr="auto">
          <RoomInfoPopup content={<>{props.description}</>} />
        </Center>
      </Stack>
      <Stack spacing={3} direction="column">
        <Text lineHeight="1.2rem" fontSize="15px">
          {props.description}
        </Text>
        <Heading
          size="2xl"
          fontSize="25px"
          lineHeight="1.4rem"
          marginTop="0.6rem"
        >
          ${props.price}
        </Heading>
        <Text fontSize="20px" />
        <Button colorScheme="teal" variant="solid">
          Book Now
        </Button>
      </Stack>
    </Flex>
  );
}

export default HotelRooms;
