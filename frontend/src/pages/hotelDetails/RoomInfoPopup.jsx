import React from "react";
import {UnorderedList, ListItem, Divider, GridItem, Grid} from "@chakra-ui/react";

import {
  Button,
  Text,
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Heading,
  Link,
} from "@chakra-ui/react";

function RoomInfoPopup(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box w="100%" align="left">
        <Link onClick={onOpen} color="teal.500">
          View More Details
        </Link>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid templateRows={"auto"} gap={5}>
              <GridItem w={"100%"} h={"100%"}>
                <Text dangerouslySetInnerHTML={{__html: props.content}}/>
              </GridItem>

              <GridItem w={"100%"} h={"100%"}>
                <Divider/>
              </GridItem>

              <GridItem w={"100%"} h={"100%"}>
                <Heading size={"md"}>Amenities:</Heading>
              </GridItem>
              
              <GridItem w={"100%"} h={"100%"}>
                <UnorderedList>
                {
                  props.amenities.slice(0, props.amenities.length).map((amenity) => {
                    if (amenity.toLowerCase().includes("room size") ||  (amenity.toLowerCase().includes("number of bedrooms"))) {

                    }

                    else {
                      return (
                          <ListItem margin={1}>{amenity}</ListItem>
                        )
                    }
                    })}
                </UnorderedList>
              </GridItem>
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default RoomInfoPopup;
