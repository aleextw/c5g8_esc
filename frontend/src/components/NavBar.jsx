import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Link,
    Spinner,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    Alert,
    AlertIcon,
    AlertTitle,
  } from '@chakra-ui/react';
  import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
  } from '@chakra-ui/icons';
  import { useNavigate, useLocation } from "react-router-dom";
import { useState } from 'react';
import { postLogout } from '../api/services/destinations';
  
  export default function NavBar() {

    const navigate = useNavigate();
    const location = useLocation();

    const loginRoute = () => {
      localStorage.setItem("prevURL", location.pathname + location.search);
      navigate("/login");
    }
  
    const registerRoute = () => {
      localStorage.setItem("prevURL", location.pathname + location.search);
      navigate("/register");
    }

    const logout = () => {
      const body = {
        username: localStorage.getItem("username"),
        token: localStorage.getItem("token")
      };
      let response;
      setLoggingOut(true);
      postLogout(JSON.stringify(body)).then((data) => {
        response = data;
        setLoggingOut(false);
        if (response.status === 200) {
          if (response.valid === "") {            
            localStorage.removeItem("token");   
            localStorage.removeItem("firstName");
            localStorage.removeItem("lastName");
            localStorage.removeItem("email");
            localStorage.removeItem("phoneNumber");
            localStorage.removeItem("username");
            localStorage.removeItem("prevURL");
          } else {
            setLogoutError(response.valid);
          }
        } else {
          setLogoutError("Logout failed for unknown reasons. Please try again.");
          setInterval(() => setLogoutError(""), 5000);
        }
      });
    }

    const { isOpen, onToggle } = useDisclosure();
    const [ loggingOut, setLoggingOut ] = useState(false);
    const [ logoutError, setLogoutError ] = useState("");
    
    function ManageUser() {
      if (localStorage.getItem("token")) {
        const firstName = localStorage.getItem("firstName") !== null ? localStorage.getItem("firstName") : "Traveller";

        return (
          <Stack direction="row" h="100%" alignItems="center">
            {logoutError !== "" && <Alert status='error'>
            <AlertIcon />
            <AlertTitle>{logoutError}</AlertTitle>
            </Alert>}
              <Text textAlign="center" p="2">Hello {firstName}!</Text>
            
            <Button
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bg={'teal.400'}
              _hover={{
                bg: 'teal.300',
              }}
              onClick={logout}>
              {loggingOut ? <Spinner /> : "Log Out"}
            </Button>
          </Stack>
          
        )
      }
  
      else {
  
        return (
          <Stack
                flex={{ base: 1, md: 0 }}
                justify={'flex-end'}
                direction={'row'}
                spacing={6}>
                <Button
                  as={'a'}
                  fontSize={'sm'}
                  fontWeight={400}
                  variant={'link'}
                  onClick={loginRoute}>
                  Log In
                </Button>
                <Button
                  fontSize={'sm'}
                  fontWeight={600}
                  color={'white'}
                  bg={'pink.400'}
                  _hover={{
                    bg: 'pink.300',
                  }}
                  onClick={registerRoute}>
                  Register
                </Button>
              </Stack>
        )
      }
    }

    return (
      <Box h="100%">
        <Flex
          
          bg={useColorModeValue('white', 'gray.800')}
          color={useColorModeValue('gray.600', 'white')}
          h="100%"
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
          align={'center'}>
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}>
            
            <IconButton
                  onClick={onToggle}
                  icon={
                    isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
                  }
                  variant={'ghost'}
                  aria-label={'Toggle Navigation'}
                />
          </Flex>

          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
            <Link
              name="button_linkToHomePage"
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              fontFamily={'heading'}
              color={useColorModeValue('gray.800', 'white')}
              href="/">
              C5G8
            </Link>

            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <DesktopNav />
            </Flex>
          </Flex>
          
          <ManageUser/>
        </Flex>
  
        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Box>
    );
  }
  
  const DesktopNav = () => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
  
    return (
      <Stack direction={'row'} spacing={4}>
        {NAV_ITEMS.map((navItem) => (
          <Box key={navItem.label}>
            <Link
              p={2}
              href={navItem.href ?? '#'}
              fontSize={'sm'}
              fontWeight={500}
              color={linkColor}
              _hover={{
                textDecoration: 'none',
                color: linkHoverColor,
              }}>
              {navItem.label}
            </Link>
          </Box>
        ))}
      </Stack>
    );
  };
  
  const MobileNav = () => {
    return (
      <Stack
        bg={useColorModeValue('white', 'gray.800')}
        p={4}
        display={{ md: 'none' }}>
        {NAV_ITEMS.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}
      </Stack>
    );
  };
  
  const MobileNavItem = ({ label, children, href }) => {
    const { isOpen, onToggle } = useDisclosure();
  
    return (
      <Stack spacing={4} onClick={children && onToggle}>
        <Flex
          py={2}
          as={Link}
          href={href ?? '#'}
          justify={'space-between'}
          align={'center'}
          _hover={{
            textDecoration: 'none',
          }}>
          <Text
            fontWeight={600}
            color={useColorModeValue('gray.600', 'gray.200')}>
            {label}
          </Text>
          {children && (
            <Icon
              as={ChevronDownIcon}
              transition={'all .25s ease-in-out'}
              transform={isOpen ? 'rotate(180deg)' : ''}
              w={6}
              h={6}
            />
          )}
        </Flex>

        <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
          <Stack
            mt={2}
            pl={4}
            borderLeft={1}
            borderStyle={'solid'}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
            align={'start'}>
            {children &&
              children.map((child) => (
                <Link key={child.label} py={2} href={child.href}>
                  {child.label}
                </Link>
              ))}
          </Stack>
        </Collapse>
      </Stack>
    );
  };
  


  
  
  const NAV_ITEMS = [
    {label: "View a Booking", name:'button_viewBooking', href: "/booking/search"},
    {label: "Test", name:'test'}
    // {
    //   label: 'Inspiration',
    //   children: [
    //     {
    //       label: 'Explore Design Work',
    //       subLabel: 'Trending Design to inspire you',
    //       href: '#',
    //     },
    //     {
    //       label: 'New & Noteworthy',
    //       subLabel: 'Up-and-coming Designers',
    //       href: '#',
    //     },
    //   ],
    // },
    // {
    //   label: 'Find Work',
    //   children: [
    //     {
    //       label: 'Job Board',
    //       subLabel: 'Find your dream design job',
    //       href: '#',
    //     },
    //     {
    //       label: 'Freelance Projects',
    //       subLabel: 'An exclusive list for contract work',
    //       href: '#',
    //     },
    //   ],
    // },
    // {
    //   label: 'Learn Design',
    //   href: '#',
    // },
    // {
    //   label: 'Hire Designers',
    //   href: '#',
    // },
  ];
