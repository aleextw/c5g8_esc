import { useLocation, useNavigate } from "react-router-dom";
import { Component } from "react";
import { getHotels } from "../api/services/destinations";
import { Flex, Heading, Image, Stack, Text, Button, Box, Center, Spacer, Spinner } from "@chakra-ui/react"

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
        // TODO: Add error checking for invalid UIDs
        // TODO: Store data to local storage        
        // navigate(`/hotels?${selectedDestination}?checkInDate=${selectedDates[0]}&checkOutDate=${selectedDates[1]}&guests=${numAdults + numChildren}&currency=${currency}`);
        navigate(`/hotels/:id?hotel_uid=${props.uid}&dest_uid=${params.get("uid")}&checkInDate=${params.get("checkInDate")}&checkOutDate=${params.get("checkOutDate")}&guests=${params.get("guests")}&currency=SGD`);
    }

    return (<Flex>
        <Image boxSize="150px" objectFit="cover" w="25%" src={props.image} />
        <Flex align="center" w="75%" direction={{ base: 'column', lg: 'row' }}>
            <Stack p="2" direction="column">
                <Heading size="md">{props.name}</Heading>
                <Text>{props.address}</Text>
                <Text>{formatDistance(props.distance)} from city centre</Text>
                {/* TODO: Add rating */}
                {/* TODO: Add map modal */}
                {/* TODO: Add review */}
            </Stack>
            <Spacer />
            <Stack p="2" maxW="150" direction="column">
                <Heading size="sm">C5G8</Heading>
                <Text>SGD {props.price}</Text>
                <Text>Earn at least {props.points} points</Text>
                <Button onClick={searchHotel}>Book Deal</Button>
            </Stack>
        </Flex>             
    </Flex>);
}

export default class CardList extends Component {
    constructor(props) {
        super(props);
        this.params = props.params;

        this.state = {
            selectedHotel: "",
            hotels: {"completed": false, "hotels": []},
            starRating: "",
            reviewRange: [],
            priceRange: [],
            typeFilter: [],
        };

        this.setHotels = this.setHotels.bind(this);
    }

    setHotels(hotels) {
        // TODO: Add completed checking
        this.setState({hotels: hotels});
    }

    componentDidMount() {
        // TODO: Figure out why its triggering twice
        this.updateTimer = setInterval(() => getHotels(this.params, this.setHotels), 10000);
    }

    componentWillUnmount() {
        clearInterval(this.updateTimer);
    }

    render() {
        console.log(this.state.hotels.completed);
        console.log(this.state.hotels.length);
        if (this.state.hotels.completed === true) {
            clearInterval(this.updateTimer);
        }
        
        if (this.state.hotels.length > 0) {
            return (
                <ul className="hotels">
                { this.state.hotels.hotels.slice(0, 10).map((hotel) => {
                    return (
                        <li key={hotel["uid"]} >
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
                        </li>   
                    )
                })}
                </ul>);
        } else if (this.state.hotels.completed === false) {
            return (<Box>
                <Center>
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
            return (<Box>
                <Center>
                    <Heading size="lg">
                        No hotels found!
                    </Heading>
                </Center>
            </Box>);
        }
    }
}

