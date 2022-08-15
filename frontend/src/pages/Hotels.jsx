import { useLocation } from "react-router-dom";
import { Box, Center, ChakraProvider, Show, Stack } from "@chakra-ui/react";
import "../index.css";
import Footer from "../components/HotelsFooter";
import NavBar from "../components/NavBar";
import CardList from "../components/CardList";
import HotelsSearchBar from "../components/HotelsSearchBar";
import SideBar from "../components/HotelsSideBar";
import { useEffect, useState, useRef } from 'react'
import { getHotels } from "../api/services/destinations";

function compareObjects(object1, object2, key, reverse=false) {
    const obj1 = object1[key]
    const obj2 = object2[key]
  
    if (obj1 < obj2) {
      return reverse ? 1 : -1;
    }
    if (obj1 > obj2) {
      return reverse ? -1 : 1;
    }
    return 0
}

export default function Hotels() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const sortMapper = {
        "0": ["searchRank", true],
        "1": ["price", false],
        "2": ["price", true],
        "3": ["rating", false],
        "4": ["rating", true],
        "5": ["distance", false]
    }

    const [hotelFilter, setHotelFilter] = useState("");
    const [priceBounds, setPriceBounds] = useState([0, 1000]);
    const [reviewBounds, setReviewBounds] = useState([0, 5]);
    const [priceRange, setPriceRange] = useState([0,1000]); // replace with min and max price of search
    const [reviewRange, setReviewRange] = useState([0,5]);
    const [starsRange, setStarsRange] = useState([1, 5]);
    const [sort, setSort] = useState("0");

    const [hotels, setHotels] = useState({"completed": false, "hotels": []});
    const [displayedLength, setDisplayedLength] = useState(11);
    const [updateTimer, setUpdateTimer] = useState(0);
    const [filteredHotels, setFilteredHotels] = useState({"completed": false, "hotels": []});

    useEffect(() => {
        const timer = window.setInterval(() => getHotels(params, parseHotels), 2000);
        setUpdateTimer(timer);
        console.log(`Setting timer ${timer}`);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        setFilteredHotels({
            completed: hotels.completed,
            hotels: hotels.hotels.filter(
            (hotel) => (hotel.name.toLowerCase().includes(hotelFilter))
            ).filter(
                (hotel) => (hotel.price >= priceRange[0] && hotel.price <= priceRange[1])
            ).filter(
                (hotel) => (hotel.review >= reviewRange[0] && hotel.review <= reviewRange[1])
            ).filter(
                (hotel) => (hotel.rating >= starsRange[0] && hotel.rating <= starsRange[1])
            ).sort(
                (a, b) => compareObjects(a, b, sortMapper[sort][0], sortMapper[sort][1])
            )
        });
        if (hotels.completed) {
            console.log(`Clearing timer ${updateTimer}`);
            clearInterval(updateTimer);
        }
    }, [hotels, hotelFilter, priceRange, reviewRange, starsRange, sort]);

    const parseHotels = (data) => {
        console.log(data);
        if (data.hotels.length > 0) {
            let minPrice = data.hotels[0].price;
            let maxPrice = data.hotels[0].price;
            let minReview = data.hotels[0].review;
            let maxReview = data.hotels[0].review;
    
            data.hotels.forEach((hotel) => {
                if (hotel.price < minPrice) {
                    minPrice = hotel.price;
                } else if (hotel.price > maxPrice) {
                    maxPrice = hotel.price;
                }
    
                if (hotel.review < minReview) {
                    minReview = hotel.review;
                } else if (hotel.review > maxReview) {
                    maxReview = hotel.review;
                }
            });
            setPriceRange([minPrice, maxPrice]);
            setReviewRange([minReview, maxReview]);

            setPriceBounds([minPrice, maxPrice]);
            setReviewBounds([minReview, maxReview]);

            if (data.completed) {
                clearInterval(updateTimer);
            }
        }

        setHotels(data);
    }

    const fetchMoreData = () => {
        setDisplayedLength(displayedLength + 10);
    }

    const resetState = () => {
        if (hotels.completed) {
            setHotelFilter("");
            setPriceRange(priceBounds);
            setReviewRange(reviewBounds);
            setStarsRange([1, 5]);
            setSort(0);
        }
    }

    return (
      <ChakraProvider>
        <Box h="100vh" w="100wh">
            <Box h="8%" w="100%">
                <NavBar></NavBar>
            </Box>
            <Box h="10%" w="100%">
                <HotelsSearchBar name="HotelSearchBar" params={ params }/>
            </Box>
            <Center id="hotels-box" background="#F5F4F1" w="100%" h="82%" overflowY='scroll' className="hotels-list">
                <Stack w={{base:"100%", lg:"75%"}} direction={{ base: 'column', lg: 'row-reverse' }} h="100%">       
                    <Center w={{base:"100%", lg:"75%"}} h="100%">
                        <CardList 
                            hotels={{completed: filteredHotels.completed, hotels: filteredHotels.hotels.slice(0, displayedLength)}}
                            fetchMoreData={fetchMoreData}
                            displayedLength={displayedLength}
                        />
                    </Center>
                    <Show above="lg" h="100%">
                        <Center w={{base:"100%", lg:"25%"}} h="100%">
                            <SideBar 
                                completed={hotels.completed}
                                priceBounds={priceBounds}
                                reviewBounds={reviewBounds}
                                priceRange={priceRange}
                                reviewRange={reviewRange}
                                starsRange={starsRange}
                                setHotelFilter={setHotelFilter}
                                setPriceRange={setPriceRange}
                                setReviewRange={setReviewRange}
                                setStarsRange={setStarsRange}
                                setSort={setSort}
                                resetState={resetState}
                            />
                        </Center>

                        
                    </Show>
                </Stack>
            </Center>
        </Box>   
      </ChakraProvider>
    )
}