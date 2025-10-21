import { Box, Button, Flex, Input } from '@chakra-ui/react';
import React from 'react';
import { colors } from '../data/color';

const Coupon = () => {
	return (
		<Box
			border={`.5px solid ${colors.blackBorder}`}
			rounded='md'
			p={4}
			mt={6}
			bg={colors.whiteBg}>
			<Flex>
				<Input
					placeholder='Enter Coupon Code'
					border={`1px solid ${colors.blackBorder}`}
				/>
				<Button ml={2}>Apply</Button>
			</Flex>
		</Box>
	);
};

export default Coupon;
