import {
    Container,
    Image,
    Center,
    Heading,
    Text,
    VStack,
    HStack,
  Tag,
  Button,
  ChakraProvider
  } from '@chakra-ui/react';
  import * as React from 'react';
  import { useEffect, useState } from 'react';
  import { Navigate, useLocation, useNavigate } from "react-router-dom";
import NavBar from '../components/NavBar';

export default function Profile() {

    const navigate = useNavigate();

    const deleteData = () => {
        console.log("Account deleted")
        navigate("/")
    }

    const editName = () => {
        
    }

    const editEmail = () => {
        
    }

    const editNumber = () => {
        
    }

    const firstName = localStorage.getItem("firstName")
    const lastName = localStorage.getItem("lastName")
    const email = localStorage.getItem("email")
    const phoneNumber = localStorage.getItem("phoneNumber")
    const username = localStorage.getItem("username")

    return (
    <ChakraProvider>
        <NavBar></NavBar>
        <Container mt={4}>
          <Center>
            <VStack>
              <Heading>User Details</Heading>
              <Text color="gray">
                <strong>Name:</strong> {firstName + lastName} 
                <Button
                    onClick = {editName}>
                    Edit
                </Button>
              </Text>
    
              <Text color="gray">
                <strong>Email:</strong> {email} 
                <Button
                    onClick = {editEmail}>
                    Edit
                </Button>
              </Text>
    
              <Text color="gray">
                <strong>Phone Number:</strong> {phoneNumber} 
                <Button
                    onClick = {editNumber}>
                    Edit
                </Button>
              </Text>

              <Button
                onClick = {deleteData}>
                Delete Account
              </Button>
            </VStack>
          </Center>
        </Container>
    </ChakraProvider>
      );
}

