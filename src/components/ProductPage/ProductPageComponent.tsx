'use client';
import React, { FC, useState, useEffect } from 'react';
import PageLayout from '../Layout/PageLayout';
import { Grid } from '@chakra-ui/react';
import GridLeftPart from './GridLeftPart';
import GridRightPart from './GridRightPart';
import AdditionalInfo from './AdditionalInfo';
import CustomContainer from '../reusable/Container';
import TabSection from './TabSection';
import ClientProductSection from '../HomePage/ClientProductSection';

type ProductPageComponentProps = {
	productData?: any;
};
const ProductPageComponent: FC<ProductPageComponentProps> = ({ productData }) => {
	const [selectedImage, setSelectedImage] = useState(productData?.images[0]);
	const [selectedSize, setSelectedSize] = useState('');
	const [selectedColor, setSelectedColor] = useState('');

	// Update selected image when color/size changes
	useEffect(() => {
		if (!selectedColor && !selectedSize) {
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

	useEffect(() => {
		setSelectedSize(
			productData?.variations?.[0]?.attributes?.find((attr: any) => attr.label === 'size')?.value ||
				''
		);
		setSelectedColor(
			productData?.variations?.[0]?.attributes?.find((attr: any) => attr.label === 'color')
				?.value || ''
		);
	}, [productData]);

	return (
		<PageLayout>
			<CustomContainer
				pt={0}
				bg='white'>
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
			</CustomContainer>
			<CustomContainer
				pt={0}
				bg='white'>
				<TabSection product={productData} />

				<ClientProductSection
					title='Related Products'
					id={productData?.category?._id}
				/>
			</CustomContainer>

			<AdditionalInfo />
		</PageLayout>
	);
};

export default ProductPageComponent;
