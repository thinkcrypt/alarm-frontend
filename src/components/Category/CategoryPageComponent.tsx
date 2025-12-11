
'use client';
import React, { FC, useState } from 'react';
import PageLayout from '../Layout/PageLayout';
import HeaderGrid from './HeaderGrid';
import {
	Flex,
	Grid,
	Box,
	Drawer,
	IconButton,
	Portal,
	Button,
	Text,
} from '@chakra-ui/react';

import ProductCard from '../reusable/ProductCard';

import AdditionalInfo from '../ProductPage/AdditionalInfo';
import Link from 'next/link';
import { useGetAllQuery, useGetByIdQuery } from '@/store/services/commonApi';
import CategoryFilterSectionV2 from './CategoryFilterSectionV2';
import { SlidersHorizontal } from 'lucide-react';
import parser from 'html-react-parser';

type CategoryPageComponentProps = {
	singleCategoryData?: any;
	categoryProducts?: any;
	categoryData?: any;
};

const CategoryPageComponent: FC<CategoryPageComponentProps> = ({
	singleCategoryData,
	categoryProducts,
	categoryData,
}) => {
	const categoryName = singleCategoryData?.name;
	console.log('single category data:', singleCategoryData);
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const [sort, setSort] = useState('-createdAt');

	const [colors, setColors] = useState<string[]>([]);
	const [sizes, setSizes] = useState<string[]>([]);
	const [subCategories, setSubCategories] = useState<string[]>([]);
	const [startPrice, setStartPrice] = useState<number>(0);
	const [endPrice, setEndPrice] = useState<number>(10000);

	// Build category filter logic
	const getCategoryFilter = () => {
		// If subcategories are selected, use only those
		if (subCategories?.length > 0) {
			return subCategories.join(',');
		}

		// Start with the single category ID
		const categoryIds = [singleCategoryData?._id];

		// Add child categories if they exist and belong to this parent category
		if (
			categoryData &&
			categoryData?.totalDocs > 0 &&
			categoryData?.doc?.length > 0
		) {
			const childCategoryIds = categoryData.doc
				.filter(
					(cat: any) => cat.parentCategory?._id === singleCategoryData?._id
				)
				.map((cat: any) => cat._id);
			categoryIds.push(...childCategoryIds);
		}

		return categoryIds.filter(Boolean).join(',');
	};

	// const { data, isLoading } = useGetAllQuery({
	// 	path: 'products',
	// 	limit: 200,
	// 	sort: sort,
	// 	filters: {
	// 		category_in: getCategoryFilter(),
	// 		colors_in: colors?.join(','),
	// 		sizes_in: sizes?.join(','),
	// 		price_btwn: `${startPrice}_${endPrice}`,
	// 	},
	// });
	const { data, isLoading } = useGetAllQuery({
		path: `products/category/${singleCategoryData?._id}`,
		limit: 200,
		sort,
		filters: {
			category_in: getCategoryFilter(),
			colors_in: colors.join(','),
			sizes_in: sizes?.join(','),
			price_btwn: `${startPrice}_${endPrice}`,
		},
	});

	if (categoryProducts.length === 0) {
		return (
			<Flex pb={4} h='80vh' justifyContent={'center'} alignItems={'center'}>
				<h1>No products found in this category.</h1>
			</Flex>
		);
	}
	console.log('inside data:', data);
	return (
		<>
			<Flex direction={'column'} w={'full'} gap={4} px={{ base: 4, md: 12 }}>
				<HeaderGrid
					value={sort}
					onChange={(e: any) => setSort(e)}
					categoryName={categoryName}
					onFilterClick={() => setIsDrawerOpen(true)}
				/>

				<Grid pb={4} templateColumns={{ base: '1fr', md: '300px 1fr' }} gap={4}>
					{/* Desktop Filter Section */}
					<Box
						position='sticky'
						top={'152px'}
						h='fit-content'
						maxH='100%'
						overflowY='auto'
						display={{ base: 'none', md: 'block' }}
					>
						<CategoryFilterSectionV2
							categories={[]}
							colors={colors}
							sizes={sizes}
							setColors={setColors}
							setSizes={setSizes}
							id={singleCategoryData?._id}
							setSubCategories={setSubCategories}
							selectedSubCategories={subCategories}
							priceRanges={[]}
							startPrice={startPrice}
							endPrice={endPrice}
							setStartPrice={setStartPrice}
							setEndPrice={setEndPrice}
						/>
					</Box>

					{/* Product Section */}
					<Box overflowY='auto' h='100%'>
						<Grid
							templateColumns={{
								base: 'repeat(2, 1fr)',
								lg: 'repeat(3, 1fr)',
								xl: 'repeat(4, 1fr)',
							}}
							gap={{ base: 2, xl: 4 }}
							w='full'
						>
							{!data ? (
								categoryProducts?.map((product: any) => (
									<ProductCard product={product} key={product.id} />
								))
							) : data?.doc?.length > 0 ? (
								data?.doc?.map((product: any) => (
									<ProductCard product={product} key={product.id} />
								))
							) : (
								<Flex
									pb={4}
									h='80vh'
									w='full'
									justifyContent={'center'}
									alignItems={'center'}
								>
									<h1>No products found in this category.</h1>
								</Flex>
							)}
						</Grid>
						{singleCategoryData?.shortDescription && (
							<Box
								p={{ base: 4, md: 6 }}
								marginTop={4}
								marginBottom={4}
								bg='gray.50'
								border='1px solid'
								borderColor='gray.200'
								rounded='lg'
								color='gray.700'
								lineHeight='tall'
							>
								<Text fontSize='lg' fontWeight='bold' mb={2} color='gray.800'>
									About {categoryName || 'this category'}
								</Text>
								<Box whiteSpace='pre-line'>
									{parser(singleCategoryData?.shortDescription)}
								</Box>
							</Box>
						)}
					</Box>
				</Grid>
			</Flex>

			{/* Mobile Filter Drawer */}
			<Drawer.Root
				open={isDrawerOpen}
				onOpenChange={e => setIsDrawerOpen(e.open)}
				placement='bottom'
				size='full'
			>
				<Portal>
					<Drawer.Backdrop />
					<Drawer.Positioner>
						<Drawer.Content roundedTop='xl' maxH='90vh'>
							<Drawer.Header borderBottomWidth='1px' borderColor='gray.200'>
								<Drawer.Title>Filters</Drawer.Title>
								<Drawer.CloseTrigger />
							</Drawer.Header>
							<Drawer.Body overflowY='auto'>
								<CategoryFilterSectionV2
									categories={[]}
									colors={colors}
									sizes={sizes}
									setColors={setColors}
									setSizes={setSizes}
									id={singleCategoryData?._id}
									setSubCategories={setSubCategories}
									selectedSubCategories={subCategories}
									priceRanges={[]}
									startPrice={startPrice}
									endPrice={endPrice}
									setStartPrice={setStartPrice}
									setEndPrice={setEndPrice}
								/>
							</Drawer.Body>
							<Drawer.Footer borderTopWidth='1px' borderColor='gray.200'>
								<Button
									width='full'
									colorScheme='black'
									bg='black'
									color='white'
									_hover={{ bg: 'gray.800' }}
									onClick={() => setIsDrawerOpen(false)}
								>
									Apply Filters
								</Button>
							</Drawer.Footer>
						</Drawer.Content>
					</Drawer.Positioner>
				</Portal>
			</Drawer.Root>

			{/* Floating Filter Button - Mobile Only */}
			{/* <IconButton
				display={{ base: 'flex', lg: 'none' }}
				position='fixed'
				bottom='6'
				right='6'
				size='lg'
				colorScheme='black'
				bg='black'
				color='white'
				rounded='full'
				shadow='lg'
				zIndex='1000'
				onClick={() => setIsDrawerOpen(true)}
				aria-label='Open filters'>
				<SlidersHorizontal size={20} />
			</IconButton> */}

			{/* Mobile Filter Sidebar */}
			{/* <MobileFilterSidebar
				isOpen={isMobileFilterOpen}
				onClose={handleMobileFilterClose}
				categories={categories}
				colors={colors}
				sizes={sizes}
				priceRanges={priceRanges}
			/> */}

			<AdditionalInfo />
		</>
	);
};

