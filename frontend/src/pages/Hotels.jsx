import { useLocation } from "react-router-dom";
import { Box, Center, ChakraProvider, Flex, Show, Spacer } from "@chakra-ui/react";
import "../index.css";
import Footer from "../components/HotelsFooter";
import SideBar from "../components/HotelsSideBar";
import NavBar from "../components/NavBar";
import CardList from "../components/CardList";
import SearchBar from "../components/HotelsSearchBar";
import SideSearchBar from "../components/SideSearchBar";

export default function Hotels() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    return (
      <ChakraProvider>
        <NavBar></NavBar>
        <SearchBar params={ params }/>
        <Center w="100%" h="100vh">
            <Flex w="75%" direction={{ base: 'column', lg: 'row-reverse' }} h="100%">       
                <Center w="75%" h="100%">
                    <CardList params={ params }/>
                </Center>
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