import { useLocation } from "react-router-dom";
import { Center, ChakraProvider, Flex, Show, Spacer } from "@chakra-ui/react";
import "../index.css";
import Footer from "../components/HotelsFooter";
import NavBar from "../components/NavBar";
import HotelDetails from "./hotelDetails/HotelDetails";
import SideBar from "../components/SideBar";


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
                    <SideBar/>
                </Show>
                <Show below="lg">
                    <Footer/>
                </Show>
            </Flex>
        </Center>
      </ChakraProvider>
    )
}