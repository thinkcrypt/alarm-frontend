'use client';
import { Checkbox, Flex, Text, VStack, Slider, HStack } from '@chakra-ui/react';
import React, { FC } from 'react';
import { useGetAllQuery } from '@/store/services/commonApi';
import CategoryFilterSectionContainer from '../reusable/CategoryFilterSectionContainer';

type CategoryFilterSectionProps = {
	colors: string[];
	sizes: string[];
	setColors: (colors: string[]) => void;
	setSizes: (sizes: string[]) => void;
	setSubCategories: (subCategories: string[]) => void;
	id?: string;
	selectedSubCategories?: string[];
	startPrice?: number;
	endPrice?: number;
	setStartPrice?: (price: number) => void;
	setEndPrice?: (price: number) => void;
};

const CategoryFilterSection: FC<CategoryFilterSectionProps> = ({
	colors,
	sizes,
	setColors,
	setSizes,
	setSubCategories,
	id,
	selectedSubCategories = [],
	startPrice = 0,
	endPrice = 25000,
	setStartPrice,
	setEndPrice,
}) => {
	// Fetch dynamic data from API
	const { data: colorData } = useGetAllQuery({ path: 'colors', limit: 999 });
	const { data: sizeData } = useGetAllQuery({ path: 'sizes', limit: 999 });
	const { data: subCategoriesData } = useGetAllQuery({
		path: 'categories',
		limit: 999,
		filters: { parentCategory: id },
	});

	// Handle color filter changes
	const handleColorChange = (color: string) => (details: any) => {
		if (details.checked) {
			setColors([...colors, color]);
		} else {
			setColors(colors.filter((c: string) => c !== color));
		}
	};

	// Handle size filter changes
	const handleSizeChange = (size: string) => (details: any) => {
		if (details.checked) {
			setSizes([...sizes, size]);
		} else {
			setSizes(sizes.filter((s: string) => s !== size));
		}
	};

	// Handle sub-category filter changes
	const handleSubCategoryChange = (subCategory: string) => (details: any) => {
		if (details.checked) {
			setSubCategories([...selectedSubCategories, subCategory]);
		} else {
			setSubCategories(selectedSubCategories.filter((s: string) => s !== subCategory));
		}
	};

	return (
		<VStack
			alignItems='stretch'
			gap={4}>
			{/* Sub Categories Filter */}
			{subCategoriesData?.doc && subCategoriesData.doc.length > 0 && (
				<CategoryFilterSectionContainer>
					<Text fontWeight={600} mb={3}>
						Sub Categories
					</Text>
					<VStack
						alignItems='stretch'
						gap={3}>
						{subCategoriesData.doc.map((item: any, index: number) => (
							<Checkbox.Root
								checked={selectedSubCategories.includes(item?._id)}
								onCheckedChange={handleSubCategoryChange(item?._id)}
								variant='solid'
								value={item?.name}
								key={index}
								size='sm'>
								<Checkbox.HiddenInput />
								<Checkbox.Control />
								<Checkbox.Label>{item?.name}</Checkbox.Label>
							</Checkbox.Root>
						))}
					</VStack>
				</CategoryFilterSectionContainer>
			)}

			{/* Colors Filter */}
			{colorData?.doc && colorData.doc.length > 0 && (
				<CategoryFilterSectionContainer>
					<Text fontWeight={600} mb={3}>
						Colors
					</Text>
					<VStack
						alignItems='stretch'
						gap={3}>
						{colorData.doc.map((item: any, i: number) => (
							<Checkbox.Root
								checked={colors.includes(item?.name)}
								onCheckedChange={handleColorChange(item?.name)}
								variant='solid'
								value={item?.name}
								key={i}
								size='sm'>
								<Checkbox.HiddenInput />
								<Checkbox.Control />
								<Checkbox.Label>{item?.name}</Checkbox.Label>
							</Checkbox.Root>
						))}
					</VStack>
				</CategoryFilterSectionContainer>
			)}

			{/* Sizes Filter */}
			{sizeData?.doc && sizeData.doc.length > 0 && (
				<CategoryFilterSectionContainer>
					<Text fontWeight={600} mb={3}>
						Sizes
					</Text>
					<VStack
						alignItems='stretch'
						gap={3}>
						{sizeData.doc.map((item: any, index: number) => (
							<Checkbox.Root
								checked={sizes.includes(item?.name)}
								onCheckedChange={handleSizeChange(item?.name)}
								variant='solid'
								value={item?.name}
								key={index}
								size='sm'>
								<Checkbox.HiddenInput />
								<Checkbox.Control />
								<Checkbox.Label>{item?.name}</Checkbox.Label>
							</Checkbox.Root>
						))}
					</VStack>
				</CategoryFilterSectionContainer>
			)}

			{/* Price Range Filter */}
			<CategoryFilterSectionContainer>
				<Text fontWeight={600} mb={3}>
					Price Range
				</Text>

				<HStack
					pr={3}
					justify='space-between'
					fontSize='sm'
					color='gray.600'>
					<Text>৳{startPrice.toLocaleString()}</Text>
					<Text>৳{endPrice.toLocaleString()}</Text>
				</HStack>

				<Slider.Root
					min={0}
					max={15000}
					step={500}
					value={[startPrice, endPrice]}
					onValueChange={details => {
						if (setStartPrice && setEndPrice) {
							setStartPrice(details.value[0]);
							setEndPrice(details.value[1]);
						}
					}}
					minStepsBetweenThumbs={1}
					pr={4}>
					<Slider.Control>
						<Slider.Track bg='gray.200'>
							<Slider.Range bg='black' />
						</Slider.Track>
						<Slider.Thumb
							index={0}
							bg='white'
							borderWidth='2px'
							borderColor='black'
						/>
						<Slider.Thumb
							index={1}
							bg='white'
							borderWidth='2px'
							borderColor='black'
						/>
					</Slider.Control>
				</Slider.Root>

				<HStack
					pr={3}
					justify='space-between'
					fontSize='xs'
					color='gray.500'>
					<Text>Min: ৳0</Text>
					<Text>Max: ৳15,000</Text>
				</HStack>
			</CategoryFilterSectionContainer>
		</VStack>
	);
};

export default CategoryFilterSection;