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
      if (this.state.hotel.completed === true) {
          clearInterval(this.updateTimer);
      }

      if (this.state.hotel.rooms.length > 0) {
          return ( //display static hotel info
            <Box>
            <HotelInfo
              name={this.state.hotel.hotel_details.name}
              address={this.state.hotel.hotel_details.address}
              stars={this.state.hotel.hotel_details.stars}
              rating={this.state.hotel.hotel_details.rating}
              images={this.state.hotel.hotel_details.images}
              hotelDescription={this.state.hotel.hotel_details.description}
            />
            <Spacer />
            <AspectRatio ratio={16 / 9}>
              <HotelMap
                lat={this.state.hotel.hotel_details.lat}
                long={this.state.hotel.hotel_details.long}
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
    }

    else {
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
