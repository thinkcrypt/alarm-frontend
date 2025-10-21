import { Box, Text, Flex } from '@chakra-ui/react';
import React from 'react';

interface ProductCardProps {
  image: string;
  price: number;
  originalPrice?: number;
  alt?: string;
  width?: string | object;
  height?: string | object;
}

const MiniProductCard: React.FC<ProductCardProps> = ({ 
  image, 
  price, 
  originalPrice, 
  alt = "Product image",
  width = "280px",
  height = "300px"
}) => {
  return (
    <Box
      position="relative"
      width={width}
      height={height}
      overflow="hidden"
      bg="gray.100"
      backgroundImage={`url(${image})`}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      cursor="pointer"
    >
      {/* Price overlay at bottom */}
      <Box
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        bg="white"
        backdropFilter="blur(8px)"
        p={1}
        borderTopRadius="md"
        mx={{base: 20, lg: 12, "2xl": 12}}
      >
        <Flex align="center" justify="center">
          <Flex align="center" gap={2}>
            <Text 
              fontSize="lg" 
              fontWeight="bold" 
              color="black"
            >
              ৳ {price.toLocaleString()}
            </Text>
            {originalPrice && originalPrice > price && (
              <Text 
                fontSize="sm" 
                color="gray.500" 
                textDecoration="line-through"
              >
                ৳ {originalPrice.toLocaleString()}
              </Text>
            )}
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default MiniProductCard;