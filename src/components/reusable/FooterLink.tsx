import { Text } from '@chakra-ui/react';
import React from 'react'

const FooterLink = ({ children }: { children: React.ReactNode }) => (
  <Text fontSize="xs" cursor="pointer" _hover={{ textDecoration: "underline" }}>
    {children}
  </Text>
);


export default FooterLink