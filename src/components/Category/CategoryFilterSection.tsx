'use client';
import { Checkbox, Flex, RadioGroup, Text } from '@chakra-ui/react';
import React, { FC } from 'react';
import CategoryFilterScrollContainer from '../reusable/CategoryFilterScrollContainer';
import CategoryFilterSectionContainer from '../reusable/CategoryFilterSectionContainer';

type CategoryFilterSectionProps = {
	categories: any;
	colors?: any;
	sizes?: any;
	priceRanges?: any;
	onCategoryChange?: any;
	onColorChange?: any;
	onSizeChange?: any;
	onPriceRangeChange?: any;
};

const CategoryFilterSection: FC<CategoryFilterSectionProps> = ({
	categories,
	colors,
	sizes,
	priceRanges,
	onCategoryChange,
	onColorChange,
	onSizeChange,
	onPriceRangeChange
}) => {
	return (
		<Flex
			direction={'column'}
			gap={4}>
			<CategoryFilterSectionContainer>
				<Text fontWeight={600}>Categories</Text>
				<CategoryFilterScrollContainer>
					{categories?.map((item: any, index: number) => (
						<Checkbox.Root
							key={index}
							pl={2}
							cursor={"pointer"}
							onChange={() => {
								onCategoryChange((prev: any) =>
									prev.includes(item) ? prev.filter((c: any) => c !== item) : [...prev, item]
								);
							}}>
							<Checkbox.HiddenInput />
							<Checkbox.Control />
							<Checkbox.Label>{item}</Checkbox.Label>
						</Checkbox.Root>
					))}
				</CategoryFilterScrollContainer>
			</CategoryFilterSectionContainer>

			<CategoryFilterSectionContainer>
				<Text fontWeight={600}>Colors</Text>
				<CategoryFilterScrollContainer>
					{colors?.map((item: any, index: number) => (
						<Checkbox.Root
							key={index}
							cursor={"pointer"}
							onChange={() => {
								onColorChange((prev: any) =>
									prev.includes(item) ? prev.filter((c: any) => c !== item) : [...prev, item]
								);
							}}>
							<Checkbox.HiddenInput />
							<Checkbox.Control />
							<Checkbox.Label>{item}</Checkbox.Label>
						</Checkbox.Root>
					))}
				</CategoryFilterScrollContainer>
			</CategoryFilterSectionContainer>

			<CategoryFilterSectionContainer>
				<Text fontWeight={600}>Sizes</Text>
				<CategoryFilterScrollContainer>
					{sizes?.map((item: any, index: number) => (
						<Checkbox.Root
							key={index}
							pl={2}
							cursor={"pointer"}
							onChange={() => {
								onSizeChange((prev: any) =>
									prev.includes(item) ? prev.filter((c: any) => c !== item) : [...prev, item]
								);
							}}>
							<Checkbox.HiddenInput />
							<Checkbox.Control />
							<Checkbox.Label>{item}</Checkbox.Label>
						</Checkbox.Root>
					))}
				</CategoryFilterScrollContainer>
			</CategoryFilterSectionContainer>

			<CategoryFilterSectionContainer>
				<Text fontWeight={600}>Price Range</Text>
				<CategoryFilterScrollContainer>
					<RadioGroup.Root style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
						{priceRanges?.map((item: any, index: number) => (
							<RadioGroup.Item
								key={index}
								value={`${item.min}-${item.max}`}
								pl={2}
								cursor={"pointer"}
								onClick={() => onPriceRangeChange({ min: item.min, max: item.max })}>

								<RadioGroup.ItemHiddenInput />
								<RadioGroup.ItemIndicator />
								<RadioGroup.ItemText>
									{item.min.toFixed(2)} to {item.max.toFixed(2)}
								</RadioGroup.ItemText>
							</RadioGroup.Item>
						))}
					</RadioGroup.Root>
				</CategoryFilterScrollContainer>
			</CategoryFilterSectionContainer>
		</Flex>
	);
};

export default CategoryFilterSection;
