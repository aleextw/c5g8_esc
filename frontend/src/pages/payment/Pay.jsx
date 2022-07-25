// import {
//   Box,
//   Button,
//   ChakraProvider,
//   Flex,
//   FormControl,
//   FormLabel,
//   Heading,
//   IconButton,
//   Input,
//   InputGroup,
//   InputLeftElement,
//   Link,
//   Stack,
//   Textarea,
//   Tooltip,
//   useClipboard,
//   useColorModeValue,
//   VStack,
// } from '@chakra-ui/react';
// import React from 'react';
// import { useNavigate} from "react-router-dom";
// import { useState, useEffect } from 'react';

// export default function ContactFormWithSocialButtons() {

  

//   const { hasCopied, onCopy } = useClipboard('example@example.com');

//   const navigate = useNavigate()

//   const goToSummary = () => {
//     navigate("/summary")
//   }

//   const cancelPay = () => {
//     navigate("/booking")
//   }

//   const cancelBook = () => {
//     navigate("/hotels")
//   }

//   useEffect(() => {
//     localStorage.setItem('cardName', JSON.stringify(cardName))
//   }, [cardName])

//   useEffect(() => {
//     localStorage.setItem('cardNumber', JSON.stringify(cardNumber))
//   }, [cardNumber])

//   useEffect(() => {
//     localStorage.setItem('expiry', JSON.stringify(expiry))
//   }, [expiry])

//   useEffect(() => {
//     localStorage.setItem('CVV', JSON.stringify(CVV))
//   }, [CVV])

//   return (
//     <Flex
//       bg={useColorModeValue('gray.100', 'gray.900')}
//       align="center"
//       justify="center"
//       css={{
//         backgroundAttachment: 'fixed',
//       }}
//       id="contact">
//       <Box
//         borderRadius="lg"
//         m={{ base: 5, md: 16, lg: 10 }}
//         p={{ base: 5, lg: 16 }}>
//         <Box>
//           <VStack spacing={{ base: 4, md: 8, lg: 20 }}>
//             <ChakraProvider>
//             <Heading
//               fontSize={{
//                 base: '4xl',
//                 md: '5xl',
//               }}>
//               Payment
//             </Heading>

//             <Stack
//               spacing={{ base: 4, md: 8, lg: 20 }}
//               direction={{ base: 'column', md: 'row' }}>
//               <Box
//                 bg={useColorModeValue('white', 'gray.700')}
//                 borderRadius="lg"
//                 p={8}
//                 color={useColorModeValue('gray.700', 'whiteAlpha.900')}
//                 shadow="base">
//                 <VStack spacing={5}>
                  

                  

//                   <Button
//                     colorScheme="blue"
//                     bg="blue.400"
//                     color="black"
//                     _hover={{
//                       bg: 'blue.500',
//                     }}
//                     isFullWidth
//                     onClick={goToSummary}>
//                     Book
//                   </Button>

//                   <Button
//                     colorScheme="blue"
//                     bg="blue.400"
//                     color="black"
//                     _hover={{
//                       bg: 'blue.500',
//                     }}
//                     isFullWidth
//                     onClick={cancelBook}>
//                     Cancel
//                   </Button>
//                 </VStack>
//               </Box>
//             </Stack>
//             </ChakraProvider>
//           </VStack>
//         </Box>
//       </Box>
//     </Flex>
//   );
// }