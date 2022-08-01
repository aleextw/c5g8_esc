import {
    Box,
    Container,
    Stack, StackDivider,
    Text,
    Link,
    useColorModeValue,
    useDisclosure, AlertDialog, AlertDialogOverlay, AlertDialogContent
  } from '@chakra-ui/react';
  import React from 'react';
import SideBar from './HotelsSideBar';
  
  
  export default function Footer() {

    const {isOpen, onOpen, onClose} = useDisclosure();
    const cancelRef = React.useRef();

    return (
      <Box
        overflow="hidden"
        align="center"
        borderBottom={1}
        borderStyle={'solid'}
        w="100%"
        bg={useColorModeValue('blue.600', 'blue.900')}
        color={useColorModeValue('gray.700', 'gray.200')}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center'}}
          align={{ base: 'center'}}
          cursor='pointer'
          onClick={onOpen}>
          <Stack direction={'row'} spacing={6} divider={<StackDivider borderColor='grey.200' borderRightWidth="0.1rem"/>}>
            <Link color='white'>Filter / Sort</Link>
          </Stack>
        </Container>
        <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
                size="md">
                <AlertDialogOverlay/>

                <AlertDialogContent bg="none">
                    <SideBar/>
                </AlertDialogContent>
            </AlertDialog>
        </Box>
    );
  }