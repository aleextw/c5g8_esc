import { useLocation } from "react-router-dom";
import { Center, ChakraProvider, Box } from "@chakra-ui/react";
import "../index.css";
import NavBar from "../components/NavBar";
import HotelDetails from "./hotelDetails/HotelDetails";
import HotelSearchBar from "../components/HotelSearchBar";


export default function Hotel() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    
    return (
      <ChakraProvider>
        <Box h="100vh" w="100wh">
            <Box h="8%" w="100%">
                <NavBar></NavBar>
            </Box>
            <Box h="10%" w="100%">
                <HotelSearchBar params={params}/>
            </Box>
            <Center background="#F5F4F1" w="100%" h="82%" overflow="hidden">   
                <HotelDetails params={params} />
            </Center>
        </Box>   
      </ChakraProvider>
    )
}