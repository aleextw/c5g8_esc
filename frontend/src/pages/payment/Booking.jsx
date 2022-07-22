import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Stack,
  Textarea,
  Tooltip,
  useClipboard,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import React from 'react';
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { postBooking } from '../../api/services/destinations';

export default function Booking() {

  console.log("roomName: ", localStorage.getItem("roomName"));
  console.log("hotelName: ", localStorage.getItem("hotelName"));
  console.log("checkInDate: ", localStorage.getItem("checkInDate"));

  const { hasCopied, onCopy } = useClipboard('example@example.com');

  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ phone, setPhone ] = useState("");
  const [ additionalData, setAdditionalData ] = useState("");

  const navigate = useNavigate();

  const goToSummary = () => {
    const body = {
      name: name.replace(/['"]+/g, ''), 
      email: email.replace(/['"]+/g, ''), 
      phone: phone.replace(/['"]+/g, ''), 
      additionalData: additionalData, 
      roomName: localStorage.getItem("roomName").replace(/['"]+/g, ''),
      hotelName: localStorage.getItem("hotelName"),
      roomPrice: localStorage.getItem("roomPrice"),
      checkInDate: localStorage.getItem("checkInDate").replace(/['"]+/g, ''),
      checkOutDate: localStorage.getItem("checkOutDate").replace(/['"]+/g, ''),
      numAdults: localStorage.getItem("numAdults").replace(/['"]+/g, ''),
      numChildren: localStorage.getItem("numChildren").replace(/['"]+/g, ''),
      numRooms: localStorage.getItem("numRooms").replace(/['"]+/g, ''),
      dest_uid: localStorage.getItem("dest_uid").replace(/['"]+/g, ''),
      hotel_uid: localStorage.getItem("hotel_uid").replace(/['"]+/g, '')
    };

    console.log(body);
    let response;
    postBooking(JSON.stringify(body)).then((data) => {
      response = data;
      console.log(response);
      if (response.status === 200) {
        navigate(`/summary?booking_uid=${response.booking_uid}`);
      }
    });
  }

  const cancelBook = () => {
    navigate(-1);
  }

  return (
    <Flex
        bg={useColorModeValue('gray.100', 'gray.900')}
        align="center"
        justify="center"
        css={{
          backgroundAttachment: 'fixed',
        }}
        id="contact">
        <Box
          borderRadius="lg"
          m={{ base: 5, md: 16, lg: 10 }}
          p={{ base: 5, lg: 16 }}>
          <Box>
            <VStack spacing={{ base: 4, md: 8, lg: 20 }}>
              <ChakraProvider>
                <NavBar/>
                  <Heading
                    fontSize={{
                      base: '4xl',
                      md: '5xl',
                    }}>
                    Booking
                  </Heading>

                  <Stack
                    spacing={{ base: 4, md: 8, lg: 20 }}
                    direction={{ base: 'column', md: 'row' }}>
                    <Box
                      bg={useColorModeValue('white', 'gray.700')}
                      borderRadius="lg"
                      p={8}
                      color={useColorModeValue('gray.700', 'whiteAlpha.900')}
                      shadow="base">
                      <VStack spacing={5}>
                        <FormControl isRequired>
                          <FormLabel>Name</FormLabel>

                          <InputGroup>
                            <InputLeftElement />
                            <Input 
                              type="text" 
                              name="name" 
                              placeholder="Your Name" 
                              value={name}
                              onChange={(event) => setName(event.target.value)}
                            />
                          </InputGroup>
                        </FormControl>

                        <FormControl isRequired>
                          <FormLabel>Email</FormLabel>

                          <InputGroup>
                            <InputLeftElement />
                            <Input
                              type="email"
                              name="email"
                              placeholder="Your Email"
                              value={email}
                              onChange={(event) => setEmail(event.target.value)}
                            />
                          </InputGroup>
                        </FormControl>

                        <FormControl isRequired>
                          <FormLabel>Phone Number</FormLabel>

                          <InputGroup>
                            <InputLeftElement />
                            <Input
                              type="number"
                              name="number"
                              placeholder="Your Number"
                              value={phone}
                              onChange={(event) => setPhone(event.target.value)}
                            />
                          </InputGroup>
                        </FormControl>

                        <FormControl>
                          <FormLabel>Message</FormLabel>

                          <Textarea
                            name="message"
                            placeholder="Write what you want the hotel to know here..."
                            rows={6}
                            resize="none"
                            value={additionalData}
                            onChange={(event) => setAdditionalData(event.target.value)}
                          />
                        </FormControl>

                        <Button
                          colorScheme="blue"
                          bg="blue.400"
                          color="black"
                          _hover={{
                            bg: 'blue.500',
                          }}
                          onClick={goToSummary}>
                          Summary
                        </Button>

                        <Button
                          colorScheme="blue"
                          bg="blue.400"
                          color="black"
                          _hover={{
                            bg: 'blue.500',
                          }}
                          onClick={cancelBook}>
                          Cancel
                        </Button>
                      </VStack>
                    </Box>
                  </Stack>
              </ChakraProvider>
            </VStack>
          </Box>
        </Box>
      </Flex>
  );
}