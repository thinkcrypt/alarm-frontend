import { Box, HStack, Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const TopHeader = () => {
    return (
        <Box bg={"#fbfbfb"} py={"15px"}>
            <nav>
                <HStack justify="end" gap={4}>
                    <ChakraLink
                        as={Link}
                        href="#"
                        pr="10px"
                        borderRight="1px solid #000"
                    >
                        Find a Store
                    </ChakraLink>
                    <ChakraLink
                        as={Link}
                        href="#"
                        pr="10px"
                        borderRight="1px solid #000"
                    >
                        Help
                    </ChakraLink>
                    <ChakraLink
                        as={Link}
                        href="#"
                        pr="10px"
                        borderRight="1px solid #000"
                    >
                        Join Us
                    </ChakraLink>
                    <ChakraLink as={Link} href="#" pr="10px">
                        Sign In
                    </ChakraLink>
                </HStack>
            </nav>
        </Box>
    );
};

export default TopHeader;
