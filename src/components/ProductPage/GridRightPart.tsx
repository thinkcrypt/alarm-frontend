'use client';
import {
	Badge,
	Button,
	GridItem,
	Heading,
	HStack,
	IconButton,
	Text,
	VStack,
	Box,
} from '@chakra-ui/react';
import React, { FC, useEffect } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { toaster } from '../ui/toaster';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { addToCart as addToCartAction } from '@/store/slices/cartSlice';
import { addToNowCart } from '@/store/slices/buyNowSlice';
import { useRouter } from 'next/navigation';
import SizeGuideModal from './SizeGuideModal';

type GridRightPartProps = {
	product: any;
	selectedSize: string;
	setSelectedSize: (size: string) => void;
	selectedColor?: string;
	setSelectedColor?: (color: string) => void;
};

const GridRightPart: FC<GridRightPartProps> = ({
	product,
	selectedSize,
	setSelectedSize,
	selectedColor,
	setSelectedColor,
}) => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { cartItems } = useAppSelector(state => state.cart);

	// Get available sizes and colors from variations first, then fallback to other sources
	let availableSizes: string[] = [];
	let availableColors: string[] = [];

	// Primary Method: Extract from variations if they exist
	if (product?.variations && product.variations.length > 0) {
		const sizeValues = product.variations.reduce((acc: string[], variation: any) => {
			const sizeAttr = variation.attributes?.find((attr: any) => attr.label === 'size');
			if (sizeAttr?.value && !acc.includes(sizeAttr.value)) {
				acc.push(sizeAttr.value);
			}
			return acc;
		}, []);
		availableSizes = sizeValues;

		const colorValues = product.variations.reduce((acc: string[], variation: any) => {
			const colorAttr = variation.attributes?.find((attr: any) => attr.label === 'color');
			if (colorAttr?.value && !acc.includes(colorAttr.value)) {
				acc.push(colorAttr.value);
			}
			return acc;
		}, []);
		availableColors = colorValues;
	}
	// Fallback Method: Use pre-computed arrays if variations don't exist
	else if (product?.sizes && Array.isArray(product.sizes)) {
		availableSizes = product.sizes;
		if (product?.colors && Array.isArray(product.colors)) {
			availableColors = product.colors;
		}
	}
	// Final Fallback: Use customAttributes if neither variations nor computed arrays exist
	else if (product?.customAttributes) {
		availableSizes = product.customAttributes
			.filter((attr: any) => attr.label === 'size')
			.map((attr: any) => attr.value)
			.filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);

		availableColors = product.customAttributes
			.filter((attr: any) => attr.label === 'color')
			.map((attr: any) => attr.value)
			.filter((value: string, index: number, self: string[]) => self.indexOf(value) === index);
	}

	// Get current variation based on selected size and color
	const currentVariation = product?.variations?.find((variation: any) => {
		const sizeAttr = variation.attributes?.find((attr: any) => attr.label === 'size');
		const colorAttr = variation.attributes?.find((attr: any) => attr.label === 'color');

		return (
			(!selectedSize || sizeAttr?.value === selectedSize) &&
			(!selectedColor || colorAttr?.value === selectedColor)
		);
	});

	useEffect(() => {}, []);

	// Calculate available stock for current selection
	const currentStock = currentVariation?.stock || 0;

	// Check if specific variation is in cart
	const productId = product?.id || product?._id;
	const baseId = productId;
	const variationPart =
		currentVariation?._id || `${selectedSize || 'no-size'}-${selectedColor || 'no-color'}`;
	const currentUniqueId = `${baseId}-${variationPart}`;
	const isInCart = cartItems.some((item: any) => item.uniqueId === currentUniqueId);

	// Calculate discount percentage if applicable
	const discountPercentage =
		product?.isDiscount && product.discount > 0
			? Math.round(((product.cost - product.price) / product.cost) * 100)
			: product?.discount || 0;

	// Helper function to determine if buttons should be disabled
	const isButtonDisabled = () => {
		// If no variations are available at all, disable buttons
		if (!product?.variations || product.variations.length === 0) return true;

		// If product has variations but no valid variant is selected
		if (product?.variations && product.variations.length > 0 && !currentVariation) return true;

		// If sizes are available but none selected
		if (availableSizes.length > 0 && !selectedSize) return true;

		// If colors are available but none selected
		if (availableColors.length > 0 && !selectedColor) return true;

		// If out of stock
		if (currentStock <= 0) return true;

		return false;
	};

	const handleAddToCart = () => {
		// Check if no variations are available
		if (!product?.variations || product.variations.length === 0) {
			toaster.create({
				title: 'This product has no available variations',
				type: 'error',
			});
			return;
		}

		// Check if size is required and selected
		if (availableSizes.length > 0 && !selectedSize) {
			toaster.create({
				title: 'Please select a size',
				type: 'error',
			});
			return;
		}

		// Check if color is required and selected
		if (availableColors.length > 0 && !selectedColor) {
			toaster.create({
				title: 'Please select a color',
				type: 'error',
			});
			return;
		}

		// Check if variants exist but no variant is selected
		if (product?.variations && product.variations.length > 0 && !currentVariation) {
			toaster.create({
				title: 'Please select a valid size and color combination',
				type: 'error',
			});
			return;
		}

		// Check stock availability
		if (currentStock <= 0) {
			toaster.create({
				title: 'This item is out of stock',
				type: 'error',
			});
			return;
		}

		const primaryImage = currentVariation?.images?.[0]?.[0] || product.image || product.images?.[0];

		// Generate variant name for cart display
		const variantName =
			selectedSize && selectedColor
				? `${selectedSize.toUpperCase()} / ${
						selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)
				  }`
				: selectedSize
				? selectedSize.toUpperCase()
				: selectedColor
				? selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)
				: '';

		const item = {
			_id: String(productId),
			id: productId,
			name: product.name,
			price: currentVariation?.price || product.price,
			vat: product.vat || 0,
			image: primaryImage,
			selectedSize,
			selectedColor,
			variationId: currentVariation?._id,
			variantStock: currentStock,
			stock: currentStock,
			variantName,
		};
		dispatch(addToCartAction({ item, qty: 1 }));
		toaster.create({
			title: `${product.name} has been added to your cart`,
			type: 'success',
		});
	};

	const handleBuyNow = () => {
		// Check if no variations are available
		if (!product?.variations || product.variations.length === 0) {
			toaster.create({
				title: 'This product has no available variations',
				type: 'error',
			});
			return;
		}

		// Check if size is required and selected
		if (availableSizes.length > 0 && !selectedSize) {
			toaster.create({
				title: 'Please select a size',
				type: 'error',
			});
			return;
		}

		// Check if color is required and selected
		if (availableColors.length > 0 && !selectedColor) {
			toaster.create({
				title: 'Please select a color',
				type: 'error',
			});
			return;
		}

		// Check if variants exist but no variant is selected
		if (product?.variations && product.variations.length > 0 && !currentVariation) {
			toaster.create({
				title: 'Please select a valid size and color combination',
				type: 'error',
			});
			return;
		}

		// Check stock availability
		if (currentStock <= 0) {
			toaster.create({
				title: 'This item is out of stock',
				type: 'error',
			});
			return;
		}

		const primaryImage = currentVariation?.images?.[0]?.[0] || product.image || product.images?.[0];

		// Generate variant name for cart display
		const variantName =
			selectedSize && selectedColor
				? `${selectedSize.toUpperCase()} / ${
						selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)
				  }`
				: selectedSize
				? selectedSize.toUpperCase()
				: selectedColor
				? selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)
				: '';

		const item = {
			_id: String(productId),
			id: productId,
			name: product.name,
			price: currentVariation?.price || product.price,
			vat: product.vat || 0,
			image: primaryImage,
			selectedSize,
			selectedColor,
			variationId: currentVariation?._id,
			variantStock: currentStock,
			stock: currentStock,
			variantName,
		};
		dispatch(addToNowCart({ item, qty: 1 }));
		router.push('/buy-now-checkout');
		toaster.create({
			title: `${product.name} has been added to your cart`,
			type: 'success',
		});
	};

	console.log('product', product);

	return (
		<GridItem>
			<VStack
				align='start'
				gap={4}
				pt={8}>
				{/* Debug Info - Remove in production */}
				{process.env.NODE_ENV === 'development' && (
					<Box
						p={2}
						bg='gray.100'
						fontSize='xs'
						borderRadius='md'>
						<Text>
							Debug: Sizes ({availableSizes.length}): {availableSizes.join(', ')}
						</Text>
						<Text>
							Debug: Colors ({availableColors.length}): {availableColors.join(', ')}
						</Text>
						<Text>Debug: Variations: {product?.variations?.length || 0}</Text>
						<Text>
							Debug: Current Selection: {selectedSize?.toUpperCase()}
							{selectedColor ? ` / ${selectedColor}` : ''} (Stock: {currentStock})
						</Text>
						{currentVariation && <Text>Debug: Current Variation ID: {currentVariation._id}</Text>}
						<Text color={isButtonDisabled() ? 'red.500' : 'green.500'}>
							Debug: Buttons {isButtonDisabled() ? 'DISABLED' : 'ENABLED'}
							{!product?.variations || product.variations.length === 0 ? ' (No variations)' : ''}
							{isInCart && ' (Already in cart)'}
						</Text>
					</Box>
				)}

				{/* Star Rating */}
				<HStack>
					{[1, 2, 3, 4, 5].map(i =>
						i <= 4 ? (
							<AiFillStar
								key={i}
								color='gold'
								size={20}
							/>
						) : (
							<AiOutlineStar
								key={i}
								color='gold'
								size={20}
							/>
						)
					)}
					<Text
						fontSize='sm'
						color='gray.500'>
						(0 customer reviews)
					</Text>
				</HStack>

				<Heading fontSize='32px'>{product?.name}</Heading>

				{/* Price */}
				<HStack>
					<Text
						fontSize='2xl'
						fontWeight='800'>
						৳ {(currentVariation?.price || product?.price)?.toLocaleString()}
					</Text>
					{(currentVariation?.cost || product?.cost) >
						(currentVariation?.price || product?.price) && (
						<>
							<Text
								as='s'
								color='red.400'
								fontSize='lg'>
								৳ {(currentVariation?.cost || product?.cost)?.toLocaleString()}
							</Text>
							<Badge colorScheme='green'>{discountPercentage}% OFF</Badge>
						</>
					)}
				</HStack>

				{/* Color Selection */}
				{availableColors.length > 0 ? (
					<VStack
						align='start'
						gap={2}>
						<Text fontWeight='medium'>
							Select Color: {selectedColor && <strong>{selectedColor}</strong>}
						</Text>
						<HStack>
							{availableColors.map((color: string) => (
								<Button
									key={color}
									size='sm'
									variant={selectedColor === color ? 'solid' : 'outline'}
									onClick={() => setSelectedColor?.(color)}
									border={'1px solid #000'}
									textTransform='capitalize'>
									{color}
								</Button>
							))}
						</HStack>
					</VStack>
				) : (
					<Text
						fontSize='sm'
						color='gray.500'>
						No colors available
					</Text>
				)}

				{/* Size Selection */}
				{availableSizes.length > 0 ? (
					<VStack
						align='start'
						gap={2}>
						<Text fontWeight='medium'>
							Select Size: {selectedSize && <strong>{selectedSize.toUpperCase()}</strong>}
						</Text>
						<HStack>
							{availableSizes.map((size: string) => (
								<Button
									key={size}
									size='sm'
									variant={selectedSize === size ? 'solid' : 'outline'}
									onClick={() => setSelectedSize(size)}
									border={'1px solid #000'}
									textTransform='uppercase'>
									{size}
								</Button>
							))}
						</HStack>
					</VStack>
				) : (
					<Text
						fontSize='sm'
						color='gray.500'>
						No sizes available
					</Text>
				)}

				{/* Stock Information */}
				{currentVariation && (selectedSize || selectedColor) && (
					<HStack>
						<Text
							fontSize='sm'
							color={currentStock > 0 ? 'green.500' : 'red.500'}>
							{currentStock > 0
								? `${currentStock} in stock${
										selectedSize && selectedColor
											? ` (${selectedSize.toUpperCase()} / ${
													selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)
											  })`
											: selectedSize
											? ` (${selectedSize.toUpperCase()})`
											: selectedColor
											? ` (${selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)})`
											: ''
								  }`
								: `Out of stock${
										selectedSize && selectedColor
											? ` (${selectedSize.toUpperCase()} / ${
													selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)
											  })`
											: selectedSize
											? ` (${selectedSize.toUpperCase()})`
											: selectedColor
											? ` (${selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)})`
											: ''
								  }`}
						</Text>
					</HStack>
				)}

				{/* Actions */}
				<HStack>
					<Button
						variant='outline'
						border={'1px solid #000'}
						onClick={handleAddToCart}
						disabled={isInCart || isButtonDisabled()}>
						{isInCart ? 'Added to Cart' : 'Add To Cart'}
					</Button>
					<Button
						colorScheme='blackAlpha'
						onClick={handleBuyNow}
						disabled={isButtonDisabled()}>
						Shop Now
					</Button>
				</HStack>

				{/* Product Details */}
				<Text
					fontSize='sm'
					color='gray.500'>
					SKU: {product?.sku}
				</Text>
				<Text
					fontSize='sm'
					color='gray.500'>
					Category: {product?.category?.name}
				</Text>
				{product?.weight > 0 && (
					<Text
						fontSize='sm'
						color='gray.500'>
						Weight: {product?.weight}kg
					</Text>
				)}

				{product?.sizeChart && <SizeGuideModal product={product} />}

				{/* Social Share */}
				<HStack gap={3}>
					<IconButton
						aria-label='Share on Facebook'
						size='sm'>
						<FaFacebookF />
					</IconButton>
					<IconButton
						aria-label='Share on Twitter'
						size='sm'>
						<FaTwitter />
					</IconButton>
					<IconButton
						aria-label='Share on Instagram'
						size='sm'>
						<FaInstagram />
					</IconButton>
				</HStack>
			</VStack>
		</GridItem>
	);
};

export default GridRightPart;
