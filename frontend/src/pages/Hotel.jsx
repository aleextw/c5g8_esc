import { useLocation } from "react-router-dom";
import { Center, ChakraProvider, Flex, Show, Spacer } from "@chakra-ui/react";
import "../index.css";
import Footer from "../components/HotelsFooter";
import SideBar from "../components/HotelsSideBar";
import NavBar from "../components/NavBar";
import HotelDetails from "./hotelDetails/HotelDetails";
import SideSearchBar from "../components/SideSearchBar";


export default function Hotel() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    
    return (
      <ChakraProvider>
        <NavBar></NavBar>
        <Center>
            <Flex gap="5" w="100%" direction={{ base: 'column', lg: 'row-reverse' }}>       
                <HotelDetails params = {params} />
                <Spacer />
                <Show above="lg">
                    <SideSearchBar/>
                </Show>
                <Show below="lg">
                    <Footer/>
                </Show>
            </Flex>
        </Center>
      </ChakraProvider>
    )
}