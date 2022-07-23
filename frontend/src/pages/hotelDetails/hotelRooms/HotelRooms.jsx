// import React from "react";
// import RoomInfoPopup from "./RoomInfoPopup";
// import PhotoGallery from "../photoGallery/PhotoGallery";
// import {
//   Stack,
//   Grid,
//   Text,
//   Heading,
//   Button,
//   Flex,
//   Center
// } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";

// function HotelRooms(props) {
//   return (
//     <Grid margin="5rem" gap={2} templateColumns="1fr" template-rows="1fr">
//       <Card
//         images={props.images}
//         title={props.name}
//         description={props.description}
//         price={props.price}
//         hotelName={props.price}
//         checkInDate={props.checkInDate}
//         checkOutDate={props.checkOutDate}
//         numAdults={props.numAdults}
//         numChildren={props.numChildren}
//         numRooms={props.numRooms}
//       />
//     </Grid>
//   );
// }

// function Card(props) {
//   const navigate = useNavigate();

//   const toPaymentsPage = () => {
//     localStorage.setItem("roomName", JSON.stringify(props.name));
//     localStorage.setItem("hotelName", JSON.stringify(props.hotelName));
//     localStorage.setItem("roomPrice", JSON.stringify(props.price));
//     localStorage.setItem("checkInDate", JSON.stringify(props.checkInDate));
//     localStorage.setItem("checkOutDate", JSON.stringify(props.checkOutDate));
//     localStorage.setItem("checkInDate", JSON.stringify(props.checkInDate));
//     localStorage.setItem("numAdults", JSON.stringify(props.numAdults));
//     localStorage.setItem("numChildren", JSON.stringify(props.numChildren));
//     localStorage.setItem("numRooms", JSON.stringify(props.numRooms));
//     navigate(`/booking`);
//   }

//   return (
//     <Flex boxShadow="lg" p="6" rounded="md" bg="white">
//       <Stack spacing={3} direction="column">
//         <Flex margin="1rem" flexGrow="1">
//           <Heading size="2xl" lineHeight="1.4rem" mb="0.5rem" fontSize="20px">
//             {props.title}
//           </Heading>
//         </Flex>
//         <Flex
//           mt="auto"
//           mb="1"
//           w="40rem"
//           h="30rem"
//           ml="auto"
//           mr="auto"
//           objectFit="cover"
//           justifyContent="center"
//         >
//           {/* <PhotoGallery images={props.images} /> */}
//         </Flex>
//         <Center ml="auto" mr="auto">
//           <RoomInfoPopup content={<>{props.description}</>} />
//         </Center>
//       </Stack>
//       <Stack spacing={3} direction="column">
//         <Text lineHeight="1.2rem" fontSize="15px">
//           {props.description}
//         </Text>
//         <Heading
//           size="2xl"
//           fontSize="25px"
//           lineHeight="1.4rem"
//           marginTop="0.6rem"
//         >
//           ${props.price}
//         </Heading>
//         <Text fontSize="20px" />
//         <Button ncolorScheme="teal" variant="solid" onClick={toPaymentsPage}>
//           Book Now
//         </Button>
//       </Stack>
//     </Flex>
//   );
// }

// export default HotelRooms;
