import React from 'react';
import { Box, Flex, Image, Text, VStack, HStack } from '@chakra-ui/react';
import NextLink from 'next/link';

const SearchProductCard = ({ product, onClick }: { product: any; onClick: any }) => {
	return (
		<NextLink href={`/product/${product?.slug}`}>
			<Box
				onClick={onClick}
				p={3}
				_hover={{ bg: 'gray.50' }}
				cursor='pointer'
				borderBottom='1px solid'
				borderColor='gray.100'
				_last={{ borderBottom: 'none' }}>
				<HStack gap={3}>
					{product?.images?.[0] && (
						<Image
							src={product.images[0]}
							alt={product.name}
							boxSize='40px'
							objectFit='cover'
							borderRadius='md'
							flexShrink={0}
						/>
					)}
					<Box flex={1}>
						<Text
							fontSize='sm'
							fontWeight='medium'
							color='gray.900'
							lineClamp={1}>
							{product?.name}
						</Text>
						{product?.category?.name && (
							<Text
								fontSize='xs'
								color='gray.500'
								lineClamp={1}>
								in {product.category.name}
							</Text>
						)}
					</Box>
					<VStack
						gap={0}
						align='end'>
						{product?.oldPrice ? (
							<>
								<Text
									fontSize='sm'
									fontWeight='bold'
									color='red.500'>
									৳{product?.price.toLocaleString()}
								</Text>
								<Text
									fontSize='xs'
									color='gray.400'
									textDecoration='line-through'>
									৳{product?.oldPrice?.toLocaleString()}
								</Text>
							</>
						) : (
							<Text
								fontSize='sm'
								fontWeight='bold'
								color='gray.900'>
								৳{product?.price?.toLocaleString()}
							</Text>
						)}
					</VStack>
				</HStack>
			</Box>
		</NextLink>
	);
};

const priceTextCss: any = {
	fontSize: 'sm',
	fontWeight: 'bold',
	color: 'gray.900',
};

export default SearchProductCard;
