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
        <SearchBar/>
        <Center>
            <Box>
                <Flex gap="5" w="100%" direction={{ base: 'column', lg: 'row-reverse' }}>       
                    <CardList params={ params }/>
                    
                    <Show above="lg">
                        <SideSearchBar/>
                    </Show>
                    <Show below="lg">
                        <Footer/>
                    </Show>
                </Flex>
            </Box>
            
        </Center>
      </ChakraProvider>
    )
}