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
import * as React from 'react';
import { useEffect, useState } from 'react';


export default function Summary(props) {
  console.log("roomName: ", localStorage.getItem("roomName"));
  console.log("hotelName: ", localStorage.getItem("hotelName"));
  console.log("checkInDate: ", localStorage.getItem("checkInDate"));
  console.log("checkOutDate: ", localStorage.getItem("checkOutDate"));
  console.log("roomPrice: ", localStorage.getItem("roomPrice"));
  console.log("name: ", localStorage.getItem("name"));
  console.log("email: ", localStorage.getItem("email"));
  console.log("phone: ", localStorage.getItem("phone"));
  console.log("additionalData", localStorage.getItem("additionalData"))

  // booking user details
  const nameSet = localStorage.getItem('name')
  const emailSet = localStorage.getItem('email')
  const phoneSet = localStorage.getItem('phone')
  const messageSet = localStorage.getItem('additionalData')

  // booking hotel details
  const roomName = localStorage.getItem('roomName')
  const hotelName = localStorage.getItem('hotelName')
  const checkInDate = localStorage.getItem('checkInDate')
  const checkOutDate = localStorage.getItem('checkOutDate')
  const roomPrice = localStorage.getItem('roomPrice')

  // user payment details
  const cardName = localStorage.getItem('cardName')
  const cardNumber = localStorage.getItem('cardNumber')
  const expiry = localStorage.getItem('expiry')
  const CVV = localStorage.getItem('CVV')

  const maskedNumber = `${cardNumber.substring(0, 7)}xxxxxx${cardNumber.substring(11, 15)}`;

  return (
    <div className='home'>
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
              <Heading
                fontSize={{
                  base: '4xl',
                  md: '5xl',
                }}>
                Booking Summary
              </Heading>
                <h1>User Details</h1>
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
                      <p>Name: {nameSet}</p>
                    </FormControl>
  
                    <FormControl isRequired>
                      <p>Email: {emailSet}</p>
                    </FormControl>
  
                    <FormControl isRequired>
                      <p>Number: {phoneSet}</p>
                    </FormControl>

                    <FormControl isRequired>
                      <p>Message: {messageSet}</p>
                    </FormControl>
                  </VStack>
                </Box>
              </Stack>
              <h1>Hotel Details</h1>
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
                      <p>Hotel: {hotelName}</p>
                    </FormControl>
  
                    <FormControl isRequired>
                      <p>Room: {roomName}</p>
                    </FormControl>
  
                    <FormControl isRequired>
                      <p>Number: {phoneSet}</p>
                    </FormControl>

                    <FormControl isRequired>
                      <p>Check In: {checkInDate}</p>
                      <p>Check Out: {checkOutDate}</p>
                    </FormControl>

                    <FormControl isRequired>
                      <p>Price: {roomPrice}</p>
                    </FormControl>
                  </VStack>
                  </Box>
                </Stack>
                <h1>Payment Details</h1>
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
                      <p>cardName: {cardName}</p>
                    </FormControl>
  
                    <FormControl isRequired>
                      <p>cardNumber: {maskedNumber}</p>
                    </FormControl>
  
                    <FormControl isRequired>
                      <p>expiry: {expiry}</p>
                    </FormControl>

                    <FormControl isRequired>
                      <p>CVV: {CVV}</p>
                    </FormControl>
                  </VStack>
                  </Box>
                </Stack>

              </ChakraProvider>
            </VStack>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}