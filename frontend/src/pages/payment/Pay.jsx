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
  import React from 'react';
  import { useNavigate} from "react-router-dom";
  
  export default function ContactFormWithSocialButtons() {
    const { hasCopied, onCopy } = useClipboard('example@example.com');
  
    const navigate = useNavigate()
  
    const goToSummary = () => {
      navigate("/summary")
    }
  
    const cancelPay = () => {
      navigate("/booking")
    }

    const cancelBook = () => {
      navigate("/hotels")
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
                        <Input type="text" name="name" placeholder="Your Name" />
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
    );
  }