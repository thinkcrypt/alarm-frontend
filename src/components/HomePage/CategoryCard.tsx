'use client';
import { Box, Image, Text, useBreakpointValue } from '@chakra-ui/react';
import React, { FC } from 'react';

type CategoryCardProps = {
	category: any;
};

const CategoryCard: FC<CategoryCardProps> = ({ category }) => {
	const cardHeight = useBreakpointValue({
		base: '200px',
		md: '250px',
		lg: '400px',
	});
	return (
		<Box position='relative' h={cardHeight} overflow='hidden' cursor='pointer'>
			{/* Background Image */}
			<Image
				src={category?.image}
				alt={category?.name}
				w='100%'
				h='100%'
				objectFit='cover'
			/>

			{/* Gradient Overlay */}
			<Box
				position='absolute'
				top={0}
				left={0}
				right={0}
				bottom={0}
				bg='linear-gradient(to right, rgba(0,0,0,0.3), rgba(0,0,0,0.4))'
			/>

			{/* Content */}
			<Box
				position='absolute'
				bottom={0}
				left={0}
				right={0}
				display='flex'
				alignItems='center'
				justifyContent='center'
				textAlign='center'
				p={{ base: 4, md: 6 }}
				color='white'
			>
				<Text fontSize={{ base: 'lg', md: 'xl' }}>{category?.name}</Text>
			</Box>
		</Box>
	);
};

export default CategoryCard;
