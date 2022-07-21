import React from "react";
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
  ModalCloseButton
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
