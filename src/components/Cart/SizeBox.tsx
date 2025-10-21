import { Box, Button, HStack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

const SizeBox = () => {
  const [selectedSize, setSelectedSize] = useState("M")
  const sizes = ["M", "L", "XL", "XXL", "3XL"]

  return (
    <Box w="full">
      <Text fontWeight="semibold" mb={2}>
        Size: {selectedSize}
      </Text>

      <HStack gap={2} wrap="wrap">
        {sizes.map((size) => (
          <Button
            key={size}
            size="sm"
            minW="45px"
            onClick={() => setSelectedSize(size)}
            variant={selectedSize === size ? "solid" : "outline"}
            colorScheme={selectedSize === size ? "blue" : "gray"}
          >
            {size}
          </Button>
        ))}
      </HStack>
    </Box>
  )
}

export default SizeBox
