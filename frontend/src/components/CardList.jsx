import { useLocation, useNavigate } from "react-router-dom";
import { Component } from "react";
import { getHotels } from "../api/services/destinations";
import { Flex, Heading, Image, Stack, Text, Button, Box, Center, Spacer, Spinner, UnorderedList, ListItem, Show, StackDivider } from "@chakra-ui/react"
import InfiniteScroll from "react-infinite-scroll-component";

function formatDistance(distance) {
    if (distance < 1000) {
        return Math.round(distance * 100) / 100 + " m";
    } else {
        return Math.round(distance / 1000 * 100) / 100 + " km";
    }
}

function Card(props) {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    
    const navigate = useNavigate();
    const searchHotel = () => {
        console.log(props.name);
        console.log(props);
        console.log(props.uid);
        // TODO: Add error checking for invalid UIDs
        // TODO: Store data to local storage        
        // navigate(`/hotels?${selectedDestination}?checkInDate=${selectedDates[0]}&checkOutDate=${selectedDates[1]}&guests=${numAdults + numChildren}&currency=${currency}`);
        navigate(`/hotel?hotel_uid=${props.uid}&destination=${params.get("destination")}&dest_uid=${params.get("dest_uid")}&checkInDate=${params.get("checkInDate")}&checkOutDate=${params.get("checkOutDate")}&numRooms=${params.get("numRooms")}&numAdults=${params.get("numAdults")}&numChildren=${params.get("numChildren")}&currency=SGD`);
        // navigate(`/hotel?hotel_uid=${props.uid}&dest_uid=${params.get("uid")}&checkInDate=${params.get("checkInDate")}&checkOutDate=${params.get("checkOutDate")}&guests=${params.get("guests")}&currency=SGD`);
    }

    return (<Flex  name="HotelCard" onClick={searchHotel} cursor={"pointer"} mt={5} mb={5} shadow={"base"}>
        <Image boxSize="150px" objectFit="cover" w="25%" src={props.image} />
        <Stack align="center" w="75%" direction={{ base: 'column', md: 'row' }} divider={<StackDivider borderColor='#F5F4F1' borderWidth="1px"/>}>
            <Stack p="2" direction="column" w={{base: "100%", md: "60%", sm:"60%"}}>
                <Heading size="md">{props.name}</Heading>
                <Show above="md">
                    <Text>{props.address}</Text>
                    <Text>{formatDistance(props.distance)} from city centre</Text>
                </Show>
                {/* TODO: Add rating */}
                {/* TODO: Add map modal */}
                {/* TODO: Add review */}
            </Stack>
            <Stack p="2" w={{base: "100%", md: "40%", sm: "60%"}} direction="column">
                {/* <Heading size="sm">C5G8</Heading> */}
                <Text size="sm">SGD {props.price}</Text>
                <Text>Earn at least {props.points} points</Text>
                <Show above="md">
                    <Button onClick={searchHotel}>Book Deal</Button>
                </Show>
            </Stack>
        </Stack>             
    </Flex>);
}

export default class CardList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedHotel: "",
            hotels: {"completed": false, "hotels": []},
            starRating: "",
            reviewRange: [],
            priceRange: [],
            typeFilter: [],
            items: [],
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
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        const cardLength = this.state.items.length;
        console.log("fetching more data");
        setTimeout(() => {
          this.setState({
            items: this.state.items.concat(this.state.hotels.hotels.slice(cardLength, cardLength+10))
          });
        }, 1500);
        console.log("more data fetched, items: ", this.state.items);
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
                    <Stack id="card-stack" w='100%' h='100%' overflowY='scroll' className="hotels-list" backgroundColor="white" divider={<StackDivider borderColor='#898989' borderWidth="1px"/>}>
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

