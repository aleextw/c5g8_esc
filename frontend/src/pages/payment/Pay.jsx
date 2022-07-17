import {
    Box,
    Button,
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
  import React, { useState } from 'react';
  import { useNavigate} from "react-router-dom";
  
  export default function ContactFormWithSocialButtons() {
    const { hasCopied, onCopy } = useClipboard('example@example.com');
  
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [cardNumber, setcardNumber] = useState('')
    const [expiry, setExpiry] = useState('')
    const [CVV, setCVV] = useState('')
  
    const goToSummary = () => {
      navigate("/summary")
    }
  
    const cancelPay = () => {
      navigate("/booking")
    }

    const cancelBook = () => {
      navigate("/hotels")
    }

    const handleSubmit = (e) => {
      const form2 = { name, cardNumber, expiry, CVV }
  
      console.log(form2)
    }
  
    return (
      <form onSubmit={handleSubmit}>
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
                <Heading
                  fontSize={{
                    base: '4xl',
                    md: '5xl',
                  }}>
                  Payment
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
                            onChange={(e) => setName(e.target.value)} />
                        </InputGroup>
                      </FormControl>
    
                      <FormControl isRequired>
                        <FormLabel>Card Number</FormLabel>
    
                        <InputGroup>
                          <InputLeftElement />
                          <Input
                            type="number"
                            name="number"
                            placeholder="Card Number"
                            value={cardNumber}
                            onChange={(e) => setcardNumber(e.target.value)}
                          />
                        </InputGroup>
                      </FormControl>
    
                      <FormControl isRequired>
                        <FormLabel>Expiry Date</FormLabel>
    
                        <InputGroup>
                          <InputLeftElement />
                          <Input
                            type="number"
                            name="number"
                            placeholder="Expiry Date"
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                          />
                        </InputGroup>
                      </FormControl>

                      <FormControl isRequired>
                        <FormLabel>CVV</FormLabel>
    
                        <InputGroup>
                          <InputLeftElement />
                          <Input
                            type="number"
                            name="number"
                            placeholder="CVV"
                            value={CVV}
                            onChange={(e) => setCVV(e.target.value)}
                          />
                        </InputGroup>
                      </FormControl>
    
                      <Button
                        colorScheme="blue"
                        bg="blue.400"
                        color="black"
                        _hover={{
                          bg: 'blue.500',
                        }}
                        isFullWidth
                        onClick={goToSummary}>
                        Book
                      </Button>
    
                      <Button
                        colorScheme="blue"
                        bg="blue.400"
                        color="black"
                        _hover={{
                          bg: 'blue.500',
                        }}
                        isFullWidth
                        onClick={cancelBook}>
                        Cancel
                      </Button>
                    </VStack>
                  </Box>
                </Stack>
              </VStack>
            </Box>
          </Box>
        </Flex>
      </form>
    );
  }