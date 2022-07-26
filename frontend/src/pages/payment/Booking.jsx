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
  Center,
  StackDivider,
  Spacer,
  Select,
  FormErrorMessage
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import React from 'react';
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { postBooking } from '../../api/services/destinations';

export default function Booking() {
  const { hasCopied, onCopy } = useClipboard('example@example.com');

  const localFirstName = localStorage.getItem("firstName") !== null ? JSON.parse(localStorage.getItem("firstName")) : "";
  const localLastName = localStorage.getItem("lastName") !== null ? JSON.parse(localStorage.getItem("lastName")) : "";
  const localEmail = localStorage.getItem("email") !== null ? JSON.parse(localStorage.getItem("email")) : "";
  const localPhoneNumber = localStorage.getItem("phoneNumber") !== null ? JSON.parse(localStorage.getItem("phoneNumber")) : "";

  const [ salutation, setSalutation ] = useState("Mr");
  const [ firstName, setFirstName ] = useState(localFirstName);
  const [ lastName, setLastName ] = useState(localLastName);
  const [ email, setEmail ] = useState(localEmail);
  const [ phone, setPhone ] = useState(localPhoneNumber);
  const [ additionalData, setAdditionalData ] = useState("");
  const [ cardName, setCardName ] = useState("");
  const [ cardNumber, setCardNumber ] = useState("");
  const [ expiry, setExpiry ] = useState("");
  const [ CVV, setCVV ] = useState("");
  const [billingAddress, setBillingAddress] = useState("");

  const navigate = useNavigate();

  const goToPay = () => {

    const body = {
      salutation: salutation.replace(/['"]+/g, ''),
      firstName: firstName.replace(/['"]+/g, ''), 
      lastName: lastName.replace(/['"]+/g, ''),
      email: email.replace(/['"]+/g, ''), 
      phone: phone.replace(/['"]+/g, ''), 
      additionalData: additionalData.replace(/['"] + /g, ''),
      cardName: cardName.replace(/['"] + /g, '').substring(0, 6) + "xxxxxx" + cardName.replace(/['"] + /g, '').substring(12, 16), 
      cardNumber: cardNumber.replace(/['"] + /g, ''), // Only pass first 6 and last 4 digits
      billingAddress: billingAddress.replace(/['"] + /g, ''),
      // expiry: expiry.replace(/['"] + /g, ''), // Don't pass to frontend
      // CVV: CVV.replace(/['"] + /g, ''), // Don't pass to frontend
      roomName: localStorage.getItem("roomName").replace(/['"]+/g, ''),
      hotelName: localStorage.getItem("hotelName"),
      roomPrice: localStorage.getItem("roomPrice"),
      checkInDate: localStorage.getItem("checkInDate").replace(/['"]+/g, ''),
      checkOutDate: localStorage.getItem("checkOutDate").replace(/['"]+/g, ''),
      numAdults: localStorage.getItem("numAdults").replace(/['"]+/g, ''),
      numChildren: localStorage.getItem("numChildren").replace(/['"]+/g, ''),
      numRooms: localStorage.getItem("numRooms").replace(/['"]+/g, ''),
      room_uid: localStorage.getItem("room_uid").replace(/['"]+/g, ''),
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

  const emailError = !(/\S+@\S+\.\S+/.test(email));
  const expiryError = !(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(expiry));
  

  return (
    <ChakraProvider>
      <Box h="100vh" w="100wh">
        <Box h="10%" w="100%">
            <NavBar></NavBar>
        </Box>
        <Center w="100%" h="90%">
          <VStack w={{base: "70%", lg: "50%"}} h="100%" divider={<StackDivider borderColor='gray.200' />}>
            <Center w="100%">
              <VStack w="100%">
                <Heading>
                  Booking Details
                </Heading>
                <HStack w="100%">
                  <HStack w="100%">
                    <FormControl isRequired w="30%">
                      <FormLabel>Salutation</FormLabel>
                      <InputGroup>
                        <Select name="salutation" value={salutation} onChange={(e) => setSalutation(e.target.value)}>
                          <option value='Mr'>Mr</option>
                          <option value='Ms'>Ms</option>
                          <option value='Mrs'>Mrs</option>
                          <option value='Miss'>Miss</option>
                          <option value='Madam'>Madam</option>
                          <option value='Dr'>Dr</option>
                          <option value='Lord'>Lord</option>
                          <option value='Lordess'>Lordess</option>
                          <option value='-'>-</option>
                        </Select>
                      </InputGroup>
                    </FormControl>
                    <FormControl isRequired w="70%" isInvalid={firstName==''}>
                      <FormLabel>First Name</FormLabel>

                      <InputGroup>
                        <Input
                          type="text" 
                          name="firstName" 
                          placeholder="First Name" 
                          value={firstName}
                          onChange={(event) => setFirstName(event.target.value)}
                        />
                      </InputGroup>
                      <FormErrorMessage>Please enter your first name.</FormErrorMessage>
                    </FormControl>
                  </HStack>

                  <FormControl isRequired isInvalid={lastName==''}>
                    <FormLabel>Last Name</FormLabel>

                    <InputGroup>
                      <Input 
                        type="text" 
                        name="lastName" 
                        placeholder="Last Name" 
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                      />
                    </InputGroup>
                    <FormErrorMessage>Please enter your last name.</FormErrorMessage>
                  </FormControl>
                </HStack>
                <HStack w="100%">
                  <FormControl isRequired='true' isInvalid={emailError}>
                    <FormLabel>Email</FormLabel>
                    <InputGroup>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </InputGroup>
                    <FormErrorMessage>E.g., john@gmail.com</FormErrorMessage>
                  </FormControl>

                  <FormControl isRequired isInvalid={phone==''}>
                    <FormLabel>Phone Number</FormLabel>

                    <InputGroup>
                      <Input
                        type="number"
                        // changed from tel
                        name="number"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                      />
                    </InputGroup>
                    <FormErrorMessage>Please enter a number.</FormErrorMessage>
                  </FormControl>
                </HStack>
                <HStack w="100%">
                  <FormControl>
                    <FormLabel>Additional Information</FormLabel>

                    <Textarea
                      name="message"
                      placeholder="Anything else the hotel staff might need to know"
                      value={additionalData}
                      onChange={(event) => setAdditionalData(event.target.value)}
                    />
                  </FormControl>
                </HStack>
              </VStack>
            </Center>
            <Center w="100%">
              <VStack w="100%">
                <Heading>
                  Payment Details
                </Heading>
                <HStack w="100%">
                <FormControl isRequired isInvalid={cardName==''}>
                    <FormLabel>Cardholder Name</FormLabel>

                    <InputGroup>
                      <Input 
                        type="text" 
                        name="cardName" 
                        placeholder="Cardholder Name"
                        value={cardName}
                        onChange={(event) => setCardName(event.target.value)} />
                    </InputGroup>
                    <FormErrorMessage>Please enter the name on your card.</FormErrorMessage>
                  </FormControl>

                  <FormControl isRequired isInvalid={cardNumber==''|cardNumber.length!==16}>
                    <FormLabel>Card Number</FormLabel>

                    <InputGroup>
                      <Input
                        type="number"
                        name="cardNumber"
                        placeholder="Card Number"
                        value={cardNumber}
                        onChange={(event) => setCardNumber(event.target.value)}
                      />
                    </InputGroup>
                    <FormErrorMessage>Please enter a valid card number.</FormErrorMessage>
                  </FormControl>
                </HStack>
                <HStack w="100%">
                <FormControl isRequired isInvalid={expiryError}>
                    <FormLabel>Expiry Date</FormLabel>

                    <InputGroup>
                      <Input
                        type="text"
                        name="expiry"
                        placeholder="e.g., 03/22"
                        value={expiry}
                        onChange={(event) => setExpiry(event.target.value)}
                      />
                    </InputGroup>
                    <FormErrorMessage>Please enter a MM/YY format.</FormErrorMessage>
                  </FormControl>

                  <FormControl isRequired isInvalid={CVV.length!==3}>
                    <FormLabel>CVV</FormLabel>

                    <InputGroup>
                      <Input onWheel={(event)=> event.currentTarget.blur()} // prevent scroll wheel
                        type="number"
                        name="CVV"
                        placeholder="CVV"
                        value={CVV}
                        onChange={(event) => setCVV(event.target.value)}
                      />
                    </InputGroup>
                    <FormErrorMessage>Please enter your 3-digit CVV.</FormErrorMessage>
                  </FormControl>
                </HStack>
                <HStack w="100%">
                  <FormControl isRequired isInvalid={CVV.length==''}>
                    <FormLabel>Billing Address</FormLabel>
                    <Input type="text" name="billingAddress" placeholder="Billing Address" value={billingAddress} onChange={(event) => setBillingAddress(event.target.value)} />
                    <FormErrorMessage>Please enter your billing address.</FormErrorMessage>
                  </FormControl>
                </HStack>
              </VStack>
            </Center>
            <Center w="100%">
              <Flex w="100%">
                <Spacer/>
                <Button
                  name="button_confirmBooking"
                  w="25%"
                  colorScheme="blue"
                  bg="blue.400"
                  color="black"
                  _hover={{
                    bg: 'blue.500',
                  }}
                  type="submit"
                  onClick={goToPay}>
                  Book
                </Button>
                <Spacer/>
                <Button
                  w="25%"
                  colorScheme="blue"
                  bg="blue.400"
                  color="black"
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={cancelBook}>
                  Cancel
                </Button>
                <Spacer/>
              </Flex>
            </Center>
          </VStack>
        </Center>
      </Box>
    </ChakraProvider>
  );
}