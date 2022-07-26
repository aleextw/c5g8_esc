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
  HStack,
  Spacer,
  StackDivider,
  Select,
  Text,
  Center,
  Spinner,
} from '@chakra-ui/react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import { getBooking } from '../../api/services/destinations';
import { useLocation } from "react-router-dom";

function formatSummaryData(booking) {
  
  // for the masking of the credit card number
  const cardNumber = booking.payment_info.card_number
  const maskedNumber = `${cardNumber.substring(0, 6)}xxxxx${cardNumber.substring(12, 16)}`;

  return (
  <Center w={{base: "70%", lg: "50%"}} h="80%">
    <VStack w="100%" h="100%" divider={<StackDivider borderColor='gray.200' />}>
      <Heading>
        Your booking has been confirmed!
      </Heading>
      <Box>
        <Heading size="md" w="100%" align="center">Your booking ID:</Heading>
        <Link color='teal.500' onClick={(e)=>navigator.clipboard.writeText(e.target.innerText)} isExternal>{booking.booking_info.guest_booking_ref}</Link>
        <Text align="center">(Copy this booking ID to access your booking data again in future.)</Text>
      </Box>
      <HStack w="100%" h="100%">
        <VStack w="100%" h="100%">
          <Heading w="100%" size="md" align="left">
            Guest Details
          </Heading>
          <Text w="100%" align="left">
            <strong>Name:</strong> {booking.account_info.salutation} {booking.account_info.first_name} {booking.account_info.last_name}
          </Text>
          <Text w="100%" align="left">
            <strong>Email:</strong> {booking.account_info.email}
          </Text>
          <Text w="100%" align="left">
            <strong>Phone:</strong> {booking.account_info.contact_number}
          </Text>
          <Text w="100%" align="top-left">
              <strong>Additional Information:</strong> {booking.account_info.additional_data}
          </Text>
        </VStack>
        <VStack w="100%" h="100%">
          <Heading w="100%" size="md" align="left">
            Payment Details
          </Heading>
          <Text w="100%" align="left">
            <strong>Payee Name:</strong> {booking.payment_info.card_name}
          </Text>
          <Text w="100%" align="left">
            <strong>Card Number:</strong> {maskedNumber}
          </Text>
          <Text w="100%" align="left">
            <strong>Billing Address:</strong> {booking.payment_info.billing_address}
          </Text>
        </VStack>
      </HStack>
      
      <VStack w="100%">
        <Heading w="100%" size="md" align="left">
          Hotel Details
        </Heading>
        <Text w="100%" align="left">
          <strong>Destination:</strong> {booking.destination_info.term}
        </Text>
        <Text w="100%" align="left">
          <strong>Hotel Name:</strong> {booking.display_info.hotel_name}
        </Text>
        <Text w="100%" align="left">
          <strong>Room Name:</strong> {booking.display_info.room_name}
        </Text>
        <Text w="100%" align="left">
          <strong>Check In Date:</strong> {booking.display_info.check_in_date}
        </Text>
        <Text w="100%" align="top-left">
            <strong>Check Out Date:</strong> {booking.display_info.check_out_date}
        </Text>
        <Text w="100%" align="top-left">
            <strong>Number of Rooms:</strong> {booking.display_info.num_rooms}
        </Text>
        <Text w="100%" align="top-left">
            <strong>Number of Adults:</strong> {booking.display_info.num_adults}
        </Text>
        <Text w="100%" align="top-left">
            <strong>Number of Children:</strong> {booking.display_info.num_children}
        </Text>
      </VStack>    
    </VStack>
  </Center>);
}

export default function Summary(props) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [ booking, setBooking ] = useState("");
  const foo = (e) => {console.log(e); setBooking(e)}
  useEffect(() => {getBooking(params, foo)}, []);
  
  let content;

  if (booking !== "") {
    if (booking === -1) {
      content = (<Heading size="lg">
                  No booking found!
              </Heading>);
    } else {
      content = formatSummaryData(booking);
    }
  } else {
    content = (<Spinner
      thickness='4px'
      speed='0.65s'
      emptyColor='gray.200'
      color='blue.500'
      size='xl'
  />);
  }

  return (
    <ChakraProvider>
      <Box h="100vh" w="100wh">
        <Box h="10%" w="100%">
            <NavBar></NavBar>
        </Box>
        <Center w="100%" h="90%">
          { content }
        </Center>
      </Box>
    </ChakraProvider>
  );
}