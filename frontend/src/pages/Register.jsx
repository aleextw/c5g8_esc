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
  ChakraProvider,
  Center,
  FormErrorMessage,
  FormLabel,
  VStack,
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { useReducedMotion } from "framer-motion";

const Register = () => {

    const navigate = useNavigate();

    const goToLogin = () => {
        console.log(firstName, lastName, email, phoneNumber, username, password);
        let anyError = false;
        if (firstName === "") {
            setFirstNameError(true);
            anyError = true;
        }
        if (lastName === "") {
            setLastNameError(true);
            anyError = true;
        }
        if (email === "") {
            setEmailError(true);
            anyError = true;
        }
        if (phoneNumber === "") {
            setPhoneNumberError(true);
            anyError = true;
        }
        if (username === "") {
            setUsernameError(true);
            anyError = true;
        }
        if (password === "") {
            setPasswordError(true);
            anyError = true;
        }

        if (anyError) {
            return;
        }
        localStorage.setItem("firstName", JSON.stringify(firstName));
        localStorage.setItem("lastName", JSON.stringify(lastName));
        localStorage.setItem("email", JSON.stringify(email));
        localStorage.setItem("phoneNumber", JSON.stringify(phoneNumber));
        localStorage.setItem("username", JSON.stringify(username));
        localStorage.setItem("password", JSON.stringify(password));
        navigate("/login");
      }

    const [showPassword, setShowPassword] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleShowClick = () => setShowPassword(!showPassword);

    return (
        <ChakraProvider>
            <Box h="100vh" w="100wh">    
                <Box h="8%" w="100%">
                    <NavBar></NavBar>
                </Box>
                <Box name="bgImage"
                bgImage="https://images.hdqwalls.com/download/storm-national-park-pacific-beach-seascape-4k-bn-1920x1080.jpg"
                bgPosition="center"
                bgRepeat="no-repeat"
                fill="cover"
                h="92%"
                >
                    <Center h="92%">
                        <Box p="5" maxW="800px" w="70%" borderWidth="1px" borderRadius="lg" bgColor="white">
                            <Stack>
                                <Center w="100%">
                                    <VStack>
                                        <Avatar align="center" bg="teal.500" />
                                        <Heading>Register</Heading>
                                    </VStack>
                                </Center>
                                <Flex align="center" gap={{ base: 0, lg: 2 }} p={{ base: 0, lg: 2 }} w="100%" direction={{ base: 'column', lg: 'row' }}>
                                    <Stack w={{base: "100%", lg: "50%"}}>
                                        <FormControl isInvalid={firstNameError}>
                                            <FormLabel>First Name</FormLabel>
                                            <Input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} onClick={(e) => setFirstNameError(false)} placeholder="First Name"/>
                                            {firstNameError && <FormErrorMessage>First name is required.</FormErrorMessage>}
                                        </FormControl>
                                    </Stack>
                                    <Stack w={{base: "100%", lg: "50%"}}>
                                        <FormControl isInvalid={lastNameError}>
                                            <FormLabel>Last Name</FormLabel>
                                            <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} onClick={(e) => setLastName(false)} placeholder="Last Name"/>
                                            {lastNameError && <FormErrorMessage>Last name is required.</FormErrorMessage>}
                                        </FormControl>
                                    </Stack>
                                </Flex>
                                <Flex align="center" gap={{ base: 0, lg: 2 }} p={{ base: 0, lg: 2 }} w="100%" direction={{ base: 'column', lg: 'row' }}>
                                    <Stack w={{base: "100%", lg: "50%"}}>
                                        <FormControl isInvalid={emailError}>
                                            <FormLabel>Email</FormLabel>
                                            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} onClick={(e) => setEmailError(false)} placeholder="Email"/>
                                            {emailError && <FormErrorMessage>Email is required.</FormErrorMessage>}
                                        </FormControl>
                                    </Stack>
                                    <Stack w={{base: "100%", lg: "50%"}}>
                                        <FormControl isInvalid={lastNameError}>
                                            <FormLabel>Phone Number</FormLabel>
                                            <Input type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} onClick={(e) => setPhoneNumberError(false)} placeholder="Phone Number"/>
                                            {phoneNumberError && <FormErrorMessage>Phone number is required.</FormErrorMessage>}
                                        </FormControl>
                                    </Stack>
                                </Flex>
                                <Flex align="center" gap={{ base: 0, lg: 2 }} p={{ base: 0, lg: 2 }} w="100%" direction={{ base: 'column', lg: 'row' }}>
                                    <Stack w={{base: "100%", lg: "50%"}}>
                                        <FormControl isInvalid={usernameError}>
                                            <FormLabel>Username</FormLabel>
                                            <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} onClick={(e) => setUsernameError(false)} placeholder="Username"/>
                                            {usernameError && <FormErrorMessage>Username is required.</FormErrorMessage>}
                                        </FormControl>
                                    </Stack>
                                    <Stack w={{base: "100%", lg: "50%"}}>
                                        <FormControl isInvalid={passwordError}>
                                            <FormLabel>Password</FormLabel>
                                            <InputGroup>
                                                <Input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} onClick={(e) => setPasswordError(false)} placeholder="Password"/>
                                                <InputRightElement width="4.5rem">
                                                    <Button h="1.75rem" w="4rem" size="sm" onClick={handleShowClick}>
                                                    {showPassword ? "Hide" : "Show"}
                                                    </Button>
                                                </InputRightElement>
                                            </InputGroup>
                                            {passwordError && <FormErrorMessage>Password is required.</FormErrorMessage>}
                                        </FormControl>
                                    </Stack>
                                </Flex>
                                <Center w="100%">
                                    <Button maxW="150px" w="100%" name="dest_search_submit" onClick={ goToLogin } colorScheme="red">Submit</Button>
                                </Center>
                            </Stack>
                        </Box>
                    </Center>
                </Box>
            </Box>  
        </ChakraProvider>
      );
} 

export default Register