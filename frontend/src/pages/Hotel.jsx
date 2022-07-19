import { useLocation } from "react-router-dom";
import { Center, ChakraProvider, Flex, Show, Spacer } from "@chakra-ui/react";
import "../index.css";
import Footer from "../components/HotelsFooter";
import NavBar from "../components/NavBar";
import HotelDetails from "./hotelDetails/HotelDetails";
import SideBar from "../components/SideBar";
import HotelSearchBar from "../components/HotelSearchBar";


export default function Hotel() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    
    return (
      <ChakraProvider>
        <NavBar></NavBar>
        <HotelSearchBar params={params}></HotelSearchBar>
        <Center background="#F5F4F1" w="100%" h="100%" overflow="hidden">   
                <HotelDetails params = {params} />
        </Center>
      </ChakraProvider>
    )
}