import React from "react";
import {Spacer, UnorderedList, ListItem, Divider} from "@chakra-ui/react";

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
  Heading
} from "@chakra-ui/react";

function RoomInfoPopup(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} colorScheme="teal" variant="ghost" width="50%">
        View More Details
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Text dangerouslySetInnerHTML={{__html: props.content}}/>
            </Box>
            <Text>   </Text>
            <Divider/>
            <Heading size={"md"}>Amenities:</Heading>
            <Text>   </Text>
            <UnorderedList>
            {
              props.amenities.slice(0, props.amenities.length).map((amenity) => {
                    return (
                      <ListItem>{amenity}</ListItem>
                    )
                })}
            </UnorderedList>
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
