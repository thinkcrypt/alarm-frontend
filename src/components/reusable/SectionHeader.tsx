import { Flex, Text, Box } from '@chakra-ui/react';
import React from 'react';

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <Flex align="center" mb={8}>
      {/* Left line */}
      <Box flex="1" h="2px" bg="gray.300" />

      {/* Title */}
      <Text px={4} fontSize="2xl" fontWeight="bold" textAlign="center">
        {title}
      </Text>

      {/* Right line */}
      <Box flex="1" h="2px" bg="gray.300" />
    </Flex>
  );
};

export default SectionHeader;