export default CategoryPageComponent;

// 'use client';
// import React, { FC, useState } from 'react';
// import PageLayout from '../Layout/PageLayout';
// import HeaderGrid from './HeaderGrid';
// import { Flex, Grid, Box, Drawer, Button, Portal } from '@chakra-ui/react';
// import CategoryFilterSection from './CategoryFilterSection';
// import MobileFilterSidebar from './MobileFilterSidebar';
// import ProductCard from '../reusable/ProductCard';
// import AdditionalInfo from '../ProductPage/AdditionalInfo';
// import { useGetAllQuery } from '@/store/services/commonApi';

// type CategoryPageComponentProps = {
// 	singleCategoryData?: any;
// 	categoryProducts?: any;
// 	categoryData?: any;
// };

// const CategoryPageComponent: FC<CategoryPageComponentProps> = ({
// 	singleCategoryData,
// 	categoryProducts,
// 	categoryData,
// }) => {
// 	const categoryName = singleCategoryData?.name;
// 	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

// 	// Filter states
// 	const [sort, setSort] = useState('-createdAt');
// 	const [colors, setColors] = useState<string[]>([]);
// 	const [sizes, setSizes] = useState<string[]>([]);
// 	const [subCategories, setSubCategories] = useState<string[]>([]);
// 	const [startPrice, setStartPrice] = useState<number>(0);
// 	const [endPrice, setEndPrice] = useState<number>(10000);

// 	// Build category filter logic
// 	const getCategoryFilter = () => {
// 		// If subcategories are selected, use only those
// 		if (subCategories?.length > 0) {
// 			return subCategories.join(',');
// 		}

// 		// Start with the single category ID
// 		const categoryIds = [singleCategoryData?._id];

