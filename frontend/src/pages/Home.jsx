import { ChakraProvider, Box, Center } from "@chakra-ui/react";
import SearchBar from "../components/SearchBar";
import "../index.css";
import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <ChakraProvider>
      <NavBar />
      <Box 
        bgImage="https://images.hdqwalls.com/download/1/yosemite-national-park-usa-4k-4r.jpg"
        bgPosition="center"
        bgRepeat="no-repeat"
      >
        
        <Center h="100vh">
          <SearchBar />
        </Center>
      </Box>
    </ChakraProvider>
  )
}



