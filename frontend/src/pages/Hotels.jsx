import { useLocation } from "react-router-dom";
import { Center, ChakraProvider, Flex, Show, Spacer } from "@chakra-ui/react";
import "../index.css";
import Footer from "../components/HotelsFooter";
import SideBar from "../components/HotelsSideBar";
import NavBar from "../components/NavBar";
import CardList from "../components/CardList";


export default function Hotels() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    return (
      <ChakraProvider>
        <NavBar></NavBar>
        <Center>
            <Flex gap="5" w="100%" direction={{ base: 'column', lg: 'row-reverse' }}>       
                <CardList params={ params }/>
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