import { useLocation, useNavigate } from "react-router-dom";
import { Component } from "react";
import { getHotel } from "../../api/services/destinations";
import HotelInfo from "../hotelDetails/hotelInfo/HotelInfo";
import HotelMap from "../hotelDetails/hotelMap/HotelMap";
import RoomInfoPopup from "../hotelDetails/RoomInfoPopup";
import { Flex, Heading, Stack, Text, Button, Box, Center, Spacer, Show, Spinner, StackDivider, Container } from "@chakra-ui/react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import {CustomLeftNav, CustomRightNav} from "../../components/CustomNavButton";

function Card(props) {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const navigate = useNavigate();
    const toPaymentsPage = () => {
      localStorage.setItem("roomName", JSON.stringify(props.description));
      localStorage.setItem("hotelName", JSON.stringify(props.hotelName));
      localStorage.setItem("roomPrice", JSON.stringify(props.price));
      localStorage.setItem("points", JSON.stringify(props.points));
      localStorage.setItem("checkInDate", JSON.stringify(params.get("checkInDate")));
      localStorage.setItem("checkOutDate", JSON.stringify(params.get("checkOutDate")));
      localStorage.setItem("numAdults", JSON.stringify(params.get("numAdults")));
      localStorage.setItem("numChildren", JSON.stringify(params.get("numChildren")));
      localStorage.setItem("numRooms", JSON.stringify(params.get("numRooms")));
      localStorage.setItem("room_uid", JSON.stringify(props.uid));
      localStorage.setItem("dest_uid", JSON.stringify(params.get("dest_uid")));
      localStorage.setItem("hotel_uid", JSON.stringify(params.get("hotel_uid"))); 
      navigate(`/booking`);
    }

    const images = [];
    for (let i = 0; i < props.images.length; i++) {
      images.push({original: (props.images[i].high_resolution_url ? props.images[i].high_resolution_url : props.images[i].url) , thumbnail: props.images[i].url, thumbnailWidth: 1280, thumbnailHeight: 720});
    }

  return (<Flex shadow="base" backgroundColor="white" borderRadius="md" h="100%" p="2">
    <Box w={{base: "50%", md: "30%"}} h="100%">
      <Flex>
        <ImageGallery 
          items={images} 
          showPlayButton={false} 
          showThumbnails={false} 
          renderLeftNav={(onClick, disabled) => (
            <CustomLeftNav onClick={onClick} disabled={disabled} />
          )}
          renderRightNav={(onClick, disabled) => (
            <CustomRightNav onClick={onClick} disabled={disabled} />
          )}
        />
      </Flex>
    </Box>
    <Stack align="top" p="2" h={{base: "100%", md: "250px"}} w={{base: "50%", md: "70%"}} direction={{ base: 'column', md: 'row' }} divider={<StackDivider borderColor='#F5F4F1' borderWidth="1px"/>}>
        <Stack p="2" direction="column" w={{base: "100%", md: "60%"}} align="top">
            <Heading size="md">{props.name}</Heading>
            <FreeCancellation data={props.free_cancellation}/>
            <RoomInfoPopup name= {props.description} content={props.long_description} amenities={props.amenities} />
        </Stack>
        <Stack align="center" p="2" w={{base: "100%", md: "40%"}} direction={{base: "row", md: "column"}}>
          <Stack direction="column" w={{base: "50%", md: "100%"}} h="100%">
            <Text size="sm" fontWeight={"bold"} fontSize={20} color={"gray.700"}>SGD {props.price}</Text>
            <Text size="sm" fontWeight={"semibold"} color="teal.500">Earn {props.points} points!</Text>
          </Stack>
          <Stack direction="column" w={{base: "50%", md: "100%"}} h="100%">
            <Button name="button_bookRoom" colorScheme="teal" variant="solid" onClick={toPaymentsPage}>
              Book Now
            </Button>
          </Stack>
        </Stack>
    </Stack>             
</Flex>);
}


function FreeCancellation(props) {
  if (props.free_cancellation === "true") {
    return (
    <Center>
      <Text fontSize={"xl"} color={"green.500"} >Free Cancellation Available</Text>
    </Center>
    )
  }

  else {
    return (
    
      <Text fontSize={"sm"} color={"gray.500"} >No Free Cancellation Available</Text>
  )}
}


export default class HotelDetails extends Component {
  constructor(props) {
    super(props);
    this.params = props.params;

    this.state = {
        selectedRoom: "",
        hotel: {"completed": false, "hotel_details": {}, "rooms":[]}, 
        //hotel_details contain static hotel data, rooms contain list of objects for each room
    };

    this.setHotel = this.setHotel.bind(this);
}

  setHotel(hotel) {
      this.setState({hotel: hotel});
  }

  componentDidMount() {
      // TODO: Figure out why its triggering twice
      this.updateTimer = setInterval(() => getHotel(this.params, this.setHotel), 2000);
  }

  componentWillUnmount() {
      clearInterval(this.updateTimer);
  }

  render() {
    console.log("completed? :", this.state.hotel.completed);
    console.log("hotel_details: ",this.state.hotel.hotel_details);
    console.log("rooms: ", this.state.hotel.rooms);

    if (this.state.hotel.completed === true) {
        clearInterval(this.updateTimer);
    }

    if (this.state.hotel.rooms.length > 0) {
      return ( //display static hotel info
        <Stack name="HotelDetails" w={{base: "100%", lg: "70%"}} h="100%" pr="3" mt="2">
          <HotelInfo
            hotel_details = {this.state.hotel.hotel_details}
            price = {this.state.hotel.rooms[0].price}
            points = {this.state.hotel.rooms[0].points}
          />
          <Spacer />
          <Box backgroundColor={"white"} p={4} borderRadius={5} shadow={"base"} dangerouslySetInnerHTML={{__html: this.state.hotel.hotel_details.description}}/>
          <Spacer />
          <Box w="100%">
            <HotelMap
                pos = {[this.state.hotel.hotel_details.latitude, this.state.hotel.hotel_details.longitude]}
                name={this.state.hotel.hotel_details.name}
            />
          </Box>
          <Spacer />
          { this.state.hotel.rooms.map((room) => {
            return (  //display each room's info
              <Box h="100%">
                <Card
                  name={room["name"]}
                  hotelName={this.state.hotel.hotel_details.name}
                  description={room["description"]}
                  long_description={ (room["long_description"] !== "") ? room["long_description"] : room["description"]}
                  price={room["price"]}
                  images={room["photo"]}
                  points={room["points"]}
                  uid={room["uid"]}
                  amenities={room["amenities"]} 
                />
              </Box>
            )})}
        </Stack>          
      );
    } else if (this.state.hotel.completed === false) {
      return (<Box w="100%" h="100vh">
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
      return (<Box w="100%" h="100vh">
      <Center w="100%" h="100%">
              <Heading size="lg">
                  No hotel found!
              </Heading>
          </Center>
      </Box>);
    }
  }
}