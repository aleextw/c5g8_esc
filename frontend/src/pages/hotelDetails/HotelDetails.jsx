import { useLocation, useNavigate } from "react-router-dom";
import { Component } from "react";
import { getHotel } from "../../api/services/destinations";
import HotelInfo from "../hotelDetails/hotelInfo/HotelInfo";
import HotelRooms from "../hotelDetails/hotelRooms/HotelRooms";
import HotelMap from "../hotelDetails/hotelMap/HotelMap"
import { Flex, Heading, Image, Stack, Text, Button, Box, Center, Spacer,AspectRatio } from "@chakra-ui/react"

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
      this.updateTimer = setInterval(() => getHotel(this.params, this.setHotel), 10000);
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
        <Box>
        <HotelInfo
          hotel_details = {this.state.hotel.hotel_details}
        />
        <Spacer />
        <AspectRatio ratio={16 / 9}>
          <HotelMap
            lat={this.state.hotel.hotel_details.latitude}
            long={this.state.hotel.hotel_details.longitude}
            name={this.state.hotel.hotel_details.name}
          />
        </AspectRatio>
          { this.state.hotel.rooms.slice(0, this.state.hotel.rooms.length).map((room) => {
                  return (  //display each room's info
                    <li>
                      <HotelRooms
                        name={room["name"]}
                        description={room["description"]}
                        price={room["price"]}
                        images={room["images"]} />
                    </li>
                  )})}
        </Box>                  
      );
    } else {
      return (<Box>
        <Center>
            <Heading size="lg">
                No hotel found!
            </Heading>
        </Center>
      </Box>);
    }
  }
}
