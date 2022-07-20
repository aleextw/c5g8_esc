import { useLocation, useNavigate } from "react-router-dom";
import { Component } from "react";
import { getHotel } from "../../api/services/destinations";
import HotelInfo from "../hotelDetails/hotelInfo/HotelInfo";
import HotelRooms from "../hotelDetails/hotelRooms/HotelRooms";
import HotelMap from "../hotelDetails/hotelMap/HotelMap";
import RoomInfoPopup from "../hotelDetails/hotelRooms/RoomInfoPopup";
import { Flex, Heading, Image, Stack, Text, Button, Box, Center, Spacer, Show, Spinner, StackDivider, Container } from "@chakra-ui/react";
import ImageGallery from "react-image-gallery";

function Card(props) {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const navigate = useNavigate();
  const toPaymentsPage = () => {
    localStorage.setItem("roomName", JSON.stringify(props.room.name));
    localStorage.setItem("hotelName", JSON.stringify(props.room.hotelName));
    localStorage.setItem("roomPrice", JSON.stringify(props.room.price));
    localStorage.setItem("checkInDate", JSON.stringify(params.get("checkInDate")));
    localStorage.setItem("checkOutDate", JSON.stringify(params.get("checkOutDate")));
    localStorage.setItem("numAdults", JSON.stringify(params.get("numAdults")));
    localStorage.setItem("numChildren", JSON.stringify(params.get("numChildren")));
    localStorage.setItem("numRooms", JSON.stringify(params.get("numRooms")));
    localStorage.setItem("dest_uid", JSON.stringify(params.get("dest_uid")));
    localStorage.setItem("hotel_uid", JSON.stringify(params.get("hotel_uid"))); 
    navigate(`/booking`);
  }

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
          <RoomInfoPopup content={<>{props.room.description}</>} />
        </Center>
      </Stack>
      <Stack spacing={3} direction="column">
        <Text lineHeight="1.2rem" fontSize="15px">
          {props.room.description}
        </Text>
        <Heading
          size="2xl"
          fontSize="25px"
          lineHeight="1.4rem"
          marginTop="0.6rem"
        >
          ${props.room.price}
        </Heading>
        <Text fontSize="20px" />
        <Button colorScheme="teal" variant="solid" onClick={toPaymentsPage}>
          Book Now
        </Button>
      </Stack>
    </Flex>
  );
}

// function Card(props) {
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
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
//     navigate(`/booking?room=${props.uid}&hotel_uid=${params.get("hotel_uid")}&destination=${params.get("destination")}&dest_uid=${params.get("dest_uid")}&checkInDate=${params.get("checkInDate")}&checkOutDate=${params.get("checkOutDate")}&numRooms=${params.get("numRooms")}&numAdults=${params.get("numAdults")}&numChildren=${params.get("numChildren")}&currency=SGD`);
//   }

//   const images = [];
//   for (let i = 0; i < props.images.count; i++) {
//     images.push({original: props.images[i].url, thumbnail: props.images[i].url, thumbnailWidth: 640, thumbnailHeight: 360});
//   }

//   return (<Flex borderWidth="1px" backgroundColor="white" borderRadius="lg">
//       <Box maxW="50%">
//         <Container>
//           <ImageGallery items={props.images} useBrowserFullscreen={false}></ImageGallery>
//         </Container>
//       </Box>
//       <Stack align="center" w="75%" direction={{ base: 'column', md: 'row' }} divider={<StackDivider borderColor='#F5F4F1' borderWidth="1px"/>}>
//           <Stack p="2" direction="column" w={{base: "100%", md: "60%"}}>
//               <Heading size="md">{props.name}</Heading>
//               <Show above="md">
//                   <Text>{props.description}</Text>
//               </Show>
//               {/* TODO: Add rating */}
//               {/* TODO: Add map modal */}
//               {/* TODO: Add review */}
//           </Stack>
//           <Stack p="2" w={{base: "100%", md: "40%"}} direction="column">
//               {/* <Heading size="sm">C5G8</Heading> */}
//               <Text size="sm">SGD {props.price}</Text>
//               <Show above="md">
//               <Button colorScheme="teal" variant="solid" onClick={toPaymentsPage}>
//                 Book Now
//               </Button>
//               </Show>
//           </Stack>
//       </Stack>             
//   </Flex>);
// }

export default class HotelDetails extends Component {
  constructor(props) {
    super(props);
    this.params = props.params;

    this.state = {
        selectedRoom: "",
        hotel: {"completed": false, "hotel_details": {}, "rooms":[]}, //hotel_details contain static hotel data, rooms contain list of objects for each room
    };

    this.setHotel = this.setHotel.bind(this);
}

  setHotel(hotel) {
      this.setState({hotel: hotel});
  }

  componentDidMount() {
      // TODO: Figure out why its triggering twice
      this.updateTimer = setInterval(() => getHotel(this.params, this.setHotel), 5000);
  }

  componentWillUnmount() {
      clearInterval(this.updateTimer);
  }

  render() {
    console.log(this.state.hotel.completed);
    console.log(this.state.hotel.hotel_details);
    console.log(this.state.hotel.rooms);

    if (this.state.hotel.completed === true) {
        clearInterval(this.updateTimer);
    }

    if (this.state.hotel.rooms.length > 0) {
      return ( //display static hotel info
        <Stack w="70%" h="100%" overflowY='scroll' className="hotels-list">
          <HotelInfo
            hotel_details = {this.state.hotel.hotel_details}
          />
          <Spacer />
          { this.state.hotel.rooms.slice(0, this.state.hotel.rooms.length).map((room) => {
            return (  //display each room's info
              <Card
                room={room} />
            )})}
          <Spacer />
          {/* <Box w="100%">
            <HotelMap
                pos = {[this.state.hotel.hotel_details.latitude, this.state.hotel.hotel_details.longitude]}
                name={this.state.hotel.hotel_details.name}
            />
          </Box> */}
        </Stack>                  
      );
    } else if (this.state.hotel.completed === false) {
      return (<Box w="100%" h="100%">
          <Center w="100%" h="100%">
          <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'
          />
        </Center>
      </Box>);
    } else {
      return (<Box w="100%" h="100%">
      <Center w="100%" h="100%">
              <Heading size="lg">
                  No hotel found!
              </Heading>
          </Center>
      </Box>);
    }
  }
}
