'use client';
import { Checkbox, Flex, Text, VStack, Slider, HStack } from '@chakra-ui/react';
import React, { FC } from 'react';
import { categoryStyles } from './categoryStyles';
import { useGetAllQuery } from '@/store/services/commonApi';
import CategoryFilterSectionContainer from '../reusable/CategoryFilterSectionContainer';

type CategoryFilterSectionProps = {
	categories: any;
	colors: any;
	sizes: any;
	priceRanges: any;
	setColors?: any;
	setSizes?: any;
	setSubCategories?: any;
	id?: string;
	selectedSubCategories?: string[];
	startPrice?: number;
	endPrice?: number;
	setStartPrice?: (price: number) => void;
	setEndPrice?: (price: number) => void;
};

const CategoryFilterSectionV2: FC<CategoryFilterSectionProps> = ({
	categories,
	colors,
	sizes,
	priceRanges,
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
	const { data: colorData } = useGetAllQuery({ path: 'colors', limit: 999 });
	const { data: sizeData } = useGetAllQuery({ path: 'sizes', limit: 999 });
	const { data: subCategoriesData } = useGetAllQuery({
		path: 'categories',
		limit: 999,
		filters: { parentCategory: id },
	});

	const handleColorChange = (color: string) => (details: any) => {
		// Handle color filter change
		if (details.checked) {
			setColors((prevColors: any) => [...prevColors, color]);
		} else {
			setColors((prevColors: any) => prevColors.filter((c: any) => c !== color));
		}
	};

	const handleSizeChange = (size: string) => (details: any) => {
		// Handle size filter change
		if (details.checked) {
			setSizes((prevSizes: any) => [...prevSizes, size]);
		} else {
			setSizes((prevSizes: any) => prevSizes.filter((s: any) => s !== size));
		}
	};

	const handleSubCategoryChange = (subCategory: string) => (details: any) => {
		// Handle sub-category filter change
		if (details.checked) {
			setSubCategories((prevSubCategories: any) => [...prevSubCategories, subCategory]);
		} else {
			setSubCategories((prevSubCategories: any) =>
				prevSubCategories.filter((s: any) => s !== subCategory)
			);
		}
	};

	return (
		<VStack
			alignItems='stretch'
			gap={2}>
			{/* Categories Filter */}
			<CategoryFilterSectionContainer>
				<Text {...categoryStyles.filterTitle}>Sub Categories</Text>
				<VStack
					alignItems='stretch'
					gap={3}>
					{subCategoriesData?.doc?.map((item: any, index: number) => (
						<Checkbox.Root
							checked={selectedSubCategories.includes(item?._id)}
							onCheckedChange={handleSubCategoryChange(item?._id)}
							variant='solid'
							value={item?.name}
							key={index}
							size='sm'>
							<Checkbox.HiddenInput />
							<Checkbox.Control />
							<Checkbox.Label {...categoryStyles?.filterOption}>{item?.name}</Checkbox.Label>
						</Checkbox.Root>
					))}
				</VStack>
			</CategoryFilterSectionContainer>

			{/* Colors Filter */}
			<CategoryFilterSectionContainer>
				<Text {...categoryStyles.filterTitle}>Colors</Text>

				<VStack
					alignItems='stretch'
					gap={3}>
					{colorData?.doc?.map((item: any, i: number) => (
						<Checkbox.Root
							checked={colors.includes(item?.name)}
							onCheckedChange={handleColorChange(item?.name)}
							variant='solid'
							value={item?.name}
							key={i}
							size='sm'>
							<Checkbox.HiddenInput />
							<Checkbox.Control />
							<Checkbox.Label {...categoryStyles.filterOption}>{item?.name}</Checkbox.Label>
						</Checkbox.Root>
					))}
				</VStack>
			</CategoryFilterSectionContainer>

			{/* Sizes Filter */}
			<CategoryFilterSectionContainer>
				<Text {...categoryStyles.filterTitle}>Sizes</Text>
				<VStack
					alignItems='stretch'
					gap={3}>
					{sizeData?.doc?.map((item: any, index: number) => (
						<Checkbox.Root
							checked={sizes.includes(item?.name)}
							onCheckedChange={handleSizeChange(item?.name)}
							variant='solid'
							value={item?.name}
							key={index}
							size='sm'>
							<Checkbox.HiddenInput />
							<Checkbox.Control />
							<Checkbox.Label {...categoryStyles.filterOption}>{item?.name}</Checkbox.Label>
						</Checkbox.Root>
					))}
				</VStack>
			</CategoryFilterSectionContainer>

			{/* Price Range Filter */}
			<CategoryFilterSectionContainer>
				<Text {...categoryStyles.filterTitle}>Price Range</Text>

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

export default CategoryFilterSectionV2;
