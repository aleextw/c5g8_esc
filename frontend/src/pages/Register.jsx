import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  ChakraProvider
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { useReducedMotion } from "framer-motion";

const Register = () => {

    const navigate = useNavigate();

    const goToLogin = () => {
        console.log(firstName, lastName, email, phoneNumber, username);
        localStorage.setItem("firstName", JSON.stringify(firstName));
        localStorage.setItem("lastName", JSON.stringify(lastName));
        localStorage.setItem("email", JSON.stringify(email));
        localStorage.setItem("phoneNumber", JSON.stringify(phoneNumber));
        localStorage.setItem("username", JSON.stringify(username));
        navigate("/login");
      }

    const [showPassword, setShowPassword] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [username, setUserName] = useState("");

    const handleShowClick = () => setShowPassword(!showPassword);

    return (
        <ChakraProvider>
            <Flex
            flexDirection="column"
            width="100wh"
            height="100vh"
            backgroundColor="gray.200"
            justifyContent="center"
            alignItems="center"
            >
            <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
            >
                <Avatar bg="teal.500" />
                <Heading color="teal.400">Welcome</Heading>
                <Box minW={{ base: "90%", md: "468px" }}>
                <form>
                    <Stack
                    spacing={4}
                    p="1rem"
                    backgroundColor="whiteAlpha.900"
                    boxShadow="md"
                    >

                    <FormControl>
                        <InputGroup>
                        <InputLeftElement
                            pointerEvents="none"
                        />
                        <Input type="text" placeholder="First Name" onChange={event => setFirstName(event.target.value)} />
                        <Input type="text" placeholder="Last Name" onChange={event => setLastName(event.target.value)} />
                        </InputGroup>
                    </FormControl>

                    <FormControl>
                        <InputGroup>
                        <InputLeftElement
                            pointerEvents="none"
                        />
                        <Input type="email" placeholder="Email" onChange={event => setEmail(event.target.value)}/>
                        </InputGroup>
                    </FormControl>

                    <FormControl>
                        <InputGroup>
                        <InputLeftElement
                            pointerEvents="none"
                        />
                        <Input type="number" placeholder="Phone number" onChange={event => setPhoneNumber(event.target.value)} />
                        </InputGroup>
                    </FormControl>

                    <FormControl>
                        <InputGroup>
                        <InputLeftElement
                            pointerEvents="none"
                        />
                        <Input type="text" placeholder="Username" onChange={event => setUserName(event.target.value)}/>
                        </InputGroup>
                    </FormControl>

                    <FormControl>
                        <InputGroup>
                        <InputLeftElement
                            pointerEvents="none"
                            color="gray.300"
                        />
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                        />
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                            {showPassword ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                        </InputGroup>
                        <FormHelperText textAlign="right">
                        <Link>forgot password?</Link>
                        </FormHelperText>
                    </FormControl>
                    <Button
                        borderRadius={0}
                        type="submit"
                        variant="solid"
                        colorScheme="teal"
                        width="full"
                        onClick={goToLogin}
                    >
                        Register
                    </Button>
                    </Stack>
                </form>
                </Box>
            </Stack>
            </Flex>
        </ChakraProvider>
      );
} 

export default Register