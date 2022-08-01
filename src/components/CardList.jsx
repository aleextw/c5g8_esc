import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import { Flex, Heading, Image, Stack, Text, Button, Box, Center, Spinner, Show, StackDivider, Spacer, AspectRatio } from "@chakra-ui/react"
import InfiniteScroll from "react-infinite-scroll-component";
import StarRatingComponent from 'react-star-rating-component';

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
        navigate(`/hotel?hotel_uid=${props.uid}&destination=${params.get("destination")}&dest_uid=${params.get("dest_uid")}&checkInDate=${params.get("checkInDate")}&checkOutDate=${params.get("checkOutDate")}&numRooms=${params.get("numRooms")}&numAdults=${params.get("numAdults")}&numChildren=${params.get("numChildren")}&currency=${params.get("currency")}`);
    }

    return (
    <Flex h="200px" maxW="1000px" name="HotelCard" onClick={searchHotel} cursor={"pointer"} mt={3} shadow={"base"} background="white" borderRadius={"8px"}>
        <AspectRatio w="200px" ratio={1 / 1}>
            <Image boxSize="200px" objectFit="cover" src={props.image} fallbackSrc="https://via.placeholder.com/150"/>
        </AspectRatio>
        <Stack align="center" h="200px" w="80%" maxW="800px" direction={{ base: 'column', md: 'row' }} divider={<StackDivider borderColor='#F5F4F1' borderWidth="1px"/>}>
            <Flex p="4" direction="column" w={{base: "100%", md: "60%"}} h={{base: "50%", md: "100%"}} dspacing={"18px"}>
                <Heading size="sm">{props.name}</Heading>
                <Show above="md">
                    <Text>{props.address}</Text>
                    <Text>{formatDistance(props.distance)} from city centre</Text>
                </Show>
                <Flex direction="row" w="100%">
                    <StarRatingComponent 
                        name={`${props.uid}-star`}
                        editing={false}
                        starCount={5}
                        value={props.rating}
                        activeColor="#ffd700"
                        color="#D3D3D3"
                    />
                    <Spacer />
                    <Text>
                        {props.review}
                    </Text>
                </Flex>
                
            </Flex>
            <Flex p="4" w={{base: "100%", md: "40%"}} h={{base: "50%", md: "100%"}} direction="column" alignContents="center">
                <Text w="100%" align={{ base: "right", md: "center" }} fontSize={"18px"} fontWeight={"bold"}>{localStorage.getItem("currency")} {props.price}</Text>
                    <Spacer />
                <Text w="100%" align={{ base: "right", md: "center" }} fontWeight={"medium"} color={"teal.500"}>Earn at least {props.points} points</Text>
                    <Spacer />
                <Show above="md">
                    <Button name="button_bookHotel" colorScheme={"teal"} onClick={searchHotel}>Book Deal</Button>
                </Show>
            </Flex>
        </Stack>             
    </Flex>);
}

export default function CardList(props) {
    if (props.hotels.hotels.length > 0) {
        return (
            <Box w="100%" h="100%">
                <Stack id="card-stack" w='100%' h='100%' pr="2">
                    <InfiniteScroll
                    dataLength={props.displayedLength}
                    next={props.fetchMoreData}
                    hasMore={true}
                    loader={<h4>Please Wait...</h4>}
                    scrollableTarget="hotels-box"
                    className="CardList" 
                    >

                        { props.hotels.hotels.map((hotel) => {
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

    } else if (props.hotels.completed === false) {
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


