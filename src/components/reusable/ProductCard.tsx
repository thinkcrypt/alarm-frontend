'use client';
import {
	AspectRatio,
	Badge,
	Box,
	Flex,
	FlexProps,
	Grid,
	HStack,
	Image,
	Text,
} from '@chakra-ui/react';
import { TextProps, ImageProps, GridProps, BoxProps } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import PrimaryButton from './PrimaryButton';
import Link from 'next/link';
import BuyNowDialog from '../Cart/BuyNowDialog';
import { colors } from '../data/color';
import { useAppSelector } from '@/hooks';

interface ProductCardProps {
	product: any; // Using any since the actual structure doesn't match DetailedProduct
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	const { cartItems } = useAppSelector(state => state.cart);
	const [isHovered, setIsHovered] = useState(false);

	const isInCart = cartItems.some(
		(item: any) => String(item.id) === String(product.id)
	);
	//
	const [selectedImage, setSelectedImage] = useState(product?.images[0]);
	const [selectedSize, setSelectedSize] = useState('');
	const [selectedColor, setSelectedColor] = useState('');

	// Update selected image when color/size changes
	useEffect(() => {
		if (!selectedColor && !selectedSize) {
			// Use default product image
			setSelectedImage(product?.images?.[0] || product?.image);
			return;
		}

		// Find matching variation
		const matchingVariation = product?.variations?.find((variation: any) => {
			const sizeAttr = variation.attributes?.find(
				(attr: any) => attr.label === 'size'
			);
			const colorAttr = variation.attributes?.find(
				(attr: any) => attr.label === 'color'
			);

			return (
				(!selectedSize || sizeAttr?.value === selectedSize) &&
				(!selectedColor || colorAttr?.value === selectedColor)
			);
		});

		// Update image if variation has specific images
		if (matchingVariation?.images?.[0]?.[0]) {
			setSelectedImage(matchingVariation.images[0][0]);
		} else if (product?.images?.[0]) {
			setSelectedImage(product?.images[0]);
		}
	}, [selectedColor, selectedSize, product]);
	// Calculate discount percentage
	const discountPercentage = 0;
	// Get display image - fallback chain
	const primaryImage = product?.image || product?.images?.[0];
	const hoverImage = product?.images?.[1];

	// Get current variation based on selected size and color
	const currentVariation = product?.variations?.find((variation: any) => {
		const sizeAttr = variation.attributes?.find(
			(attr: any) => attr.label === 'size'
		);
		const colorAttr = variation.attributes?.find(
			(attr: any) => attr.label === 'color'
		);

		return (
			(!selectedSize || sizeAttr?.value === selectedSize) &&
			(!selectedColor || colorAttr?.value === selectedColor)
		);
	});

	/////////////////// discount calculations
	const discountType = product?.discountType || 'percentage';
	const discountValue = Number(product?.discount) || 0;
	const hasDiscount = product?.isDiscount && discountValue > 0;
	const getDiscountBasePrice = (price: number, cost: number) => {
		const priceNum = Number(price);
		const costNum = Number(cost);
		return priceNum > 0 ? priceNum : costNum;
	};
	const basePriceForDisplay = getDiscountBasePrice(
		currentVariation?.price || product?.price,
		currentVariation?.cost || product?.price
	);
	// calculate discount
	const calcDiscountedPrice = (basePrice: any) => {
		if (!hasDiscount) return basePrice;
		if (discountType === 'flat') {
			const discountVal = basePrice - discountValue;
			return Math.max(0, discountVal);
		}
		//type percentage
		const discounted = basePrice - basePrice * (discountValue / 100);
		return Math.max(0, Math.round(discounted));
	};
	const discountedPriceForDisplay = calcDiscountedPrice(basePriceForDisplay);
	return (
		<Flex {...containerCss}>
			<Link href={`/product/${product?.slug}`}>
				<Box position='relative' w='full'>
					<AspectRatio
						ratio={{ base: 4 / 5, md: 4 / 5 }}
						w='full'
						onMouseEnter={() => setIsHovered(true)}
						onMouseLeave={() => setIsHovered(false)}
					>
						{/* Image - always rendered */}
						<Image
							src={isHovered && hoverImage ? hoverImage : primaryImage}
							alt={product?.name}
							{...imageCss}
							opacity={isHovered && hoverImage ? 0.9 : 1}
						/>
					</AspectRatio>

					{/* Discount badge */}
					{hasDiscount && (
						<Box {...discountBadgeStyle}>
							{/* percentage type */}
							{discountType === 'percentage' && (
								<Text>{product?.discount}% OFF</Text>
							)}
							{/* flat type */}
							{discountType === 'flat' && <Text>৳{product?.discount} OFF</Text>}
						</Box>
					)}
				</Box>
			</Link>
			<Flex flex={1}>
				<Link
					href={`/product/${product?.slug}`}
					style={{ width: '100%', display: 'flex', flex: 1 }}
				>
					<Flex {...cardBodyCss}>
						<Text {...productNameCss}>{product?.name}</Text>
						<HStack>
							<Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight='800'>
								৳ {discountedPriceForDisplay.toLocaleString()}
							</Text>

							{hasDiscount &&
								discountedPriceForDisplay < basePriceForDisplay && (
									<>
										<Text
											as='s'
											color='red.400'
											fontSize={{ base: 'sm', md: 'md' }}
										>
											৳ {basePriceForDisplay.toLocaleString()}
										</Text>
									</>
								)}
						</HStack>
						{/* <HStack justify='center' gap={2}>
							<Text {...priceTextCss}>৳{product?.price?.toLocaleString()}</Text>
							{product?.oldPrice && (
								<Text {...oldPriceCss}>
									৳{product?.oldPrice?.toLocaleString()}
								</Text>
							)}
						</HStack> */}
					</Flex>
				</Link>
			</Flex>

			<Flex>
				<Grid {...btnGridCss} onClick={e => e.stopPropagation()}>
					<BuyNowDialog product={product} />
					<BuyNowDialog
						product={product}
						trigger={
							<PrimaryButton
								{...atcBtnStyle}
								disabled={isInCart || product?.stock === 0}
							>
								{isInCart
									? 'In Cart'
									: product?.stock === 0
									? 'Out of Stock'
									: 'Add to Cart'}
							</PrimaryButton>
						}
					/>
				</Grid>
			</Flex>
		</Flex>
	);
};

