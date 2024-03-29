import { 
    Box,
    Flex, 
    Text, 
    Select, 
    Stack, 
    Button, 
    Heading,
    Center,
    Spinner,
    Alert,
    AlertIcon,
    AlertTitle,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { RangeDatepicker } from "chakra-dayzed-datepicker";
import Autocomplete from "./Autocomplete";
import { getDestinations } from "../api/services/destinations";
import { useNavigate, useLocation } from "react-router-dom";
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
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    
    // TODO: Load data from local storage and load reasonable defaults if not present

    const searchRoute = () => {
        // Load a spinner
        setSearching(true);

        let finalSelectedDestination = "";
        // If searchbar has data, choose the first suggestion if none selected
        if (selectedDestination === "") {
            if (filteredSuggestions.length > 0 && showSuggestions) {
                // Set directly to a temp var rather than update state since state update is async, might not reflect properly
                finalSelectedDestination = filteredSuggestions[activeSuggestion]["uid"];
            } else {
                setSearching(false);

                // No valid suggestion to pick as default, raise error
                setInvalidDestination(true);

                // Clear error after 5 seconds
                setInterval(() => setInvalidDestination(false), 10000);
                return;
            }
        } else {
            finalSelectedDestination = selectedDestination;
        }

        // If checkInDate and checkOutDate are the same, raise another error
        if (selectedDates.length < 2 || selectedDates[0] === selectedDates[1]) {
            setSearching(false);
            setInvalidDates(true);

            // Clear error after 5 seconds
            setInterval(() => setInvalidDates(false), 10000);
            return;
        }

        if (props.onClick) {
            props.onClick();
        }
        
        setSearching(false);
        setTimeout(() => window.location.reload(), 100);
        navigate(`/hotels?destination=${destinations.find(d => d.uid === finalSelectedDestination).term}&dest_uid=${finalSelectedDestination}&checkInDate=${formatDate(selectedDates[0])}&checkOutDate=${formatDate(selectedDates[1])}&numRooms=${numRooms}&numAdults=${numAdults}&numChildren=${numChildren}&currency=${sessionStorage.getItem("currency")}`);
    }

    const today = new Date();
    const initDates = [new Date(today), new Date(today)];
    initDates[0].setDate(initDates[0].getDate() + 1);
    initDates[1].setDate(initDates[1].getDate() + 2);
    const [selectedDates, setSelectedDates] = useState(params.get("checkInDate") ? [new Date(params.get("checkInDate")), new Date(params.get("checkOutDate"))] : initDates);
    const [selectedDestination, setSelectedDestination] = useState(params.get("dest_uid") ? params.get("dest_uid") : "");
    const [destinations, setDestinations] = useState([]);
    const [numRooms, setNumRooms] = useState(params.get("numRooms") ? params.get("numRooms") : 1);
    const [numAdults, setNumAdults] = useState(params.get("numAdults") ? params.get("numAdults") : 2);
    const [numChildren, setNumChildren] = useState(params.get("numChildren") ? params.get("numChildren") : 0);
    const [autocompleteOpenState, setAutocompleteOpenState] = useState(false);

    const [activeSuggestion, setActiveSuggestion] = useState(0);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [userInput, setUserInput] = useState(params.get("destination") ? params.get("destination") : "");
    
    const [searching, setSearching] = useState(false);

    const [invalidDestination, setInvalidDestination] = useState(false);
    const [invalidDates, setInvalidDates] = useState(false);

    useEffect(() => {
        getDestinations(setDestinations);
    }, []);

    const onChange = e => {
        const userInput = e.currentTarget.value;
        let filteredSuggestions;
        if (userInput.length > 1) {
            // Filter our suggestions that don't contain the user's input
            filteredSuggestions = destinations.filter(
                destination => {
                    return destination["term"].toLowerCase().indexOf(userInput.toLowerCase()) > -1
                }
            );
        }
    
        setActiveSuggestion(0);
        setFilteredSuggestions(filteredSuggestions);
        setShowSuggestions(true);
        setUserInput(e.currentTarget.value);
      };
    
    const onClick = e => {
            setActiveSuggestion(0);
            setFilteredSuggestions([]);
            setShowSuggestions(false);
            setUserInput(e.currentTarget.innerText);
            setSelectedDestination(e.currentTarget.id);
      };
    
    const onKeyDown = e => {    
        // User pressed the enter key
        if (e.keyCode === 13) {
            setActiveSuggestion(0);
            setShowSuggestions(false);
            setUserInput(filteredSuggestions[activeSuggestion]["term"]);
            setSelectedDestination(filteredSuggestions[activeSuggestion]["uid"]);
        }
        // User pressed the up arrow
        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }
            setActiveSuggestion(activeSuggestion - 1);
        }
        // User pressed the down arrow
        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }
            setActiveSuggestion(activeSuggestion + 1);
        }
    };

    const handleRooms = (event) => setNumRooms(event.target.value);
    const handleAdults = (event) => setNumAdults(event.target.value);
    const handleChildren = (event) => setNumChildren(event.target.value);

    return (
        <Box p="5" maxW="1500px" borderWidth="1px" borderRadius="lg" overflow="hidden"  bgColor="white">
            <Stack>
                <Heading size="md">Find your dream destination.</Heading>
                <Flex align="center" gap="5"  p={{ base: 0, lg: 2 }} w="100%" direction={{ base: 'column', lg: 'row' }}>
                    <Stack w={{base: "100%", lg: "33%"}}>
                        <Text ml={2}>Destination or Hotel</Text>
                        <Autocomplete 
                            suggestions={destinations} 
                            open={autocompleteOpenState}
                            onFocus={setAutocompleteOpenState} 
                            placeholder="Destination or Hotel" 
                            activeSuggestion={activeSuggestion}
                            filteredSuggestions={filteredSuggestions}
                            showSuggestions={showSuggestions}
                            userInput={userInput}
                            onChange={onChange}
                            onClick={onClick}
                            onKeyDown={onKeyDown}
                            setInvalidDestination={setInvalidDestination}
                            />
                    </Stack>

                    <Stack w={{base: "100%", lg: "33%"}} onClick={e => {setAutocompleteOpenState(false); setInvalidDates(false);}}>
                        <Text ml={2}>Dates of Stay</Text>
                            <RangeDatepicker
                                name="date_picker"
                                selectedDates={selectedDates}
                                // usePortal={true}
                                onDateChange={setSelectedDates}
                                minDate={new Date()}
                            />
                    </Stack>

                    <Flex direction="horizontal" gap="3" w={{base: "100%", lg: "33%"}}>
                        <Stack w="33%">
                            <Text>Rooms</Text>
                            <Select value={numRooms} onClick={e => {setAutocompleteOpenState(false); console.log(autocompleteOpenState);}} onChange={handleRooms} name="rooms">
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                            </Select>
                        </Stack>
                        
                        <Stack w="33%">
                            <Text>Adults</Text>
                            <Select value={numAdults} onClick={e => setAutocompleteOpenState(false)} onChange={handleAdults} name="num_adults">
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                            </Select>
                        </Stack>
                        
                        <Stack w="33%">
                            <Text>Children</Text>
                            <Select value={numChildren} onClick={e => setAutocompleteOpenState(false)} onChange={handleChildren} name="num_children">
                                <option value='0'>0</option>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                            </Select>
                        </Stack>
                    </Flex>
                </Flex>
                <Center w="100%">
                    {searching && <Spinner />}
                </Center>
                <Center w="100%">
                    {invalidDestination && <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle>Error: Please pick a valid destination.</AlertTitle>
                    </Alert>}
                </Center>
                <Center w="100%">
                    {invalidDates && <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle>Error: Please pick valid dates.</AlertTitle>
                    </Alert>}
                </Center>
                <Button name="dest_search_submit" onClick={ searchRoute } colorScheme="red">Submit</Button>
            </Stack>
        </Box>
    );
}
