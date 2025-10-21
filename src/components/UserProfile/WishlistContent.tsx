'use client';
import React from 'react';
import { VStack, Text, Button, Icon } from '@chakra-ui/react';
import { Heart } from 'lucide-react';

const WishlistContent: React.FC = () => {
	return (
		<VStack py={12} spaceX={4} spaceY={4} textAlign='center'>
			<Icon as={Heart} boxSize={12} color='gray.400' />
			<Text fontSize='xl' fontWeight='semibold'>
				This wishlist is empty.
			</Text>
			<Text color='gray.500' maxW='md'>
				You don't have any products in the wishlist yet. You will find a lot of
				interesting products on our "Shop" page.
			</Text>
			<Button colorScheme='gray'>Return To Shop</Button>
		</VStack>
	);
};

export default WishlistContent;