const containerCss: FlexProps = {
	borderRadius: 'md',
	overflow: 'hidden',
	bg: colors.cardBg,
	borderColor: 'gray.100',
	cursor: 'pointer',
	flexDirection: 'column',
};

const imageCss: ImageProps = {
	objectFit: 'cover',
	loading: 'lazy',
	transition: 'opacity 0.4s ease-in-out, transform 0.3s ease',
};

const cardBodyCss: FlexProps = {
	p: { base: 2, md: 4 },
	w: 'full',
	flexDirection: 'column',
	flex: 1,
	textAlign: 'center',
	alignItems: 'center',
	justifyContent: 'center',
	gap: { base: 1, md: 2 },
};

const productNameCss: TextProps = {
	mb: 2,
	fontSize: { base: '15px', md: '16px' },
	fontWeight: 'medium',
	overflow: 'hidden',
	lineHeight: '1.4',
};

const priceTextCss: TextProps = {
	fontSize: 'lg',
	fontWeight: 'bold',
	color: 'red.500',
};

const oldPriceCss: TextProps = {
	fontSize: 'sm',
	color: 'gray.500',
	textDecoration: 'line-through',
};

const btnGridCss: GridProps = {
	p: { base: 2, md: 4 },
	pt: 2,
	templateColumns: { base: '1fr', md: '1fr 1fr' },
	alignItems: 'center',
	gap: { base: 2 },
	w: 'full',
};

const discountBadgeStyle: any = {
	position: 'absolute',
	top: 2,
	right: 2,
	bg: 'red.500',
	color: 'white',
	px: 2,
	py: 1,
	borderRadius: 'md',
	fontSize: 'xs',
	fontWeight: 'bold',
};

const atcBtnStyle: any = {
	variant: 'outline',
	bgColor: '#e4e7ee',
	display: { base: 'none', md: 'flex' },
	w: 'full',
	size: { base: 'xs' },
	fontSize: { base: 'xs', xl: 'sm' },
};

export default ProductCard;

///// initial version
// 'use client';
// import { AspectRatio, Box, Flex, Grid, HStack, Image, Text } from '@chakra-ui/react';
// import React, { useState } from 'react';
// import PrimaryButton from './PrimaryButton';
// import Link from 'next/link';
// import BuyNowDialog from '../Cart/BuyNowDialog';
// import { toaster } from '../ui/toaster';
// import { colors } from '../data/color';
// import { useAppDispatch, useAppSelector } from '@/hooks';
// import { addToCart as addToCartAction } from '@/store/slices/cartSlice';
// import { useRouter } from 'next/navigation';

// interface ProductCardProps {
// 	product: any; // Using any since the actual structure doesn't match DetailedProduct
// }

// const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
// 	const dispatch = useAppDispatch();
// 	const router = useRouter();
// 	const { cartItems } = useAppSelector(state => state.cart);
// 	const [isHovered, setIsHovered] = useState(false);

