import React from 'react';
import { Box, Image, Text, VStack, HStack, Badge } from '@chakra-ui/react';
import Link from 'next/link';

interface Product {
	_id: string;
	name: string;
	images: string[];
	price: number;
	salePrice?: number;
	category?: {
		name: string;
	};
	brand?: {
		name: string;
	};
}

interface ProductCardProps {
	product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	return (
		<Link href={`/product/${product._id}`}>
			<Box
				bg='white'
				borderRadius='lg'
				overflow='hidden'
				boxShadow='sm'
				_hover={{
					boxShadow: 'md',
					transform: 'translateY(-2px)',
				}}
				transition='all 0.2s'
				cursor='pointer'
				h='full'>
				<Box position='relative'>
					<Image
						src={product.images?.[0] || '/placeholder-product.jpg'}
						alt={product.name}
						w='full'
						h='200px'
						objectFit='cover'
					/>
					{product.salePrice && (
						<Badge
							position='absolute'
							top={2}
							left={2}
							colorScheme='red'
							variant='solid'
							fontSize='xs'>
							Sale
						</Badge>
					)}
				</Box>

				<VStack
					p={4}
					gap={2}
					align='start'>
					<Text
						fontSize='sm'
						fontWeight='medium'
						lineClamp={2}
						lineHeight='1.3'>
						{product.name}
					</Text>

					{product.category?.name && (
						<Text
							fontSize='xs'
							color='gray.500'>
							{product.category.name}
						</Text>
					)}

					<HStack
						justify='space-between'
						w='full'>
						<VStack
							gap={0}
							align='start'>
							{product.salePrice ? (
								<>
									<Text
										fontSize='md'
										fontWeight='bold'
										color='red.500'>
										৳{product.salePrice}
									</Text>
									<Text
										fontSize='sm'
										color='gray.400'
										textDecoration='line-through'>
										৳{product.price}
									</Text>
								</>
							) : (
								<Text
									fontSize='md'
									fontWeight='bold'
									color='gray.900'>
									৳{product.price}
								</Text>
							)}
						</VStack>
					</HStack>
				</VStack>
			</Box>
		</Link>
	);
};

export default ProductCard;
