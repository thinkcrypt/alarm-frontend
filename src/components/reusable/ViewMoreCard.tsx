import { Box, Text } from '@chakra-ui/react';
import React from 'react'
const ViewMoreCard = () => (
  <Box 
    bg="orange.500" 
    color="white" 
    p={4} 
    borderRadius="md" 
    display="flex" 
    alignItems="center" 
    justifyContent="center"
    cursor="pointer"
    _hover={{ bg: "orange.600" }}
  >
    <Text fontSize="sm" fontWeight="bold">VIEW MORE</Text>
  </Box>
);

export default ViewMoreCard