'use client';
import { Badge, Box, HStack, Image, Text, VStack } from '@chakra-ui/react';
import React, { FC } from 'react';
import PrimaryButton from './PrimaryButton';
import Link from 'next/link';

type ProductCardV2Props = {
	product: any;
};

const ProductCardV2: FC<ProductCardV2Props> = ({ product }) => {
	return (
		<Box
			overflow='hidden'
			bg='white'
			border='1px solid'
			borderColor='gray.200'
			transition='all 0.2s'
		>
			<Box position='relative'>
				<Image
					src='/image-13.webp'
					alt={product.title}
					w='100%'
					h='200px'
					objectFit='cover'
				/>
				{product.discount && (
					<Badge
						position='absolute'
						top={2}
						left={2}
						bg='red.500'
						color='white'
						fontSize='xs'
					>
						-{product.discount}%
					</Badge>
				)}
			</Box>
			<VStack p={4} align='stretch' gap={2}>
				<Text fontSize='sm' fontWeight='medium'>
					{product.title}
				</Text>

				<HStack>
					<Text fontSize='lg' fontWeight='bold' color='red.500'>
						৳{product.price}
					</Text>
					{product.oldPrice && (
						<Text fontSize='sm' textDecoration='line-through' color='gray.500'>
							৳{product.oldPrice}
						</Text>
					)}
				</HStack>

				<Link href={'/checkout'}>
					<HStack w='full'>
						<PrimaryButton w='full' colorPalette='black'>
							Buy Now
						</PrimaryButton>
					</HStack>
				</Link>
			</VStack>
		</Box>
	);
};

export default ProductCardV2;
