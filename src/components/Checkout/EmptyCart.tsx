import React from 'react';
import { Box, Center, Text } from '@chakra-ui/react';
import { LuShoppingCart } from 'react-icons/lu';
import { colors } from '../data/color';

const EmptyCart = () => {
	return (
		<Center
			flexDirection='column'
			py={8}>
			<LuShoppingCart
				size={32}
				color={colors.text}
			/>
			<Text
				textAlign='center'
				color={colors.text}
				mt={2}>
				Your cart is empty.
			</Text>
		</Center>
	);
};

export default EmptyCart;
