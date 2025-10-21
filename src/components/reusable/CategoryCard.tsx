import { Box, Image } from '@chakra-ui/react';
import React from 'react';
import PrimaryButton from './PrimaryButton';

const CategoryCard = ({
	image,
	title,
	bgColor = '#0d1426',
}: {
	image: string;
	title: string;
	bgColor?: string;
}) => (
	<Box
		position='relative'
		overflow='hidden'
		h={{ base: '160px', md: '300px' }}>
		<Image
			src={image}
			alt={title}
			w='100%'
			h='100%'
			objectFit='cover'
		/>
		<Box
			position='absolute'
			bottom={0}
			left={0}>
			<PrimaryButton
				bgColor={bgColor}
				borderRadius={0}
				// borderTopRightRadius={4}
				borderTopWidth='3px'
				borderRightWidth='3px'
				borderColor='white'
				color='white'>
				{title}
			</PrimaryButton>
		</Box>
	</Box>
);

export default CategoryCard;
