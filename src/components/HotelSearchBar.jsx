import { Box, Center, Flex, Text, Select, Stack, Button, Heading, useColorModeValue, VStack, StackDivider, Show, HStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { getDestinations } from "../api/services/destinations";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";

function addLeadingZeros(n) {
    if (n <= 9) {
      return "0" + n;
    }
    return n
}

function formatDate(date) {
    return date.getFullYear() + "-" + addLeadingZeros(date.getMonth() + 1) + "-" + addLeadingZeros(date.getDate())
}


export default function HotelsSearchBar(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    
    // TODO: Load data from local storage and load reasonable defaults if not present

    const searchRoute = () => {
        params.delete("hotel_uid");
        navigate("/hotels?" + params.toString());
    }

    const [selectedDates, setSelectedDates] = useState([new Date(), new Date()]);
    const [selectedDestination, setSelectedDestination] = useState("");
    const [destinations, setDestinations] = useState([]);
    const [numRooms, setNumRooms] = useState(1);
    const [numAdults, setNumAdults] = useState(2);
    const [numChildren, setNumChildren] = useState(0);
    // const [currency, setCurrency] = useState("SGD");
    
    useEffect(() => {
        getDestinations(setDestinations);
    }, []);


    return (
        <Box
            h="100%"
            overflow="hidden" 
            bgColor="white" 
            align="center"
            borderBottom={1}
            borderStyle={'solid'}
            borderColor={useColorModeValue('gray.200', 'gray.900')}
            w="100%">
            <Center 
                as="button"
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                h="100%"
                py={{ base: 2 }}
                px={{ base: 4 }}
                align={'center'}
                onClick={searchRoute}
            >
                <Show above="md">
                <Stack name="goback_HotelSearchBar" direction="horizontal" align="center" gap="5" p={{ base: 0, lg: 2 }} divider={<StackDivider borderColor='grey.200' borderRightWidth="0.1rem"/>}>
                        <VStack>
                            <ArrowBackIcon></ArrowBackIcon>
                            <Text>Edit</Text>
                        </VStack>

                        <VStack>
                            <Text>Destination or Hotel</Text>
                            <Text>{props.params.get("destination")}</Text>
                        </VStack>

                        <VStack>
                            <Text>Check In</Text>
                            <Text>{props.params.get("checkInDate")}</Text>
                        </VStack>

                        <VStack>
                            <Text>Check Out</Text>
                            <Text>{props.params.get("checkOutDate")}</Text>
                        </VStack>
                        
                        <VStack>
                            <Text>Rooms</Text>
                            <Text>{props.params.get("numRooms")}</Text>
                        </VStack>
                        
                        <VStack>
                            <Text>Adults</Text>
                            <Text>{props.params.get("numAdults")}</Text>
                        </VStack>
                        
                        <VStack>
                            <Text>Children</Text>
                            <Text>{props.params.get("numChildren")}</Text>
                        </VStack>
                    </Stack>
                </Show>
                <Show below="md">
                    <HStack w="100%" divider={<StackDivider borderColor='grey.200' borderWidth="0.05rem"/>}>
                        <VStack>
                            <ArrowBackIcon></ArrowBackIcon>
                            <Text>Edit</Text>
                        </VStack>
                        <VStack w="100%">
                            <Heading w="100%" size="sm" color="black" align="left">{props.params.get("destination")}</Heading>
                            <Text w="100%" align="left">{new Date(props.params.get("checkInDate")).toLocaleDateString('en-us', {day:"numeric", month:"short"})} - {new Date(props.params.get("checkOutDate")).toLocaleDateString('en-us', {day:"numeric", month:"short"})}, {props.params.get("numRooms")} room(s), {Number(props.params.get("numAdults")) + Number(props.params.get("numChildren"))} guest(s) per room</Text>
                        </VStack>
                    </HStack>
                </Show>
                    
            </Center>
        </Box>
    );
}
