import { useLocation } from "react-router-dom";
import { Box, Center, ChakraProvider, Flex, Show, Spacer, Stack, Container } from "@chakra-ui/react";
import "../index.css";
import Footer from "../components/HotelsFooter";
import NavBar from "../components/NavBar";
import CardList from "../components/CardList";
import HotelsSearchBar from "../components/HotelsSearchBar";
import SideBar from "../components/SideBar";

export default function Hotels() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    console.log(params.get("destination"));
    return (
      <ChakraProvider>
        <NavBar></NavBar>
        <HotelsSearchBar params={ params }/>
        {/* 84vh is the bodge for now, let's hope our component heights don't change */}
        <Center background="#F5F4F1" w="100%" h="84vh" overflow="hidden">
            <Stack w={{base:"100%", lg:"75%"}} direction={{ base: 'column', lg: 'row-reverse' }} h="100%">       
                <Center w={{base:"100%", lg:"75%"}} h="100%">
                    <CardList params={ params }/>
                </Center>
                <Show above="lg" h="100%">
                    <SideBar/>
                </Show>
                {/* <Show below="lg">
                    <Footer/>
                </Show> */}
            </Stack>
        </Center>
            
      </ChakraProvider>
    )
}