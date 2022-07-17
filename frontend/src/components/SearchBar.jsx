import { 
    Box, 
    Center, 
    Flex, 
    Text, 
    Select, 
    Stack, 
    Button, 
    Heading
} from "@chakra-ui/react";
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

export default function SearchBar() {
    const navigate = useNavigate();
    
    // TODO: Load data from local storage and load reasonable defaults if not present

    const searchRoute = () => {
        // TODO: Add error checking for invalid UIDs
        // TODO: Store data to local storage        
        // navigate(`/hotels?${selectedDestination}?checkInDate=${selectedDates[0]}&checkOutDate=${selectedDates[1]}&guests=${numAdults + numChildren}&currency=${currency}`);
        navigate(`/hotels?destination=${destinations.find(d => d.uid === selectedDestination).term}&dest_uid=${selectedDestination}&checkInDate=${formatDate(selectedDates[0])}&checkOutDate=${formatDate(selectedDates[1])}&numRooms=${numRooms}&numAdults=${numAdults}&numChildren=${numChildren}&currency=SGD`);
    }
    const today = new Date();
    const initDates = [new Date(today), new Date(today)];
    initDates[0].setDate(initDates[0].getDate() + 1);
    initDates[1].setDate(initDates[1].getDate() + 2);
    const [selectedDates, setSelectedDates] = useState(initDates);
    const [selectedDestination, setSelectedDestination] = useState("");
    const [destinations, setDestinations] = useState([]);
    const [numRooms, setNumRooms] = useState(1);
    const [numAdults, setNumAdults] = useState(2);
    const [numChildren, setNumChildren] = useState(0);
    // const [currency, setCurrency] = useState("SGD");
    
    useEffect(() => {
        getDestinations(setDestinations);
    }, []);

    const handleRooms = (event) => setNumRooms(event.target.value);
    const handleAdults = (event) => setNumAdults(event.target.value);
    const handleChildren = (event) => setNumChildren(event.target.value);

    return (
        <Box p="5" maxW="1500px" borderWidth="1px" borderRadius="lg" overflow="hidden"  bgColor="white">
            <Stack>
                <Heading size="md">Find your dream destination.</Heading>
                <Flex align="center" gap="5"  p={{ base: 0, lg: 2 }} w="100%" direction={{ base: 'column', lg: 'row' }}>
                    <Stack>
                        <Text ml={2}>Destination or Hotel</Text>
                        <Autocomplete suggestions={destinations} placeholder="Destination or Hotel" onSelect={setSelectedDestination} />
                    </Stack>

                    <Stack>
                        <Text ml={2}>Dates of Stay</Text>
                        <RangeDatepicker
                            selectedDates={selectedDates}
                            onDateChange={setSelectedDates}
                            minDate={new Date()}
                        />
                    </Stack>

                    <Flex gap="5">
                        <Stack>
                            <Text>Rooms</Text>
                            <Select value={numRooms} onChange={handleRooms}>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                            </Select>
                        </Stack>
                        
                        <Stack>
                            <Text>Adults</Text>
                            <Select value={numAdults} onChange={handleAdults}>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                            </Select>
                        </Stack>
                        
                        <Stack>
                            <Text>Children</Text>
                            <Select value={numChildren} onChange={handleChildren}>
                                <option value='0'>0</option>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                            </Select>
                        </Stack>
                    </Flex>
                </Flex>
                <Button onClick={ searchRoute } colorScheme="red">Submit</Button>
            </Stack>
        </Box>
    );
}
