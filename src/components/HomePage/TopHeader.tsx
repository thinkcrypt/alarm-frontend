import { Box, HStack, Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const TopHeader = () => {
    return (
        <Box bg={"#fbfbfb"} py={"15px"}>
            <nav>
                <HStack
                    justify="end"
                    gap={4}
                    px={{ base: 4, md: 7, lg: 15, xl: 8, '2xl': 20 }}
                >
                    <ChakraLink
                        as={Link}
                        href="#"
                        pr="10px"
                        borderRight="1px solid #000"
                        fontWeight="bold"
                        fontSize="12px"
                    >
                        Find a Store
                    </ChakraLink>
                    <ChakraLink
                        as={Link}
                        href="#"
                        pr="10px"
                        borderRight="1px solid #000"
                        fontWeight="bold"
                        fontSize="12px"
                    >
                        Help
                    </ChakraLink>
                    <ChakraLink
                        as={Link}
                        href="#"
                        pr="10px"
                        borderRight="1px solid #000"
                        fontWeight="bold"
                        fontSize="12px"
                    >
                        Join Us
                    </ChakraLink>
                    <ChakraLink
                        as={Link}
                        href="#"
                        pr="10px"
                        fontWeight="bold"
                        fontSize="12px"
                    >
                        Sign In
                    </ChakraLink>
                </HStack>
            </nav>
        </Box>
    );
};

export default TopHeader;