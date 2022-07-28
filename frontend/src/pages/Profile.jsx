import { useLocation } from "react-router-dom";
import { Center, ChakraProvider, Box, Heading, Spinner } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import UserDetails from "../components/UserDetails";
import { getUserData } from "../api/services/destinations";
import { useState, useEffect } from 'react';

export default function Profile() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [data, setData] = useState({status: 1});
    const body = {
        username: localStorage.getItem("username"),
        token: localStorage.getItem("token")
    };
    const foo = (bar) => {console.log(bar); setData(bar)}
    useEffect(() => getUserData(JSON.stringify(body), foo), []);

    return (<ChakraProvider>
        <Box h="100vh" w="100wh">
            <Box h="8%" w="100%">
                <NavBar></NavBar>
            </Box>
            <Center background="#F5F4F1" w="100%" h="92%" overflow="hidden">   
                {(data.status === 1) && <Spinner size="xl"/>}
                {(data.status === 200) && (data.valid === "") && <UserDetails params={params} data={data.user}/>}
                {(data.status === 200) && (data.valid !== "") && <Heading>{data.valid}</Heading>}
                {(data.status !== 200) && (data.status !== 1) && <Heading>An unexpected error occured while trying to load your profile. Please try again in a few moments.</Heading>}
            </Center>
        </Box>   
      </ChakraProvider>);
}
