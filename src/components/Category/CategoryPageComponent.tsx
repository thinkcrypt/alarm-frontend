'use client';
import React, { FC, useState } from 'react';
import PageLayout from '../Layout/PageLayout';
import HeaderGrid from './HeaderGrid';
import { Flex, Grid, Box, Drawer, Button, Portal } from '@chakra-ui/react';
import CategoryFilterSection from './CategoryFilterSection';
import MobileFilterSidebar from './MobileFilterSidebar';
import ProductCard from '../reusable/ProductCard';
import AdditionalInfo from '../ProductPage/AdditionalInfo';
import { useGetAllQuery } from '@/store/services/commonApi';

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
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	// Filter states
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
		if (categoryData && categoryData?.totalDocs > 0 && categoryData?.doc?.length > 0) {
			const childCategoryIds = categoryData.doc
				.filter((cat: any) => cat.parentCategory?._id === singleCategoryData?._id)
				.map((cat: any) => cat._id);
			categoryIds.push(...childCategoryIds);
		}

		return categoryIds.filter(Boolean).join(',');
	};

	// Fetch filtered products
	const { data, isLoading } = useGetAllQuery({
		path: 'products',
		limit: 200,
		sort: sort,
		filters: {
			category_in: getCategoryFilter(),
			colors_in: colors?.join(','),
			sizes: sizes?.join(','),
			price_btwn: `${startPrice}_${endPrice}`,
		},
	});

	// Determine which products to display
	const displayProducts = data ? data?.doc : categoryProducts;

	if (categoryProducts.length === 0) {
		return (
			<PageLayout categoryData={categoryData}>
				<Flex
					pb={4}
					h='80vh'
					justifyContent={'center'}
					alignItems={'center'}>
					<h1>No products found in this category.</h1>
				</Flex>
			</PageLayout>
		);
	}

	return (
		<PageLayout categoryData={categoryData}>
			<Flex
				direction={'column'}
				w={'full'}
				gap={4}
				px={{ base: 4, md: 12 }}>
				<HeaderGrid
					value={sort}
					onChange={(e: any) => setSort(e)}
					categoryName={categoryName}
					onFilterClick={() => setIsDrawerOpen(true)}
				/>

				<Grid
					pb={4}
					templateColumns={{ base: '1fr', md: '300px 1fr' }}
					gap={4}>
					{/* Desktop Filter Section */}
					<Box
						position='sticky'
						top={'152px'}
						h='fit-content'
						maxH='100%'
						overflowY='auto'
						display={{ base: 'none', md: 'block' }}>
						<CategoryFilterSection
							colors={colors}
							sizes={sizes}
							setColors={setColors}
							setSizes={setSizes}
							id={singleCategoryData?._id}
							setSubCategories={setSubCategories}
							selectedSubCategories={subCategories}
							startPrice={startPrice}
							endPrice={endPrice}
							setStartPrice={setStartPrice}
							setEndPrice={setEndPrice}
						/>
					</Box>

					{/* Product Section */}
					<Box
						overflowY='auto'
						h='100%'>
						<Grid
							templateColumns={{
								base: 'repeat(2, 1fr)',
								lg: 'repeat(3, 1fr)',
								xl: 'repeat(3, 1fr)',
							}}
							gap={4}
							w='full'>
							{isLoading ? (
								<Box>Loading...</Box>
							) : (
								displayProducts?.map((product: any) => (
									<ProductCard
										product={product}
										key={product.id}
									/>
								))
							)}
						</Grid>
					</Box>
				</Grid>
			</Flex>

			{/* Mobile Filter Drawer */}
			<Drawer.Root
				open={isDrawerOpen}
				onOpenChange={e => setIsDrawerOpen(e.open)}
				placement='bottom'
				size='full'>
				<Portal>
					<Drawer.Backdrop />
					<Drawer.Positioner>
						<Drawer.Content
							roundedTop='xl'
							maxH='90vh'>
							<Drawer.Header
								borderBottomWidth='1px'
								borderColor='gray.200'>
								<Drawer.Title>Filters</Drawer.Title>
								<Drawer.CloseTrigger />
							</Drawer.Header>
							<Drawer.Body overflowY='auto'>
								<CategoryFilterSection
									colors={colors}
									sizes={sizes}
									setColors={setColors}
									setSizes={setSizes}
									id={singleCategoryData?._id}
									setSubCategories={setSubCategories}
									selectedSubCategories={subCategories}
									startPrice={startPrice}
									endPrice={endPrice}
									setStartPrice={setStartPrice}
									setEndPrice={setEndPrice}
								/>
							</Drawer.Body>
							<Drawer.Footer
								borderTopWidth='1px'
								borderColor='gray.200'>
								<Button
									width='full'
									colorScheme='black'
									bg='black'
									color='white'
									_hover={{ bg: 'gray.800' }}
									onClick={() => setIsDrawerOpen(false)}>
									Apply Filters
								</Button>
							</Drawer.Footer>
						</Drawer.Content>
					</Drawer.Positioner>
				</Portal>
			</Drawer.Root>

			<AdditionalInfo />
		</PageLayout>
	);
};

export default CategoryPageComponent;