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
import Navbar from "../../components/navbar/Navbar"

export default function ContactFormWithSocialButtons() {
  const { hasCopied, onCopy } = useClipboard('example@example.com');

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [number, setNumber] = useState('')

  const goToPay = () => {
    navigate("/pay", {state : { }})
  }

  const cancelBook = () => {
    navigate("/hotels")
  }

  const handleSubmit = (e) => {
    const form = { name, email, number }

    console.log(form)
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
                <Navbar/>
                <Heading
                  fontSize={{
                    base: '4xl',
                    md: '5xl',
                  }}>
                  Booking Summary
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
                            onChange={(e) => setName(e.target.value)}
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
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                          />
                        </InputGroup>
                      </FormControl>

                      <FormControl isRequired>
                        <FormLabel>Message</FormLabel>

                        <Textarea
                          name="message"
                          placeholder="Write what you want the hotel to know here..."
                          rows={6}
                          resize="none"
                        />
                      </FormControl>

                      <button>Pay</button>

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