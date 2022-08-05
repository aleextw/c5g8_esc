import { 
    Center, 
    Box, 
    ChakraProvider, 
    Heading, 
    Input, 
    VStack,   
    HStack, 
    FormControl,
    FormLabel,
    FormErrorMessage,
    Text,
    Stack,
    Button,
    FormHelperText,
    Flex,
    Spacer,
    StackDivider
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import { useState, useEffect } from 'react';
import React from 'react';
import { useNavigate } from "react-router-dom";
import { getUserBookings } from "../api/services/destinations";

function Card(props) {
    const navigate = useNavigate();
    return (
        <Box 
            p={5}
            onClick={() => {navigate(`/summary?booking_uid=${props.data.booking_ref}`)}}
            cursor={"pointer"}
        >
          <Heading fontSize='xl'>{props.data.hotel_name}</Heading>
          <Text mt={4}>{props.data.room_name}</Text>
        </Box>
      )
}

export default function BookingSearch() {
    const navigate = useNavigate();
    const [uid, setUid] = useState("");
    const [error, setError] = useState(false);
    const [bookings, setBookings] = useState("");

    const goToBooking = () => {
        if (uid === "" || uid.match(/^[0-9A-Za-z_-]+$/) === null) {
            setError(true);
        } else {
            navigate(`/summary?booking_uid=${uid}`);
        }
    };

    useEffect(() => userBookings(), []);

    const userBookings = () => {
        if (sessionStorage.getItem("token") !== null) {
            getUserBookings(
                JSON.stringify({
                    username: sessionStorage.getItem("username"),
                    token: sessionStorage.getItem("token")
                })
            ).then((data) => {
                if (data.status === 200) {
                    if (data.valid === "") {
                        if (data.bookings.length > 0) {
                            setBookings(
                                (<Stack w="100%" divider={<StackDivider borderColor='gray.200' />}>
                                    <Heading w="100%" align="center" size="md">Your Bookings</Heading>
                                    {data.bookings.map(booking => {
                                        console.log(booking);
                                        return <Card data={booking}></Card>
                                    })}
                                </Stack>)
                            );
                        }
                    }
                }
            }) 
        }
    }

    return (
        <ChakraProvider>      
          <Box h="100vh" w="100wh">
            <Box h="8%" w="100%">
                <NavBar></NavBar>
            </Box>
            <Box name="bgImage"
              bgImage="https://images.hdqwalls.com/download/normandie-frankreich-8k-2o-1920x1080.jpg"
              bgPosition="center"
              bgRepeat="no-repeat"
              h="92%"
            >
            <Center h="100%">
                <Box p="5" maxW="800px" w="70%" borderWidth="1px" borderRadius="lg" overflow="hidden"  bgColor="white">
                    <Flex align="center" gap="5"  p={{ base: 0, lg: 2 }} w="100%" direction="column">
                        <Heading size="md">Enter a Booking UID</Heading>
                        <Stack w="100%">
                            <FormControl isInvalid={error}>
                            <Input name="input_booking_uid" value={uid} onChange={(e) => setUid(e.target.value)}/>
                                {error && <FormErrorMessage>Invalid Booking UID provided.</FormErrorMessage>}
                            </FormControl>
                        </Stack>
                        <Button name="button_findBooking" maxW="150px" w="100%" onClick={ goToBooking } colorScheme="red">Submit</Button>
                    </Flex>
                    </Box>
              </Center>
            </Box>
          </Box>  
        </ChakraProvider>
      );
}