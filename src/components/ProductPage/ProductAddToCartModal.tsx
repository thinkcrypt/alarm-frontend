'use client';
import React, { FC, useState, useEffect } from 'react';
import { Grid } from '@chakra-ui/react';
import GridLeftPart from './GridLeftPart';
import GridRightPart from './GridRightPart';

type ProductPageComponentProps = {
	productData: any;
	categoryProducts?: any;
};
const ProductAddToCartModal: FC<ProductPageComponentProps> = ({ productData }) => {
	const [selectedImage, setSelectedImage] = useState(productData?.images[0]);
	const [selectedSize, setSelectedSize] = useState('');
	const [selectedColor, setSelectedColor] = useState('');

	// Update selected image when color/size changes
	useEffect(() => {
		if (!selectedColor && !selectedSize) {
			// Use default product image
			setSelectedImage(productData?.images?.[0] || productData?.image);
			return;
		}

		// Find matching variation
		const matchingVariation = productData?.variations?.find((variation: any) => {
			const sizeAttr = variation.attributes?.find((attr: any) => attr.label === 'size');
			const colorAttr = variation.attributes?.find((attr: any) => attr.label === 'color');

			return (
				(!selectedSize || sizeAttr?.value === selectedSize) &&
				(!selectedColor || colorAttr?.value === selectedColor)
			);
		});

		// Update image if variation has specific images
		if (matchingVariation?.images?.[0]?.[0]) {
			setSelectedImage(matchingVariation.images[0][0]);
		} else if (productData?.images?.[0]) {
			setSelectedImage(productData.images[0]);
		}
	}, [selectedColor, selectedSize, productData]);

	return (
		<Grid
			templateColumns={{ base: '1fr', md: '3fr 3fr' }}
			gap={{ base: 6, lg: 6, xl: 12, '2xl': 32 }}
			py={6}>
			<GridLeftPart
				product={productData}
				selectedImage={selectedImage}
				setSelectedImage={setSelectedImage}
			/>

			<GridRightPart
				product={productData}
				selectedSize={selectedSize}
				setSelectedSize={setSelectedSize}
				selectedColor={selectedColor}
				setSelectedColor={setSelectedColor}
			/>
		</Grid>
	);
};

export default ProductAddToCartModal;
