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

const Login = () => {

    const navigate = useNavigate();

    const login = () => {
        let anyError = false;
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
        localStorage.setItem("username", JSON.stringify(username));
        localStorage.setItem("password", JSON.stringify(password));
        navigate("/");
      }

    const [showPassword, setShowPassword] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
                                            <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} onClick={(e) => setUsernameError(false)} placeholder="Username"/>
                                            {usernameError && <FormErrorMessage>Username is required.</FormErrorMessage>}
                                        </FormControl>
                                    </Stack>
                                    <Stack w="100%">
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
                                    <Button maxW="150px" w="100%" name="dest_search_submit" onClick={ login } colorScheme="red">Submit</Button>
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