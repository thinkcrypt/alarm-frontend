import { Text, VStack } from '@chakra-ui/react';
import React from 'react'

const FooterInfoBlock = ({ title, children }: {
  title: string;
  children: React.ReactNode;
}) => (
  <VStack align="flex-start" gap={4}>
    <Text fontSize="lg" fontWeight="bold">{title}</Text>
    <VStack align="flex-start" gap={2} fontSize="sm">
      {children}
    </VStack>
  </VStack>
);


export default FooterInfoBlock