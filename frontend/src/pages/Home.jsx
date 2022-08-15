import { ChakraProvider, Box, Center } from "@chakra-ui/react";
import SearchBar from "../components/SearchBar";
import "../index.css";
import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <ChakraProvider>      
      <Box h="100vh" w="100wh">
        <Box h="8%" w="100%">
            <NavBar></NavBar>
        </Box>
        <Box name="bgImage"
          bgImage="https://images.hdqwalls.com/download/1/yosemite-national-park-usa-4k-4r.jpg"
          bgPosition="center"
          bgRepeat="no-repeat"
          h="92%"
        >
          <Center h="100%">
            <SearchBar />
          </Center>
        </Box>
      </Box>  
    </ChakraProvider>
  );
}



