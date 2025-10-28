import { Box, BoxProps } from '@chakra-ui/react';
import React from 'react';

interface ContainerProps extends BoxProps {
	children: React.ReactNode;
}

const CustomContainer: React.FC<ContainerProps> = ({ children, ...rest }) => {
	return (
		<Box
			px={{ base: 4, md: 7, lg: '32px', '2xl': '84px' }} // responsive padding
			pt={{ base: 4, md: 5, lg: 8, 'xl': 11, '2xl': 10 }}
			{...rest} // allow additional props like bg, border, etc.
		>
			{children}
		</Box>
	);
};

export default CustomContainer;
