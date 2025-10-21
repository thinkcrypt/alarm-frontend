'use client';
import React, { FC, useState } from 'react';
import {
	Box,
	Heading,
	Text,
	Input,
	Button,
	Stack,
	Flex,
	Portal,
	Select,
	createListCollection,
} from '@chakra-ui/react';
import PageLayout from '@/components/Layout/PageLayout';
// import * as Select from '@chakra-ui/react-select'; // your v3 select import

type AdvancedSearchPageProps = {};

const categories = createListCollection({
	items: [
		{ label: 'Electronics', value: 'electronics' },
		{ label: 'Fashion', value: 'fashion' },
		{ label: 'Books', value: 'books' },
		{ label: 'Home & Living', value: 'home' },
	],
});

const AdvancedSearchPage: FC<AdvancedSearchPageProps> = () => {
	const [searchData, setSearchData] = useState({
		keyword: '',
		category: '',
		minPrice: '',
		maxPrice: '',
		dateFrom: '',
		dateTo: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchData({ ...searchData, [e.target.name]: e.target.value });
	};

	const handleCategoryChange = (value: string) => {
		setSearchData({ ...searchData, category: value });
	};

	const handleSearch = () => {
		// console.log('Searching with:', searchData);
		// alert('Search submitted! Check console for data.');
	};

	return (
		<PageLayout>
			<Box maxW='4xl' mx='auto' px={6} py={10}>
				<Heading mb={6} size='2xl' textAlign='center'>
					Advanced Search
				</Heading>

				<Text mb={8} textAlign='center'>
					Use the filters below to refine your search results.
				</Text>

				<Stack gap={4}>
					<Input
						placeholder='Keyword'
						name='keyword'
						value={searchData.keyword}
						onChange={handleChange}
						border={'1px solid black'}
					/>

					{/* Chakra v3 Select */}
					<Select.Root
						collection={categories}
						// size='md'
						width='full'
						value={searchData.category ? [searchData.category] : []} // wrap string in array
						onValueChange={details => {
							// details.items is the selected items array
							const selectedItem = details.items[0]; // first selected item
							setSearchData({
								...searchData,
								category: selectedItem ? selectedItem.value : '',
							});
						}}
					>
						<Select.HiddenSelect />
						<Select.Label>Select Category</Select.Label>
						<Select.Control border={'1px solid black'} borderRadius={'md'}>
							<Select.Trigger>
								<Select.ValueText placeholder='Select Category' />
							</Select.Trigger>
							<Select.IndicatorGroup>
								<Select.Indicator />
							</Select.IndicatorGroup>
						</Select.Control>
						<Portal>
							<Select.Positioner>
								<Select.Content border={'1px solid black'}>
									{categories.items.map(item => (
										<Select.Item item={item} key={item.value}>
											{item.label}
											<Select.ItemIndicator />
										</Select.Item>
									))}
								</Select.Content>
							</Select.Positioner>
						</Portal>
					</Select.Root>

					<Flex gap={4}>
						<Input
							type='number'
							placeholder='Min Price'
							name='minPrice'
							value={searchData.minPrice}
							onChange={handleChange}
							border={'1px solid black'}
						/>
						<Input
							type='number'
							placeholder='Max Price'
							name='maxPrice'
							value={searchData.maxPrice}
							onChange={handleChange}
							border={'1px solid black'}
						/>
					</Flex>

					<Flex gap={4}>
						<Input
							type='date'
							name='dateFrom'
							value={searchData.dateFrom}
							onChange={handleChange}
							border={'1px solid black'}
						/>
						<Input
							type='date'
							name='dateTo'
							value={searchData.dateTo}
							onChange={handleChange}
							border={'1px solid black'}
						/>
					</Flex>

					<Button colorScheme='blue' onClick={handleSearch}>
						Search
					</Button>
				</Stack>
			</Box>
		</PageLayout>
	);
};

export default AdvancedSearchPage;
