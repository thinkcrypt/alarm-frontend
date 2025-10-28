'use client';
import { AspectRatio, Box, Flex, Grid, HStack, Image, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import PrimaryButton from './PrimaryButton';
import Link from 'next/link';
import BuyNowDialog from '../Cart/BuyNowDialog';
import { toaster } from '../ui/toaster';
import { colors } from '../data/color';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { addToCart as addToCartAction } from '@/store/slices/cartSlice';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
	product: any; // Using any since the actual structure doesn't match DetailedProduct
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { cartItems } = useAppSelector(state => state.cart);
	const [isHovered, setIsHovered] = useState(false);

	// Extract sizes and colors from customAttributes
	const sizes =
		product?.customAttributes
			?.filter((attr: any) => attr.label === 'size')
			.map((attr: any) => attr.value.toUpperCase()) || [];

	const productColors =
		product?.customAttributes
			?.filter((attr: any) => attr.label === 'color')
			.map((attr: any) => attr.value) || [];

	const isInCart = cartItems.some((item: any) => String(item.id) === String(product.id));

	// Calculate discount percentage
	const discountPercentage =
		product?.cost > product?.price
			? Math.round(((product.cost - product.price) / product.cost) * 100)
			: 0;

	// Get display image - fallback chain
	const primaryImage = product?.image || product?.images?.[0];
	const hoverImage = product?.images?.[1];

	return (
		<Box
			overflow='hidden'
			bg="#e5e5e5"
			// border='1px solid'
			borderColor='gray.100'
			borderRadius={'md'}>
			<Link href={`/product/${product?.slug}`}>
				<Box
					onClick={() => router.push(`/product/${product?.slug}`)}
					cursor={'pointer'}>
					<Box
						position='relative'
						w='full'>
						{/* 3:4 ratio wrapper */}

						<AspectRatio
							ratio={{ base: 4 / 5, md: 4 / 5 }}
							w='full'
							onMouseEnter={() => setIsHovered(true)}
							onMouseLeave={() => setIsHovered(false)}>
							{/* Image - always rendered */}
							<Image
								src={isHovered && hoverImage ? hoverImage : primaryImage}
								alt={product?.name}
								objectFit='cover'
								loading='lazy'
								transition='opacity 0.4s ease-in-out, transform 0.3s ease'
								opacity={isHovered && hoverImage ? 0.9 : 1}
							/>
						</AspectRatio>

						{/* Discount badge */}
						{discountPercentage > 0 && (
							<Box
								position='absolute'
								top={2}
								right={2}
								bg='red.500'
								color='white'
								px={2}
								py={1}
								borderRadius='md'
								fontSize='xs'
								fontWeight='bold'>
								{discountPercentage}% OFF
							</Box>
						)}
					</Box>
				</Box>
			</Link>

			<Link href={`/product/${product?.slug}`}>
				<Box
					p={{ base: 2, md: 4 }}
					alignItems='stretch'
					textAlign='center'
					gap={4}>
					<Text
						mb={2}
						fontSize='16px'
						fontWeight='medium'
						overflow='hidden'
						textOverflow='ellipsis'
						display='-webkit-box'
						style={{
							WebkitLineClamp: 1,
							WebkitBoxOrient: 'vertical',
						}}>
						{product?.name}
					</Text>

					<HStack
						justify='center'
						gap={2}>
						<Text
							fontSize='lg'
							fontWeight='bold'
							color='red.500'>
							৳{product?.price?.toLocaleString()}
						</Text>
						{product?.oldPrice && (
							<Text
								fontSize='sm'
								color='gray.500'
								textDecoration='line-through'>
								৳{product?.oldPrice?.toLocaleString()}
							</Text>
						)}
					</HStack>

					{/* Stock status */}
					{/* <Text fontSize='xs' color={product.stock > 0 ? 'green.500' : 'red.500'}>
					{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
				</Text> */}
				</Box>
			</Link>

			<Grid
				p={{ base: 2, md: 4 }}
				pt={2}
				onClick={e => e.stopPropagation()}
				templateColumns={{ base: '1fr', md: '1fr 1fr' }}
				alignItems={'center'}
				gap={{ base: 2, lg: 3 }}
				w='full'>
				<BuyNowDialog product={product} />
				<BuyNowDialog
					product={product}
					trigger={
						<PrimaryButton
							variant='outline'
							bgColor='white'
							disabled={isInCart || product?.stock === 0}
							w='full'
							size={{ base: 'sm', lg: 'md' }}
							fontSize={{ base: 'xs', lg: 'sm' }}>
							{isInCart ? 'In Cart' : product?.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
						</PrimaryButton>
					}
				/>
			</Grid>
		</Box>
	);
};

export default ProductCard;
