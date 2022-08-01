import { useState } from 'react';
import React from 'react';
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { postBooking } from '../../api/services/destinations';
import CSSReset from "@chakra-ui/css-reset";
import { 
  ChakraProvider,
  Box,
  Button,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Spacer, 
  Flex,
  Textarea,
  VStack,
  HStack,
  Center,
  StackDivider, InputGroup,Select, InputRightElement
} from "@chakra-ui/react";


export default function Booking() {
  const localFirstName = localStorage.getItem("firstName");
  const localLastName = localStorage.getItem("lastName");
  const localEmail = localStorage.getItem("email");
  const localPhoneNumber = localStorage.getItem("phoneNumber");

  const [ salutation, setSalutation ] = useState("Mr");
  const [ firstName, setFirstName ] = useState(localFirstName);
  const [ lastName, setLastName ] = useState(localLastName);
  const [ email, setEmail ] = useState(localEmail);
  const [ phone, setPhone ] = useState(localPhoneNumber);
  const [ additionalData, setAdditionalData ] = useState("");
  const [ cardName, setCardName ] = useState("");
  const [ cardNumber, setCardNumber ] = useState("");
  const [ expiryMonth, setExpiryMonth ] = useState("1");
  const [ expiryYear, setExpiryYear ] = useState("2022");
  const [ CVV, setCVV ] = useState("");
  const [ showCVV, setShowCVV ] = useState(false);
  const [ billingAddress, setBillingAddress ] = useState("");
  
  const [ firstNameError, setFirstNameError ] = useState(false);
  const [ lastNameError, setLastNameError ] = useState(false);
  const [ emailError, setEmailError ] = useState(false);
  const [ phoneError, setPhoneError ] = useState(false);
  const [ cardNameError, setCardNameError ] = useState(false);
  const [ cardNumberError, setCardNumberError ] = useState(false);
  const [ expiryMonthError, setExpiryMonthError ] = useState(false);
  const [ expiryYearError, setExpiryYearError ] = useState(false);
  const [ CVVError, setCVVError ] = useState(false);
  const [ billingAddressError, setBillingAddressError ] = useState(false);

  const navigate = useNavigate();

  const goToPay = (event) => {
    const body = {
      salutation: salutation.replace(/['"]+/g, ''),
      firstName: firstName.replace(/['"]+/g, ''), 
      lastName: lastName.replace(/['"]+/g, ''),
      email: email.replace(/['"]+/g, ''), 
      phone: phone.replace(/['"]+/g, ''), 
      additionalData: additionalData.replace(/['"] + /g, ''),
      cardName: cardName.replace(/['"] + /g, ''), 
      cardNumber: cardNumber.replace(/['"] + /g, '').substring(0, 6) + "xxxxxx" + cardNumber.replace(/['"] + /g, '').substring(12, 16), // Only pass first 6 and last 4 digits
      billingAddress: billingAddress.replace(/['"] + /g, ''),
      roomName: localStorage.getItem("roomName").replace(/['"]+/g, ''),
      hotelName: localStorage.getItem("hotelName").replace(/['"]+/g, ''),
      roomPrice: localStorage.getItem("roomPrice"),
      checkInDate: localStorage.getItem("checkInDate").replace(/['"]+/g, ''),
      checkOutDate: localStorage.getItem("checkOutDate").replace(/['"]+/g, ''),
      numAdults: localStorage.getItem("numAdults").replace(/['"]+/g, ''),
      numChildren: localStorage.getItem("numChildren").replace(/['"]+/g, ''),
      numRooms: localStorage.getItem("numRooms").replace(/['"]+/g, ''),
      room_uid: localStorage.getItem("room_uid").replace(/['"]+/g, ''),
      dest_uid: localStorage.getItem("dest_uid").replace(/['"]+/g, ''),
      hotel_uid: localStorage.getItem("hotel_uid").replace(/['"]+/g, ''),
      username: (localStorage.getItem("username") !== null ? localStorage.getItem("username") : "").replace(/['"]+/g, ''),
      currency: localStorage.getItem("currency").replace(/['"]+/g, ''),
    };

    let response;
    postBooking(JSON.stringify(body)).then((data) => {
      console.log(data);
      response = data;
      if (response.status === 200) {
        navigate(`/summary?booking_uid=${response.booking_uid}`);
      }
    });
  }

  function handleBook() {
    if (handleError()) {
      goToPay();
    }
  }

  function handleError() {
    let pass = true;
    if (!firstName) { setFirstNameError(true); pass=false; console.log(1);} else {setFirstNameError(false);}
    if (!lastName) {  setLastNameError(true); pass=false; console.log(2);} else {setLastNameError(false);}
    if (!(/\S+@\S+\.\S+/.test(email))) { setEmailError(true);pass=false; console.log(3);} else {setEmailError(false);}
    if (!phone || phone.length!==8) { setPhoneError(true);pass=false; console.log(4);} else {setPhoneError(false);}
    if (!cardName) { setCardNameError(true);pass=false; console.log(5);} else {setCardNameError(false);}
    if (!cardNumber|| cardNumber.length!==16) { setCardNumberError(true);pass=false; console.log(6);} else {setCardNumberError(false);}
    if (!(/^((0?[1-9])|(1[0-2]))$/.test(expiryMonth))) { setExpiryMonthError(true); pass=false; console.log(7);} else {setExpiryMonthError(false);}
    if (!(/^(19|20)[\d]{2,2}$/.test(expiryYear))) { setExpiryYearError(true); pass=false; console.log(8);} else {setExpiryYearError(false);}
    if (!CVV || CVV.length!==3) { setCVVError(true);pass=false; console.log(9);} else {setCVVError(false);}
    if (!billingAddress) { setBillingAddressError(true);pass=false; console.log(10);} else {setBillingAddressError(false);}
    return pass;
  }

  const cancelBook = () => {
    navigate(-1);
  }

  return (
      <ChakraProvider>
      <Box h="100vh" w="100wh">
        <Box h="8%" w="100%">
            <NavBar></NavBar>
        </Box>
        <CSSReset />
        <Center w="100%" h="92%">
          <VStack w={{base: "70%", lg: "50%"}} h="100%" divider={<StackDivider borderColor='gray.200' />}>
            <Center w="100%">
              <VStack w="100%" padding={3}>
                <Heading>
                  Booking Details
                </Heading>
                <HStack w="100%">
                    
                  <FormControl isRequired w="20%">
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
                  <FormControl isRequired w="40%" isInvalid={firstNameError}>
                    <FormLabel>First Name</FormLabel>
                      <Input
                        type="text" 
                        name="firstName" 
                        placeholder="First Name" 
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        onClick={e => setFirstNameError(false)}
                      />
                    {firstNameError && <FormErrorMessage>Required</FormErrorMessage>}
                  </FormControl>

                  <FormControl isRequired w="40%" isInvalid={lastNameError}>
                    <FormLabel>Last Name</FormLabel>
                      <Input 
                        type="text" 
                        name="lastName" 
                        placeholder="Last Name" 
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        onClick={e => setLastNameError(false)}
                      />
                    {lastNameError && <FormErrorMessage>Required</FormErrorMessage>}
                  </FormControl>
                </HStack>
                <HStack w="100%">
                  <FormControl isRequired='true' isInvalid={emailError}
                  >
                    <FormLabel>Email</FormLabel>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        onClick={e => setEmailError(false)}
                      />
                    {emailError && <FormErrorMessage>Example: john@gmail.com</FormErrorMessage>}
                  </FormControl>

                  <FormControl isRequired isInvalid={phoneError}>
                    <FormLabel>Phone Number</FormLabel>
                      <Input
                        type="number"
                        // changed from tel
                        name="number"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        onClick={e => setPhoneError(false)}
                      />
                    {phoneError && <FormErrorMessage>Please enter a valid phone number.</FormErrorMessage>}
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
                  <FormControl isRequired w='65%' isInvalid={cardNameError}>
                    <FormLabel>Cardholder Name</FormLabel>
                      <Input 
                        type="text" 
                        name="cardName" 
                        placeholder="Cardholder Name"
                        value={cardName}
                        onChange={(event) => setCardName(event.target.value)} 
                        onClick={e => setCardNameError(false)}
                      />
                    {cardNameError && <FormErrorMessage>Please enter the name on your card.</FormErrorMessage>}
                  </FormControl>
                  <FormControl isRequired w='65%' isInvalid={cardNumberError}>
                    <FormLabel>Card Number</FormLabel>
                      <Input
                        type="number"
                        name="cardNumber"
                        placeholder="Card Number"
                        value={cardNumber}
                        onChange={(event) => setCardNumber(event.target.value.slice(0, 16))}
                        onClick={e => setCardNumberError(false)}
                      />
                    {cardNumberError && <FormErrorMessage>Please enter a valid card number.</FormErrorMessage>}
                  </FormControl>
                </HStack>
                <HStack w="100%">
                  <FormControl isRequired>
                    <FormLabel>Month</FormLabel>
                    <Select 
                        value={expiryMonth} 
                        onChange={setExpiryMonth}
                        onClick={e => setExpiryMonthError(false)}
                    >
                      {Array.from({length: 12}, (_, index) => index + 1).map((month) => {return <option>{month}</option>})}
                    </Select>
                    {expiryMonthError && <FormErrorMessage>Please select a month.</FormErrorMessage>}
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Year</FormLabel>
                    <Select
                        value={expiryYear}
                        onChange={setExpiryYear}
                        onClick={e => setExpiryYearError(false)}
                    >
                      {Array.from({length: 10}, (_, index) => index + new Date().getFullYear()).map((year) => {return <option>{year}</option>})}
                    </Select>
                    {expiryYearError && <FormErrorMessage>Please select a year.</FormErrorMessage>}
                  </FormControl>

                  <FormControl isRequired w='35%' isInvalid={CVVError}>
                    <FormLabel>CVV</FormLabel>
                    <InputGroup>
                      <Input onWheel={(event)=> event.currentTarget.blur()} // prevent scroll wheel
                        type={showCVV ? "number" : "password"}
                        name="CVV"
                        placeholder="CVV"
                        value={CVV}
                        onChange={(event) => setCVV(event.target.value.slice(0, 3))}
                        onClick={e => setCVVError(false)}
                      />
                      <InputRightElement paddingEnd={2} width="10">
                        <Button fontSize={10} height="6" size="sm" onClick={()=> setShowCVV(!showCVV)}>
                          {showCVV ? "Hide" : "Show"}
                        </Button>

                      </InputRightElement>
                    </InputGroup>
                    {CVVError&&<FormErrorMessage>Please enter your 3-digit CVV.</FormErrorMessage>}
                  </FormControl>
                </HStack>
                <HStack w="100%">
                  <FormControl isRequired isInvalid={billingAddressError}>
                    <FormLabel>Billing Address</FormLabel>
                    <Input 
                        type="text" 
                        name="billingAddress" 
                        placeholder="Billing Address" 
                        value={billingAddress} 
                        onChange={(event) => setBillingAddress(event.target.value)} 
                        onClick={e => setBillingAddressError(false)}
                    />
                    {billingAddressError&&<FormErrorMessage>Please enter your billing address.</FormErrorMessage>}
                  </FormControl>
                </HStack>
              </VStack>
            </Center>
            <Center w="100%">
              <Flex padding={4} w="100%">
                <Button name="button_confirmBooking"
                  w="70%" bg="blue.300" color="black"
                  _hover={{
                    bg: 'blue.500',
                  }}
                  type="submit"
                  onClick={handleBook}>
                  Book
                </Button>
                <Spacer/>
                <Button w="28%" color="black" 
                  _hover={{
                    bg: 'red.500',
                  }}
                  onClick={cancelBook}>
                  Cancel
                </Button>
              </Flex>
            </Center>
          </VStack>
        </Center>
      </Box>
    </ChakraProvider>
  );
  
}