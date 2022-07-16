import { Box, Center, Flex, Text, Select, Stack, Button, Heading, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";
import { RangeDatepicker } from "chakra-dayzed-datepicker";
import Autocomplete from "./Autocomplete";
import { getDestinations } from "../api/services/destinations";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function addLeadingZeros(n) {
    if (n <= 9) {
      return "0" + n;
    }
    return n
}

function formatDate(date) {
    return date.getFullYear() + "-" + addLeadingZeros(date.getMonth() + 1) + "-" + addLeadingZeros(date.getDate())
}

export default function SearchBar(props) {
    const navigate = useNavigate();
    
    // TODO: Load data from local storage and load reasonable defaults if not present

    const searchRoute = () => {
        // TODO: Add error checking for invalid UIDs
        // TODO: Store data to local storage        
        // navigate(`/hotels?${selectedDestination}?checkInDate=${selectedDates[0]}&checkOutDate=${selectedDates[1]}&guests=${numAdults + numChildren}&currency=${currency}`);
        navigate(`/hotels?uid=${selectedDestination}&checkInDate=${formatDate(selectedDates[0])}&checkOutDate=${formatDate(selectedDates[1])}&guests=${numAdults + numChildren}&currency=SGD`);
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
        <Box overflow="hidden" bgColor="white" align="center">
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}>
                    <Stack>
                        <Flex align="center" gap="5"  p={{ base: 0, lg: 2 }} w="100%" direction={{ base: 'column', lg: 'row' }}>
                            <Stack>
                                <Text ml={2}>Destination or Hotel</Text>
                                <Text ml={2}> {props.params.get("destination")} </Text>
                            </Stack>

                            <Stack>
                                <Text ml={2}>Check In</Text>
                                <Text>{props.params.get("checkInDate")}</Text>
                            </Stack>

                            <Stack>
                                <Text ml={2}>Check Out</Text>
                                <Text>{props.params.get("checkOutDate")}</Text>
                            </Stack>
                            
                            <Stack>
                                <Text>Rooms</Text>
                                <Text>{props.params.get("numRooms")}</Text>
                            </Stack>
                            
                            <Stack>
                                <Text>Adults</Text>
                                <Text>{props.params.get("numAdults")}</Text>
                            </Stack>
                            
                            <Stack>
                                <Text>Children</Text>
                                <Text>{props.params.get("numChildren")}</Text>
                            </Stack>
                        </Flex>
                    </Stack>
            </Flex>
        </Box>
    );
}
