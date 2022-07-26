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

const Login = () => {

    const navigate = useNavigate();

    const registerRoute = () => {
        navigate("/register");
      }

    const toHomepage = () => {
    localStorage.setItem("isLoggedIn", true);
    navigate("/");
    }

    const [showPassword, setShowPassword] = useState(false)

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
                        <Input type="text" placeholder="Username" />
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
                        <Link>Forgot your password?</Link>
                        </FormHelperText>
                    </FormControl>
                    <Button
                        borderRadius={0}
                        type="submit"
                        variant="solid"
                        colorScheme="teal"
                        width="full"
                        onClick={toHomepage}
                    >
                        Login
                    </Button>
                    </Stack>
                </form>
                </Box>
            </Stack>
            <Box>
                Need an account?{" "}
                <Link color="teal.500" href="#"
                onClick={registerRoute}>
                Sign Up
                </Link>
            </Box>
            </Flex>
        </ChakraProvider>
      );
} 

export default Login