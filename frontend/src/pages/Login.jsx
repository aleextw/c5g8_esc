import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  Box,
  Avatar,
  FormControl,
  InputRightElement,
  ChakraProvider,
  Center,
  FormErrorMessage,
  FormLabel,
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  Spinner,
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../api/services/destinations";

const Login = () => {
    const navigate = useNavigate();

    const login = () => {
        let anyError = false;
        if (username === ""||username.match(/^[0-9A-Za-z]+$/) === null) {
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

        const body = {
            username: username,
            password: password
        };
        
        let response;
        setLoggingIn(true);
        postLogin(body).then((data) => {
            response = data;
            setLoggingIn(false);
            if (response.status === 200) {
                if (response.valid === "") {
                    console.log(response);
                    sessionStorage.setItem("token", response.token);
                    sessionStorage.setItem("firstName", response.user.firstName);
                    sessionStorage.setItem("lastName", response.user.lastName);
                    sessionStorage.setItem("email", response.user.email);
                    sessionStorage.setItem("phoneNumber", response.user.phoneNumber);
                    sessionStorage.setItem("username", response.user.username);
                    let url = sessionStorage.getItem("prevURL");
                    if (url !== null) {
                        navigate(url);
                    } else {
                        navigate("/");
                    }
                } else {
                    setLoginError(response.valid);
                }
            } else {
                setLoginError("Login failed for unknown reasons. Please try again.")
            }
        });
      }

    const [showPassword, setShowPassword] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    
    const [loggingIn, setLoggingIn] = useState(false);
    const [loginError, setLoginError] = useState("");
    const handleShowClick = () => setShowPassword(!showPassword);

    if (sessionStorage.getItem("token") !== null) {
        navigate(-1);
    }

    return (
        <ChakraProvider>
            <Box h="100vh" w="100wh">
                <Box h="8%" w="100%">
                    <NavBar></NavBar>
                </Box>
                <Box name="bgImage"
                    bgImage="https://images.hdqwalls.com/download/storm-national-park-pacific-beach-seascape-4k-bn-1920x1080.jpg"
                    w="100%"
                    bgPosition="center"
                    bgRepeat="no-repeat"
                    fill="cover"
                    h="92%"
                >
                    <Center h="100%">
                        <Box p="5" maxW="400px" w="70%" borderWidth="1px" borderRadius="lg" overflow="hidden"  bgColor="white">
                            <Stack>
                                <Center w="100%">
                                    <VStack>
                                        <Avatar align="center" bg="teal.500" />
                                        <Heading>Login</Heading>
                                    </VStack>
                                </Center>
                                <Flex align="center" gap={{ base: 0, lg: 2 }} p={{ base: 0, lg: 2 }} w="100%" direction="column">
                                    <Stack w="100%">
                                        <FormControl isInvalid={usernameError}>
                                            <FormLabel>Username</FormLabel>
                                            <Input name="loginUsernameInput" type="text" value={username} onChange={(e) => setUsername(e.target.value)} onClick={(e) => setUsernameError(false)} placeholder="Username"/>
                                            {usernameError && <FormErrorMessage>Username is required.</FormErrorMessage>}
                                        </FormControl>
                                    </Stack>
                                    <Stack w="100%">
                                        <FormControl isInvalid={passwordError}>
                                            <FormLabel>Password</FormLabel>
                                            <InputGroup>
                                                <Input name="loginPasswordInput"  type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} onClick={(e) => setPasswordError(false)} placeholder="Password"/>
                                                <InputRightElement width="4.5rem">
                                                    <Button name="showPassword" h="1.75rem" w="4rem" size="sm" onClick={handleShowClick}>
                                                    {showPassword ? "Hide" : "Show"}
                                                    </Button>
                                                </InputRightElement>
                                            </InputGroup>
                                            {passwordError && <FormErrorMessage>Password is required.</FormErrorMessage>}
                                        </FormControl>
                                    </Stack>
                                </Flex>
                                <Center w="100%">
                                    {loggingIn && <Spinner />}
                                </Center>
                                <Center w="100%">
                                    {loginError !== "" && <Alert status='error'>
                                    <AlertIcon />
                                    <AlertTitle name="loginErrorMsg">{loginError}</AlertTitle>
                                    </Alert>}
                                </Center>
                                <Center w="100%">
                                    <Button name="loginSubmitButton" maxW="150px" w="100%" onClick={ login } colorScheme="red">Submit</Button>
                                </Center>
                            </Stack>
                        </Box>
                    </Center>
                </Box>
            </Box>  
        </ChakraProvider>
      );
} 

export default Login