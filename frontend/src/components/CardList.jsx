import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Flex, Heading, Image, Stack, Text, Button, Box, Center, Spinner, Show, StackDivider, useBreakpointValue, Spacer } from "@chakra-ui/react"
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
    return (<Flex name="HotelCard" onClick={searchHotel} cursor={"pointer"} mt={1} mb={1} shadow={"base"} background="white">
        <Image boxSize="150px" objectFit="cover" w="25%" src={props.image} fallbackSrc="https://via.placeholder.com/150"/>
        <Stack align="center" w="75%" direction={{ base: 'column', md: 'row' }} divider={<StackDivider borderColor='#F5F4F1' borderWidth="1px"/>}>
            <Stack p="2" direction="column" w="70%">
                <Heading size="md">{props.name}</Heading>
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
                    />
                    <Spacer />
                    <Text>
                        {props.review}
                    </Text>
                </Flex>
                
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

export default function CardList(props) {
    if (props.hotels.hotels.length > 0) {
        return (
            <Box w="100%" h="100%">
                <Stack id="card-stack" w='100%' h='100%' pr="2" divider={<StackDivider borderColor='#898989' borderWidth="1px"/>}>
                    <InfiniteScroll
                    dataLength={props.displayedLength}
                    next={props.fetchMoreData}
                    hasMore={true}
                    loader={<h4>Please Wait...</h4>}
                    scrollableTarget="hotels-box"
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


