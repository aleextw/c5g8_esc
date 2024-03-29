import {
  Box,
  ChakraProvider,
  Heading,
  Link,
  VStack,
  HStack,
  StackDivider,
  Text,
  Center,
  Spinner,
  Alert,
  AlertIcon,
  Collapse,
  Stack,
} from '@chakra-ui/react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import { getBooking } from '../../api/services/destinations';
import { useLocation } from "react-router-dom";



function SummaryData(props) {
  const [copied, setCopied] = useState(false);

  return (
    <Box name="bgImage"
      bgImage="https://images.hdqwalls.com/download/clouds-sky-mountains-4k-2j-2560x1080.jpg"
      w="100%"
      bgPosition="center"
      bgRepeat="no-repeat"
      fill="cover"
      h="100%"
    >
      <Center w="100%" h="100%" overflow="scroll">
        <Box p="5" maxW="1000px" w={{base: "100%", lg: "70%"}} borderWidth="1px" borderRadius={{base: "none", lg: "lg"}}  bgColor="white">
        <VStack w="100%" h="100%" divider={<StackDivider borderColor='gray.200' />}>
            <Heading>
              Your booking has been confirmed!
            </Heading>
            <Box>
              <Heading size="md" w="100%" align="center">Your booking ID:</Heading>
              <Center w="100%" align="center">
                <Link name="copyBookingRef" color='teal.500' w="100%" onClick={(e)=>{navigator.clipboard.writeText(e.target.innerText); setCopied(true); setInterval(() => setCopied(false), 10000)}} isExternal>{props.data.booking_info.guest_booking_ref}</Link>
              </Center>
              <Collapse in={copied} animateOpacity>
                <Alert status='info' borderRadius="md">
                  <AlertIcon />
                  Booking ID copied to clipboard!
                </Alert>
              </Collapse>
              
              <Text align="center">(Copy this booking ID to access your booking data again in future.)</Text>
            </Box>
            <HStack w="100%" h="100%">
              <VStack w="100%" h="100%">
                <Heading w="100%" size="md" align="left">
                  Guest Details
                </Heading>
                <Text w="100%" align="left">
                  <strong>Name:</strong> {props.data.account_info.salutation} {props.data.account_info.first_name} {props.data.account_info.last_name}
                </Text>
                <Text w="100%" align="left">
                  <strong>Email:</strong> {props.data.account_info.email}
                </Text>
                <Text w="100%" align="left">
                  <strong>Phone:</strong> {props.data.account_info.contact_number}
                </Text>
                <Text w="100%" align="top-left">
                    <strong>Additional Information:</strong> {props.data.account_info.additional_data}
                </Text>
              </VStack>
              <VStack w="100%" h="100%">
                <Heading w="100%" size="md" align="left">
                  Payment Details
                </Heading>
                <Text w="100%" align="left">
                  <strong>Payee Name:</strong> {props.data.payment_info.card_name}
                </Text>
                <Text w="100%" align="left">
                  <strong>Card Number:</strong> {props.data.payment_info.card_number}
                </Text>
                <Text w="100%" align="left">
                  <strong>Billing Address:</strong> {props.data.payment_info.billing_address}
                </Text>
                <Text w="100%" align="left">
                  <strong>Amount Paid:</strong> {props.data.booking_info.currency} {Number(props.data.booking_info.price)}
                </Text>
              </VStack>
            </HStack>
            
            <Stack w="100%" direction={{base: "row", lg: "column"}}>
              <VStack w="100%">
                <Heading w="100%" size="md" align="left">
                  Hotel Details
                </Heading>
                <Text w="100%" align="left">
                  <strong>Destination:</strong> {props.data.destination_info.term}
                </Text>
                <Text w="100%" align="left">
                  <strong>Hotel Name:</strong> {props.data.display_info.hotel_name}
                </Text>
                <Text w="100%" align="left">
                  <strong>Room Name:</strong> {props.data.display_info.room_name}
                </Text>
              </VStack>
              

              <VStack w="100%">
                <Text w="100%" align="left">
                  <strong>Check In Date:</strong> {props.data.display_info.check_in_date}
                </Text>
                <Text w="100%" align="top-left">
                    <strong>Check Out Date:</strong> {props.data.display_info.check_out_date}
                </Text>
                <Text w="100%" align="top-left">
                    <strong>Number of Rooms:</strong> {props.data.display_info.num_rooms}
                </Text>
                <Text w="100%" align="top-left">
                    <strong>Number of Adults:</strong> {props.data.display_info.num_adults}
                </Text>
                <Text w="100%" align="top-left">
                    <strong>Number of Children:</strong> {props.data.display_info.num_children}
                </Text>
              </VStack>
              
            </Stack>    
          </VStack>
        </Box>
    </Center>
  </Box>);
}

export default function Summary() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [ booking, setBooking ] = useState("");
  const foo = (e) => {console.log(e); setBooking(e)}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {getBooking(params, foo)}, []);
  
  let content;

  if (booking !== "") {
    if (booking === -1) {
      content = (<Heading size="lg">
                  No booking found!
              </Heading>);
    } else {
      content = <SummaryData data={booking}/>;
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
        <Box h="8%" minH="50px" w="100%">
            <NavBar></NavBar>
        </Box>
        <Center w="100%" h="92%">
          { content }
        </Center>
      </Box>
    </ChakraProvider>
  );
}