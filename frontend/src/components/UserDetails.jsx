import { useState } from 'react';
import React from 'react';
import { useNavigate } from "react-router-dom";
import { 
  Button,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Spacer, 
  Flex,
  VStack,
  HStack,
  Center,
  StackDivider,
  Spinner,
  Alert,
  AlertIcon,
  AlertDescription,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { postDeleteAccount } from '../api/services/destinations';

export default function UserDetails(props) {
  const navigate = useNavigate();

  const [deleteError, setDeleteError] = useState("");
  const [deleting, setDeleting] = useState();

  const {isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const deleteAccount = (event) => {
    setDeleting(true);
    const body = {
      username: localStorage.getItem("username"),
      token: localStorage.getItem("token")
    };
    let response;
    postDeleteAccount(JSON.stringify(body)).then((data) => {
      console.log(data);
      response = data;
      if (response.status === 200) {
        setDeleting(false);
        if (response.valid === "") {            
          localStorage.removeItem("token");   
          localStorage.removeItem("firstName");
          localStorage.removeItem("lastName");
          localStorage.removeItem("email");
          localStorage.removeItem("phoneNumber");
          localStorage.removeItem("username");
          localStorage.removeItem("prevURL");
          navigate("/");
        } else {
          setDeleteError(response.valid);
          setInterval(() => setDeleteError(""), 10000);
        }
      } 
      setDeleteError("Account deletion failed for unknown reasons. Please try again.");
      setInterval(() => setDeleteError(""), 5000);
    });
  }

  return (
    <VStack w={{base: "70%", lg: "50%"}} h="100%" divider={<StackDivider borderColor='gray.200' />}>
    <Center w="100%">
        <VStack w="100%" padding={3}>
        <Heading>
            Booking Details
        </Heading>
        <HStack w="100%">
            <FormControl w="40%" isDisabled>
                <FormLabel>First Name</FormLabel>
                    <Input
                    type="text" 
                    name="firstName"
                    value={props.data.firstName}
                    />
            </FormControl>

            <FormControl w="40%" isDisabled>
            <FormLabel>Last Name</FormLabel>
                <Input 
                type="text" 
                name="lastName" 
                value={props.data.lastName}
                />
            </FormControl>
        </HStack>
        <HStack w="100%">
            <FormControl isDisabled>
                <FormLabel>Email</FormLabel>
                <Input
                type="email"
                name="email"
                value={props.data.email}
                />
            </FormControl>

            <FormControl isDisabled>
                <FormLabel>Phone Number</FormLabel>
                <Input
                type="number"
                // changed from tel
                name="number"
                placeholder="Phone Number"
                value={props.data.phoneNumber}
                />
            </FormControl>
        </HStack>
        </VStack>
    </Center>
    <Center w="100%">
        <Flex padding={4} w="100%">
            <Button name="button_confirmBooking"
                w="40%" bg="blue.300" color="black"
                _hover={{
                bg: 'blue.400',
                }}
                type="submit"
                onClick={() => console.log("Unimplemented")}>
                {"Update Account"}
            </Button>
            <Spacer/>
            {deleteError !== "" && <Alert status='error'>
                <AlertIcon />
                <AlertDescription>{deleteError}</AlertDescription>
            </Alert> }
            <Button w="40%" bg="red.500" color="black"
                _hover={{
                bg: 'red.600',
                }}
                onClick={onOpen}>
                {deleting ? <Spinner /> : "Delete Account"}
            </Button>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    Delete Account
                    </AlertDialogHeader>

                    <AlertDialogBody>
                    Are you sure? You can't undo this action afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme='red' onClick={deleteAccount} ml={3}>
                        Delete
                    </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Flex>
    </Center>
    </VStack>
  );
  
}