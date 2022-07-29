import { useLocation, useNavigate } from "react-router-dom";
import React, { Component } from "react";
import { getHotels } from "../api/services/destinations";
import { Flex, Heading, Image, Stack, Text, Button, Box, Center, Spinner, Show, StackDivider } from "@chakra-ui/react"
import InfiniteScroll from "react-infinite-scroll-component";
import ReactStars from "react-rating-stars-component";

function formatDistance(distance) {
    if (distance < 1000) {
        return Math.round(distance * 100) / 100 + " m";
    } else {
        return Math.round(distance / 1000 * 100) / 100 + " km";
    }
}
function compareObjects(object1, object2, key) {
    const obj1 = object1[key]
    const obj2 = object2[key]
  
    if (obj1 < obj2) {
      return -1
    }
    if (obj1 > obj2) {
      return 1
    }
    return 0
}
function getFilteredKey(hotels, filters, key) { 
    return hotels.filter((item) => item[key]<=filters[0] && item[key]>=filters[1]);
}

function Card(props) {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    
    const navigate = useNavigate();
    const searchHotel = () => {
        navigate(`/hotel?hotel_uid=${props.uid}&destination=${params.get("destination")}&dest_uid=${params.get("dest_uid")}&checkInDate=${params.get("checkInDate")}&checkOutDate=${params.get("checkOutDate")}&numRooms=${params.get("numRooms")}&numAdults=${params.get("numAdults")}&numChildren=${params.get("numChildren")}&currency=${params.get("currency")}`);
    }

    return (<Flex name="HotelCard" onClick={searchHotel} cursor={"pointer"} mt={1} mb={1} shadow={"base"} background="white">
        <Image boxSize="150px" objectFit="cover" w="25%" src={props.image} fallbackSrc="https://via.placeholder.com/150"/>
        <Stack align="center" w="75%" direction={{ base: 'column', md: 'row' }} divider={<StackDivider borderColor='#F5F4F1' borderWidth="1px"/>}>
            <Stack p="2" direction="column" w="70%">
                <Heading size="md">{props.name}</Heading>
                <Show above="md">
                    <Text>{props.address}</Text>
                    <Text>{formatDistance(props.distance)} from city centre</Text>
                </Show>
                <ReactStars
                    count={5}
                    value={props.rating}
                    edit={false}
                    size={24}
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                  />
                {/* TODO: Add map modal */}
                {/* TODO: Add review */}
            </Stack>
            <Stack p="2" w="30%" direction="column">
                {/* <Heading size="sm">C5G8</Heading> */}
                <Text size="sm">{localStorage.getItem("currency")} {props.price}</Text>
                <Text>Earn at least {props.points} points</Text>
                <Show above="md">
                    <Button name="button_bookHotel" onClick={searchHotel}>Book Deal</Button>
                </Show>
            </Stack>
        </Stack>             
    </Flex>);
}

