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
    Spacer
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import { useState, useEffect } from 'react';
import React from 'react';
import { useNavigate } from "react-router-dom";

export default function BookingSearch() {
    const navigate = useNavigate();
    const [uid, setUid] = useState("");
    const [error, setError] = useState(false);

    const goToBooking = () => {
        if (uid !== "") {
            navigate(`/summary?booking_uid=${uid}`);
        } else {
            setError(true);
        }
    };

    return (
        <ChakraProvider>
          <NavBar/>
          <Box name="bgImage"
            bgImage="https://images.hdqwalls.com/download/1/yosemite-national-park-usa-4k-4r.jpg"
            bgPosition="center"
            bgRepeat="no-repeat"
          >
            
            <Center h="100vh">
                <Box p="5" maxW="1500px" w="70%" borderWidth="1px" borderRadius="lg" overflow="hidden"  bgColor="white">
                    <Stack>
                        <Heading size="md">Enter your Booking UID</Heading>
                        <Flex align="center" gap="5"  p={{ base: 0, lg: 2 }} w="100%" direction={{ base: 'column', lg: 'row' }}>
                            <Stack w={{base: "100%", lg: "33%"}}>
                                <FormControl isInvalid={error}>
                                <Input value={uid} onChange={(e) => setUid(e.target.value)}/>
                                    {error && <FormErrorMessage>Booking UID is required.</FormErrorMessage>}
                                </FormControl>
                            </Stack>
                        </Flex>
                        <Button name="dest_search_submit" onClick={ goToBooking } colorScheme="red">Submit</Button>
                    </Stack>
                </Box>
            </Center>
          </Box>
        </ChakraProvider>
      );
}