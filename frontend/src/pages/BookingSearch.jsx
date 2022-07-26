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
                        <Heading size="md">Enter your Booking UID</Heading>
                        <Stack w="100%">
                            <FormControl isInvalid={error}>
                            <Input value={uid} onChange={(e) => setUid(e.target.value)}/>
                                {error && <FormErrorMessage>Booking UID is required.</FormErrorMessage>}
                            </FormControl>
                        </Stack>
                        <Button maxW="150px" w="100%" name="dest_search_submit" onClick={ goToBooking } colorScheme="red">Submit</Button>
                    </Flex>
                    </Box>
              </Center>
            </Box>
          </Box>  
        </ChakraProvider>
      );
}