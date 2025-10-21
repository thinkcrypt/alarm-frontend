import React from 'react';
import { Box } from '@chakra-ui/react';

interface Props {
	value: string;
	multiline?: boolean;
}

const DisplayField: React.FC<Props> = ({ value, multiline }) => {
	return (
		<Box
			px={4}
			py={multiline ? 3 : 2}
			minH={multiline ? '80px' : '40px'}
			border='1px'
			borderColor='gray.200'
			rounded='md'
			bg='gray.50'
			display='flex'
			alignItems='center'
		>
			{value || '-'}
		</Box>
	);
};

export default DisplayField;
