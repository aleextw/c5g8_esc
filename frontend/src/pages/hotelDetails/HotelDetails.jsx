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
      localStorage.setItem("roomName", JSON.stringify(props.description));
      localStorage.setItem("hotelName", JSON.stringify(props.hotelName));
      localStorage.setItem("roomPrice", JSON.stringify(props.price));
      localStorage.setItem("points", JSON.stringify(props.points));
      localStorage.setItem("checkInDate", JSON.stringify(params.get("checkInDate")));
      localStorage.setItem("checkOutDate", JSON.stringify(params.get("checkOutDate")));
      localStorage.setItem("numAdults", JSON.stringify(params.get("numAdults")));
      localStorage.setItem("numChildren", JSON.stringify(params.get("numChildren")));
      localStorage.setItem("numRooms", JSON.stringify(params.get("numRooms")));
      localStorage.setItem("dest_uid", JSON.stringify(params.get("dest_uid")));
      localStorage.setItem("hotel_uid", JSON.stringify(params.get("hotel_uid"))); 
      navigate(`/booking`);
    }

    const images = [];
    for (let i = 0; i < props.images.length; i++) {
      images.push({original: (props.images[i].high_resolution_url ? props.images[i].high_resolution_url : props.images[i].url) , thumbnail: props.images[i].url, thumbnailWidth: 640, thumbnailHeight: 360});
    }

  return (<Flex borderWidth="1px" backgroundColor="white" borderRadius="lg">
    <Box maxW="50%">
      <Container>
        <ImageGallery items={images} useBrowserFullscreen={false} showPlayButton={false}></ImageGallery>
      </Container>
    </Box>
    <Stack align="center" w="75%" direction={{ base: 'column', md: 'row' }} divider={<StackDivider borderColor='#F5F4F1' borderWidth="1px"/>}>
        <Stack p="2" direction="column" w={{base: "100%", md: "60%"}}>
            <Heading size="md">{props.name}</Heading>
            <Show above="md">
                {/* <Text>{props.description}</Text> */}
            </Show>
            <FreeCancellation data={props.free_cancellation}/>
            <Center ml="auto" mr="auto">
              <RoomInfoPopup name= {props.description} content={props.long_description} amenities={props.amenities} />
            </Center>
            {/* TODO: Add rating */}
            {/* TODO: Add map modal */}
            {/* TODO: Add review */}
        </Stack>
        <Stack p="2" w={{base: "100%", md: "40%"}} direction="column">
            {/* <Heading size="sm">C5G8</Heading> */}
            <Text size="sm">SGD {props.price}</Text>
            <Text size="sm" color="teal.500">Earn {props.points} points!</Text>
            <Show above="md">
            <Button colorScheme="teal" variant="solid" onClick={toPaymentsPage}>
              Book Now
            </Button>
            </Show>
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
        <Stack w="70%" h="100%" overflowY='scroll' className="hotels-list">
          <HotelInfo
            hotel_details = {this.state.hotel.hotel_details}
            price = {this.state.hotel.rooms[0].price}
            points = {this.state.hotel.rooms[0].points}
          />
          <Spacer />

          <Box backgroundColor={"white"} p={4} borderRadius={5} shadow={"base"} dangerouslySetInnerHTML={{__html: this.state.hotel.hotel_details.description}}/>

          {<Box w="100%">
            <HotelMap
                pos = {[this.state.hotel.hotel_details.latitude, this.state.hotel.hotel_details.longitude]}
                name={this.state.hotel.hotel_details.name}
            />
          </Box>}
          { this.state.hotel.rooms.slice(0, this.state.hotel.rooms.length).map((room) => {
            return (  //display each room's info
              <Card
                name={room["name"]}
                hotelName={this.state.hotel.hotel_details.name}
                description={room["description"]}
                long_description={ (room["long_description"] !== "") ? room["long_description"] : room["description"]}
                price={room["price"]}
                images={room["photo"]}
                points={room["points"]}
                uid={room["uid"]}
                amenities={room["amenities"]} />
                
            )})}
          <Spacer />
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