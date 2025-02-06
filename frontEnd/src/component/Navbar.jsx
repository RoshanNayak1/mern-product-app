import { Button, Container, Flex, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { CiSquarePlus } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { useColorMode } from '../components/ui/color-mode';
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

const Navbar = () => {
   const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={"1140px"} px={4}>
        <Flex 
          h={16} 
          alignItems={"center"} 
          justifyContent={"space-between"} 
          flexDir={{ base: "column", sm: "row" }}
        >
            {/* Flex Container for Product Store Text and Icon */}
            <Flex alignItems="center">
              <Text
                fontSize={{ base: 22, sm: 28 }}
                fontWeight={"bold"}
                color={'Highlight'}
                p={2}
                pr={1}
                textAlign={"center"}
                mr={2}  // Add a small right margin to space between text and cart icon
              >
                <Link to={"/"}>Product Store</Link>
              </Text>
              <CiShoppingCart style={{ marginLeft: '8px' }} size={30} color='purple'/>
            </Flex>

            {/* Right side buttons for creating and theme toggle */}
            <HStack spacing={2} alignItems={"center"}>
              <Link to={"/create"}>
                <Button>
                  <CiSquarePlus />
                </Button>
              </Link>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <CiLight /> : <MdDarkMode />}
              </Button>
            </HStack>
        </Flex>
    </Container>
  );
};

export default Navbar;
