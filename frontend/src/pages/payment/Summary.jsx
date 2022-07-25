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
  Center
} from '@chakra-ui/react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import { getBooking } from '../../api/services/destinations';
import { useLocation, useNavigate } from "react-router-dom";

export default function Summary(props) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [ booking, setBooking ] = useState("");
  const foo = (e) => {console.log(e); setBooking(e)}
  useEffect(() => {getBooking(params, foo)}, []);
  
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
                  Your booking has been confirmed!
                </Heading>
                <HStack w="100%">
                  <HStack w="100%">
                    <FormControl isRequired w="30%">
                      <FormLabel>Salutation</FormLabel>
                      <InputGroup>
                        <Select value={salutation} onChange={(e) => setSalutation(e.target.value)}>
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
                    <FormControl isRequired w="70%">
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
                    </FormControl>
                  </HStack>

                  <FormControl isRequired>
                    <FormLabel>Last Name</FormLabel>

                    <InputGroup>
                      <Input 
                        type="text" 
                        name="firstName" 
                        placeholder="Last Name" 
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                      />
                    </InputGroup>
                  </FormControl>
                </HStack>
                <HStack w="100%">
                  <FormControl isRequired>
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
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Phone Number</FormLabel>

                    <InputGroup>
                      <Input
                        type="tel"
                        name="number"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                      />
                    </InputGroup>
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
                <FormControl isRequired>
                    <FormLabel>Cardholder Name</FormLabel>

                    <InputGroup>
                      <Input 
                        type="text" 
                        name="cardName" 
                        placeholder="Cardholder Name"
                        value={cardName}
                        onChange={(event) => setCardName(event.target.value)} />
                    </InputGroup>
                  </FormControl>

                  <FormControl isRequired>
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
                  </FormControl>
                </HStack>
                <HStack w="100%">
                <FormControl isRequired>
                    <FormLabel>Expiry Date</FormLabel>

                    <InputGroup>
                      <Input
                        type="date"
                        name="expiry"
                        placeholder="Expiry Date"
                        value={expiry}
                        onChange={(event) => setExpiry(event.target.value)}
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>CVV</FormLabel>

                    <InputGroup>
                      <Input
                        type="number"
                        name="CVV"
                        placeholder="CVV"
                        value={CVV}
                        onChange={(event) => setCVV(event.target.value)}
                      />
                    </InputGroup>
                  </FormControl>
                </HStack>
                <HStack w="100%">
                  <FormControl isRequired>
                    <FormLabel>Billing Address</FormLabel>
                    <Input type="text" name="billingAddress" placeholder="Billing Address" value={billingAddress} onChange={(event) => setBillingAddress(event.target.value)} />
                  </FormControl>
                </HStack>
              </VStack>
            </Center>
            <Center w="100%">
              <Flex w="100%">
                <Spacer/>
                <Button
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
//     <div className='home'>
//       <Flex
//         bg={useColorModeValue('gray.100', 'gray.900')}
//         align="center"
//         justify="center"
//         css={{
//           backgroundAttachment: 'fixed',
//         }}
//         id="contact">
//         <Box
//           borderRadius="lg"
//           m={{ base: 5, md: 16, lg: 10 }}
//           p={{ base: 5, lg: 16 }}>
//           <Box>
//             <VStack spacing={{ base: 4, md: 8, lg: 20 }}>
//               <ChakraProvider>
//               <Heading
//                 fontSize={{
//                   base: '4xl',
//                   md: '5xl',
//                 }}>
//                 Booking Summary
//               </Heading>
//                 <h1>User Details</h1>
//               <Stack
//                 spacing={{ base: 4, md: 8, lg: 20 }}
//                 direction={{ base: 'column', md: 'row' }}>
//                 <Box
//                   bg={useColorModeValue('white', 'gray.700')}
//                   borderRadius="lg"
//                   p={8}
//                   color={useColorModeValue('gray.700', 'whiteAlpha.900')}
//                   shadow="base">
//                   <VStack spacing={5}>
//                     <FormControl isRequired>
//                       <p>Name: {nameSet}</p>
//                     </FormControl>
  
//                     <FormControl isRequired>
//                       <p>Email: {emailSet}</p>
//                     </FormControl>
  
//                     <FormControl isRequired>
//                       <p>Number: {phoneSet}</p>
//                     </FormControl>

//                     <FormControl isRequired>
//                       <p>Message: {messageSet}</p>
//                     </FormControl>
//                   </VStack>
//                 </Box>
//               </Stack>
//               <h1>Hotel Details</h1>
//               <Stack
//               spacing={{ base: 4, md: 8, lg: 20 }}
//               direction={{ base: 'column', md: 'row' }}>
//                 <Box
//                   bg={useColorModeValue('white', 'gray.700')}
//                   borderRadius="lg"
//                   p={8}
//                   color={useColorModeValue('gray.700', 'whiteAlpha.900')}
//                   shadow="base">
//                   <VStack spacing={5}>
//                     <FormControl isRequired>
//                       <p>Hotel: {hotelName}</p>
//                     </FormControl>
  
//                     <FormControl isRequired>
//                       <p>Room: {roomName}</p>
//                     </FormControl>
  
//                     <FormControl isRequired>
//                       <p>Number: {phoneSet}</p>
//                     </FormControl>

//                     <FormControl isRequired>
//                       <p>Check In: {checkInDate}</p>
//                       <p>Check Out: {checkOutDate}</p>
//                     </FormControl>

//                     <FormControl isRequired>
//                       <p>Price: {roomPrice}</p>
//                     </FormControl>
//                   </VStack>
//                   </Box>
//                 </Stack>
//                 <h1>Payment Details</h1>
//               <Stack
//               spacing={{ base: 4, md: 8, lg: 20 }}
//               direction={{ base: 'column', md: 'row' }}>
//                 <Box
//                   bg={useColorModeValue('white', 'gray.700')}
//                   borderRadius="lg"
//                   p={8}
//                   color={useColorModeValue('gray.700', 'whiteAlpha.900')}
//                   shadow="base">
//                   <VStack spacing={5}>
//                     <FormControl isRequired>
//                       <p>cardName: {cardName}</p>
//                     </FormControl>
  
//                     <FormControl isRequired>
//                       <p>cardNumber: {maskedNumber}</p>
//                     </FormControl>
  
//                     <FormControl isRequired>
//                       <p>expiry: {expiry}</p>
//                     </FormControl>

//                     <FormControl isRequired>
//                       <p>CVV: {CVV}</p>
//                     </FormControl>
//                   </VStack>
//                   </Box>
//                 </Stack>

//               </ChakraProvider>
//             </VStack>
//           </Box>
//         </Box>
//       </Flex>
//     </div>
  );
}