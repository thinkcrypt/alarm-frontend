'use client';
import { Box, Heading, HStack, Tabs, Text, VStack, Badge, SimpleGrid } from '@chakra-ui/react';
import React, { FC } from 'react';

import ReviewTab from './ReviewTab';

type TabSectionProps = {
	product: any;
	reviewText?: any;
	setReviewText?: any;
	name?: any;
	setName?: any;
	email?: any;
	setEmail?: any;
	handleSubmitReview?: any;
};

const TabSection: FC<TabSectionProps> = ({ product }) => {
	const getSpecifications = () => {
		const specs = [];
		const colors = product?.colors;
		if (colors?.length > 0)
			specs.push({
				label: 'Available Colors',
				value: colors.map((c: any) => c?.charAt(0)?.toUpperCase() + c?.slice(1)).join(', '),
			});

		// Sizes
		const sizes = product?.sizes;
		if (sizes?.length > 0)
			specs.push({
				label: 'Available Sizes',
				value: sizes?.map((s: any) => s?.toUpperCase())?.join(', '),
			});

		// Weight
		if (product?.weight && product?.weight > 0)
			specs.push({ label: 'Weight', value: `${product?.weight}g` });

		// Stock
		if (product?.stock)
			specs.push({
				label: 'Stock Available',
				value: product?.stock,
			});

		// Category
		if (product?.category?.name) specs.push({ label: 'Category', value: product?.category?.name });

		return specs;
	};

	return (
		<Box mt={8}>
			{/* <JsonView data={product} /> */}
			<Tabs.Root defaultValue='description'>
				<Tabs.List
					borderBottom={'1px solid #e2e8f0'}
					mb={6}>
					<Tabs.Trigger
						value='description'
						px={6}
						py={3}>
						Description
					</Tabs.Trigger>
					<Tabs.Trigger
						value='specifications'
						px={6}
						py={3}>
						Specifications
					</Tabs.Trigger>
					<Tabs.Trigger
						value='review'
						px={6}
						py={3}>
						Reviews
					</Tabs.Trigger>
					<Tabs.Indicator />
				</Tabs.List>

				{/* Description */}
				<Tabs.Content value='description'>
					<VStack
						align='start'
						gap={4}>
						<Heading
							size='lg'
							color='gray.800'>
							{product?.name}
						</Heading>

						{product?.shortDescription && (
							<Box>
								<Text
									fontWeight='semibold'
									color='gray.600'
									mb={2}>
									Overview
								</Text>
								<Text
									color='gray.700'
									fontSize='lg'>
									{product?.shortDescription}
								</Text>
							</Box>
						)}

						{product?.description && (
							<Box>
								<Text
									fontWeight='semibold'
									color='gray.600'
									mb={2}>
									Detailed Description
								</Text>
								<Text
									whiteSpace='pre-line'
									color='gray.700'
									lineHeight='1.7'>
									{product?.description}
								</Text>
							</Box>
						)}

						{product?.isFeatured && (
							<Badge
								colorScheme='blue'
								size='lg'>
								Featured Product
							</Badge>
						)}
					</VStack>
				</Tabs.Content>

				{/* Specifications */}
				<Tabs.Content value='specifications'>
					<VStack
						align='start'
						gap={6}>
						<Heading
							size='lg'
							color='gray.800'>
							Product Specifications
						</Heading>

						<SimpleGrid
							columns={{ base: 1, md: 2 }}
							gap={4}
							width='100%'>
							{getSpecifications().map((spec, index) => (
								<Box
									key={index}
									p={4}
									border='1px solid'
									borderColor='gray.200'
									borderRadius='md'
									bg='gray.50'>
									<Text
										fontWeight='bold'
										color='gray.600'
										fontSize='sm'
										mb={1}>
										{spec?.label}
									</Text>
									<Text
										color='gray.800'
										fontSize='md'>
										{spec?.value}
									</Text>
								</Box>
							))}
						</SimpleGrid>

						<Box mt={6}>
							<Text
								fontWeight='semibold'
								color='gray.600'
								mb={2}>
								Pricing Information
							</Text>
							<HStack gap={4}>
								<Text
									fontSize='xl'
									fontWeight='bold'
									color='green.600'>
									BDT. {product?.price?.toFixed(2).toLocaleString()}
								</Text>

								{product?.oldPrice && (
									<Text
										fontSize='lg'
										color='gray.500'
										textDecoration='line-through'>
										${product?.oldPrice?.toFixed(2).toLocaleString()}
									</Text>
								)}

								{/* {product?.isDiscount && product?.discount > 0 && (
									<Badge colorScheme='red'>{product?.discount}% OFF</Badge>
								)} */}
							</HStack>
						</Box>
					</VStack>
				</Tabs.Content>

				{/* Reviews */}
				<Tabs.Content value='review'>
					<ReviewTab />
				</Tabs.Content>
			</Tabs.Root>
		</Box>
	);
};

export default TabSection;