export default class CardList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filteredHotels: [],
            selectedHotel: props.selectedHotel,
            setPrices: [],
            priceRange: props.priceRange,
            starsRange: props.starsRange,
            sort: props.sort,
            hotels: {"completed": false, "hotels": []},
            params: props.params
        };

        this.setHotels = this.setHotels.bind(this);
    }

    setHotels(hotels) {
        // TODO: Add completed checking
        this.setState({hotels: hotels});
        this.setState({items: hotels.hotels.slice(0,11)})
    }

    fetchMoreData = () => {
        const cardLength = this.state.items.length;
        this.setState({
            items: this.state.hotels.hotels.slice(0, cardLength+10)
          });
      };

    componentDidMount() {
        // TODO: Figure out why its triggering twice
        this.updateTimer = setInterval(() => getHotels(this.state.params, this.setHotels), 2000);
    }

    componentWillUnmount() {
        clearInterval(this.updateTimer);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.params.get("destination") !== this.props.params.get("destination")) {
            this.setState({params: this.props.params, hotels: {"completed": false, "hotels": []}});
            
        }
        if (prevProps.selectedHotel !== this.props.selectedHotel) {
            console.log("Hotel Filter changed");
            // this.setState({hotels: hotels.get("hotels").get()})
        }
        if (prevProps.priceRange !== this.props.priceRange) {
            console.log("Price Filter changed");
            // this.setState({hotels: {"completed": false, "hotels": getFilteredKey(this.state.hotels.hotels, this.props.priceRange, 'price')}});
        }
        if (prevProps.starsRange !== this.props.starsRange) {
            console.log("Stars Filter changed");
        }
        if (prevProps.sort !== this.props.sort) {
            console.log("Sorting changed to value: "+ this.props.sort);
            if (this.props.sort == 0) {
                // console.log("Best deal selected");
                // this.setState({hotels: {"completed": false, "hotels": this.state.hotels.hotels
                // .sort((a, b) => {
                //     return compareObjects(b, a, 'points')
                //   })}})
            }
            if (this.props.sort == 1) {
                console.log("Price low to high selected");
                this.setState({ hotels: {"completed": false, "hotels": this.state.hotels.hotels
                .sort((a, b) => {
                    return compareObjects(a, b, 'price')
                  })}})
            }
            if (this.props.sort == 2) {
                console.log("Price high to low selected");
                this.setState({ hotels: {"completed": false, "hotels": this.state.hotels.hotels
                .sort((a, b) => {
                    return compareObjects(b, a, 'price')
                  })}})
            }
            if (this.props.sort == 3) {
                console.log("Stars low to high selected");
                this.setState({ hotels: {"completed": false, "hotels": this.state.hotels.hotels
                .sort((a, b) => {
                    return compareObjects(a, b, 'rating')
                  })}})
                
            }
            if (this.props.sort == 4) {
                console.log("Stars high to low selected");
                this.setState({ hotels: {"completed": false, "hotels": this.state.hotels.hotels
                .sort((a, b) => {
                    return compareObjects(b, a, 'rating')
                  })}})
            }
            if (this.props.sort == 5) {
                console.log("Distance selected");
                this.setState({ hotels: {"completed": false, "hotels": this.state.hotels.hotels
                .sort((a, b) => {
                    return compareObjects(a, b, 'distance')
                  })}})
            }
            
            console.log(this.state.hotels.hotels)
        }

    }

    render() {
        console.log(this.state.hotels.completed);
        console.log(this.state.hotels.hotels.length);
        if (this.state.hotels.completed === true) {
            clearInterval(this.updateTimer);
        }
        
        if (this.state.hotels.hotels.length > 0) {
            return (
                <Box w="100%" h={{base: "80vh", lg:"80vh", md: "70vh", sm: "70vh"}}>
                    <Stack id="card-stack" w='100%' h='100%' overflowY='scroll' pr="2" className="hotels-list" divider={<StackDivider borderColor='#898989' borderWidth="1px"/>}>
                        <InfiniteScroll
                        dataLength={this.state.items.length}
                        next={this.fetchMoreData}
                        hasMore={true}
                        loader={<h4>Please Wait...</h4>}
                        scrollableTarget="card-stack"
                        >

                            { this.state.items.map((hotel) => {
                        return (
                            <Card 
                                searchRank={hotel["searchRank"]}
                                price={hotel["price"]}
                                points={hotel["points"]}
                                latitude={hotel["latitude"]}
                                longitude={hotel["longitude"]}
                                distance={hotel["distance"]}
                                name={hotel["name"]}
                                address={hotel["address"]}
                                rating={hotel["rating"]}
                                review={hotel["review"]}
                                image={hotel["photo"]}
                                uid={hotel["uid"]}
                            />      
                        )
                    })}

                        </InfiniteScroll>
                    </Stack>
                </Box>);

        } else if (this.state.hotels.completed === false) {
            return (<Box w="100%" h="80vh">
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
        return (<Box w="100%" h="80vh">
            <Center w="100%" h="100%">

                    <Heading size="lg">
                        No hotels found!
                    </Heading>
                </Center>
            </Box>);
        }
    }
}