// 		// Add child categories if they exist and belong to this parent category
// 		if (categoryData && categoryData?.totalDocs > 0 && categoryData?.doc?.length > 0) {
// 			const childCategoryIds = categoryData.doc
// 				.filter((cat: any) => cat.parentCategory?._id === singleCategoryData?._id)
// 				.map((cat: any) => cat._id);
// 			categoryIds.push(...childCategoryIds);
// 		}

// 		return categoryIds.filter(Boolean).join(',');
// 	};

// 	// Fetch filtered products
// 	const { data, isLoading } = useGetAllQuery({
// 		path: 'products',
// 		limit: 200,
// 		sort: sort,
// 		filters: {
// 			category_in: getCategoryFilter(),
// 			colors_in: colors?.join(','),
// 			sizes: sizes?.join(','),
// 			price_btwn: `${startPrice}_${endPrice}`,
// 		},
// 	});

// 	// Determine which products to display
// 	const displayProducts = data ? data?.doc : categoryProducts;

// 	if (categoryProducts.length === 0) {
// 		return (
// 			<PageLayout categoryData={categoryData}>
// 				<Flex
// 					pb={4}
// 					h='80vh'
// 					justifyContent={'center'}
// 					alignItems={'center'}>
// 					<h1>No products found in this category.</h1>
// 				</Flex>
// 			</PageLayout>
// 		);
// 	}

// 	return (
// 		<PageLayout categoryData={categoryData}>
// 			<Flex
// 				direction={'column'}
// 				w={'full'}
// 				gap={4}
// 				px={{ base: 4, md: 12 }}>
// 				<HeaderGrid
// 					value={sort}
// 					onChange={(e: any) => setSort(e)}
// 					categoryName={categoryName}
// 					onFilterClick={() => setIsDrawerOpen(true)}
// 				/>

// 				<Grid
// 					pb={4}
// 					templateColumns={{ base: '1fr', md: '300px 1fr' }}
// 					gap={4}>
// 					{/* Desktop Filter Section */}
// 					<Box
// 						position='sticky'
// 						top={'152px'}
// 						h='fit-content'
// 						maxH='100%'
// 						overflowY='auto'
// 						display={{ base: 'none', md: 'block' }}>
// 						<CategoryFilterSection
// 							colors={colors}
// 							sizes={sizes}
// 							setColors={setColors}
// 							setSizes={setSizes}
// 							id={singleCategoryData?._id}
// 							setSubCategories={setSubCategories}
// 							selectedSubCategories={subCategories}
// 							startPrice={startPrice}
// 							endPrice={endPrice}
// 							setStartPrice={setStartPrice}
// 							setEndPrice={setEndPrice}
// 						/>
// 					</Box>

// 					{/* Product Section */}
// 					<Box
// 						overflowY='auto'
// 						h='100%'>
// 						<Grid
// 							templateColumns={{
// 								base: 'repeat(2, 1fr)',
// 								lg: 'repeat(3, 1fr)',
// 								xl: 'repeat(3, 1fr)',
// 							}}
// 							gap={4}
// 							w='full'>
// 							{isLoading ? (
// 								<Box>Loading...</Box>
// 							) : (
// 								displayProducts?.map((product: any) => (
// 									<ProductCard
// 										product={product}
// 										key={product.id}
// 									/>
// 								))
// 							)}
// 						</Grid>
// 					</Box>
// 				</Grid>
// 			</Flex>

// 			{/* Mobile Filter Drawer */}
// 			<Drawer.Root
// 				open={isDrawerOpen}
// 				onOpenChange={e => setIsDrawerOpen(e.open)}
// 				placement='bottom'
// 				size='full'>
// 				<Portal>
// 					<Drawer.Backdrop />
// 					<Drawer.Positioner>
// 						<Drawer.Content
// 							roundedTop='xl'
// 							maxH='90vh'>
// 							<Drawer.Header
// 								borderBottomWidth='1px'
// 								borderColor='gray.200'>
// 								<Drawer.Title>Filters</Drawer.Title>
// 								<Drawer.CloseTrigger />
// 							</Drawer.Header>
// 							<Drawer.Body overflowY='auto'>
// 								<CategoryFilterSection
// 									colors={colors}
// 									sizes={sizes}
// 									setColors={setColors}
// 									setSizes={setSizes}
// 									id={singleCategoryData?._id}
// 									setSubCategories={setSubCategories}
// 									selectedSubCategories={subCategories}
// 									startPrice={startPrice}
// 									endPrice={endPrice}
// 									setStartPrice={setStartPrice}
// 									setEndPrice={setEndPrice}
// 								/>
// 							</Drawer.Body>
// 							<Drawer.Footer
// 								borderTopWidth='1px'
// 								borderColor='gray.200'>
// 								<Button
// 									width='full'
// 									colorScheme='black'
// 									bg='black'
// 									color='white'
// 									_hover={{ bg: 'gray.800' }}
// 									onClick={() => setIsDrawerOpen(false)}>
// 									Apply Filters
// 								</Button>
// 							</Drawer.Footer>
// 						</Drawer.Content>
// 					</Drawer.Positioner>
// 				</Portal>
// 			</Drawer.Root>

// 			<AdditionalInfo />
// 		</PageLayout>
// 	);
// };

// export default CategoryPageComponent;