// 	// Extract sizes and colors from customAttributes
// 	const sizes =
// 		product?.customAttributes
// 			?.filter((attr: any) => attr.label === 'size')
// 			.map((attr: any) => attr.value.toUpperCase()) || [];

// 	const productColors =
// 		product?.customAttributes
// 			?.filter((attr: any) => attr.label === 'color')
// 			.map((attr: any) => attr.value) || [];

// 	const isInCart = cartItems.some((item: any) => String(item.id) === String(product.id));

// 	// Calculate discount percentage
// 	const discountPercentage =
// 		product?.cost > product?.price
// 			? Math.round(((product.cost - product.price) / product.cost) * 100)
// 			: 0;

// 	// Get display image - fallback chain
// 	const primaryImage = product?.image || product?.images?.[0];
// 	const hoverImage = product?.images?.[1];

// 	return (
// 		<Box
// 			overflow='hidden'
// 			bg="#F5F8F8"
// 			// border='1px solid'
// 			borderColor='gray.100'
// 			borderRadius={'md'}>
// 			<Link href={`/product/${product?.slug}`}>
// 				<Box
// 					onClick={() => router.push(`/product/${product?.slug}`)}
// 					cursor={'pointer'}>
// 					<Box
// 						position='relative'
// 						w='full'>
// 						{/* 3:4 ratio wrapper */}

// 						<AspectRatio
// 							ratio={{ base: 4 / 5, md: 4 / 5 }}
// 							w='full'
// 							onMouseEnter={() => setIsHovered(true)}
// 							onMouseLeave={() => setIsHovered(false)}>
// 							{/* Image - always rendered */}
// 							<Image
// 								src={isHovered && hoverImage ? hoverImage : primaryImage}
// 								alt={product?.name}
// 								objectFit='cover'
// 								loading='lazy'
// 								transition='opacity 0.4s ease-in-out, transform 0.3s ease'
// 								opacity={isHovered && hoverImage ? 0.9 : 1}
// 							/>
// 						</AspectRatio>

// 						{/* Discount badge */}
// 						{discountPercentage > 0 && (
// 							<Box
// 								position='absolute'
// 								top={2}
// 								right={2}
// 								bg='red.500'
// 								color='white'
// 								px={2}
// 								py={1}
// 								borderRadius='md'
// 								fontSize='xs'
// 								fontWeight='bold'>
// 								{discountPercentage}% OFF
// 							</Box>
// 						)}
// 					</Box>
// 				</Box>
// 			</Link>

// 			<Link href={`/product/${product?.slug}`}>
// 				<Box
// 					p={{ base: 2, md: 4 }}
// 					alignItems='stretch'
// 					textAlign='center'
// 					gap={4}>
// 					<Text
// 						mb={2}
// 						fontSize='16px'
// 						fontWeight='medium'
// 						overflow='hidden'
// 						textOverflow='ellipsis'
// 						display='-webkit-box'
// 						style={{
// 							WebkitLineClamp: 1,
// 							WebkitBoxOrient: 'vertical',
// 						}}>
// 						{product?.name}
// 					</Text>

// 					<HStack
// 						justify='center'
// 						gap={2}>
// 						<Text
// 							fontSize='lg'
// 							fontWeight='bold'
// 							color='red.500'>
// 							৳{product?.price?.toLocaleString()}
// 						</Text>
// 						{product?.oldPrice && (
// 							<Text
// 								fontSize='sm'
// 								color='gray.500'
// 								textDecoration='line-through'>
// 								৳{product?.oldPrice?.toLocaleString()}
// 							</Text>
// 						)}
// 					</HStack>

// 					{/* Stock status */}
// 					{/* <Text fontSize='xs' color={product.stock > 0 ? 'green.500' : 'red.500'}>
// 					{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
// 				</Text> */}
// 				</Box>
// 			</Link>

// 			<Grid
// 				p={{ base: 2, md: 4 }}
// 				pt={2}
// 				onClick={e => e.stopPropagation()}
// 				templateColumns={{ base: '1fr', md: '1fr 1fr' }}
// 				alignItems={'center'}
// 				gap={{ base: 2, lg: 3 }}
// 				w='full'>
// 				<BuyNowDialog product={product} />
// 				<BuyNowDialog
// 					product={product}
// 					trigger={
// 						<PrimaryButton
// 							variant='outline'
// 							bgColor='white'
// 							disabled={isInCart || product?.stock === 0}
// 							w='full'
// 							size={{ base: 'sm', lg: 'md' }}
// 							fontSize={{ base: 'xs', lg: 'sm' }}>
// 							{isInCart ? 'In Cart' : product?.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
// 						</PrimaryButton>
// 					}
// 				/>
// 			</Grid>
// 		</Box>
// 	);
// };

// export default ProductCard;
