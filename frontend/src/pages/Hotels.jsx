import { useLocation } from "react-router-dom";
import { Box, Center, ChakraProvider, Flex, Show, Spacer, Stack, Container } from "@chakra-ui/react";
import "../index.css";
import Footer from "../components/HotelsFooter";
import NavBar from "../components/NavBar";
import CardList from "../components/CardList";
import HotelsSearchBar from "../components/HotelsSearchBar";
import SideBar from "../components/HotelsSideBar";
import { useState } from 'react'

export default function Hotels() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    console.log(params.get("destination"));

    const [selectedHotel, setHotel] = useState("");
    // const [reviewRange, setReviewRange] = useState([]);
    const [minPrice, setMinPrice] = useState();
    const [maxPrice, setMaxPrice] = useState();
    const [priceRange, setPriceRange] = useState([0,1000]); // replace with min and max price of search
    const [starsRange, setStarsRange] = useState([0,100]);
    const [sort, setSort] = useState(0);

    return (
      <ChakraProvider>
        <Box h="100vh" w="100wh">
            <Box h="10%" w="100%">
                <NavBar></NavBar>
            </Box>
            <Box h="10%" w="100%">
                <HotelsSearchBar name="HotelSearchBar" params={ params }/>
            </Box>
            <Center background="#F5F4F1" w="100%" h="80%" overflow="hidden">
                <Stack w={{base:"100%", lg:"75%"}} direction={{ base: 'column', lg: 'row-reverse' }} h="100%">       
                    <Center w={{base:"100%", lg:"75%"}} h="100%">
                        <CardList 
                        selectedHotel={selectedHotel}
                        setMinPrice={setMinPrice}
                        setMaxPrice={setMaxPrice}
                        priceRange={priceRange}
                        starsRange={starsRange}
                        sort={sort}
                        params={ params }/>
                    </Center>
                    <Show above="lg" h="100%">
                        <SideBar 
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        setHotel={setHotel}
                        setPriceRange={setPriceRange}
                        setStarsRange={setStarsRange}
                        setSort={setSort}/>
                    </Show>
                    <Show below="lg">
                        <Footer/>
                    </Show>
                </Stack>
            </Center>
        </Box>   
      </ChakraProvider>
    )
}