'use client';
import React, { FC, useState } from 'react';
import PageLayout from '../Layout/PageLayout';
import HeaderGrid from './HeaderGrid';
import { Flex, Grid, Box } from '@chakra-ui/react';
import { products } from '../data/productData';
import CategoryFilterSection from './CategoryFilterSection';
import MobileFilterSidebar from './MobileFilterSidebar';
import ProductCard from '../reusable/ProductCard';
import ProductCardV2 from '../reusable/ProductCardV2';
import AdditionalInfo from '../ProductPage/AdditionalInfo';
import Link from 'next/link';
import { useGetAllQuery, useGetByIdQuery } from '@/store/services/commonApi';

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
	const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
	const categoryName = singleCategoryData?.name;

	const [sort, setSort] = useState('-createdAt');
	const [clr, setColors] = useState<string[]>([]);
	const [sz, setSizes] = useState<string[]>([]);

	const { data } = useGetAllQuery(
		{
			path: 'products',
			limit: 99,
			page: 1,
			sort,
			filters: { category_in: singleCategoryData?._id },
		},
		{ skip: !singleCategoryData?._id }
	);

	const categories = [...new Set(products?.map(p => p.category))];
	const sizes = [...new Set(products?.flatMap(p => p.sizes))];
	const colors = products?.map(p => p.color);

	const prices = products.map(p => p.price);
	const minPrice = Math.min(...prices);
	const maxPrice = Math.max(...prices);
	const numberOfRanges = 5;
	const rangeSize = Math.ceil((maxPrice - minPrice) / numberOfRanges);
	const priceRanges = Array.from({ length: numberOfRanges }, (_, i) => {
		const start = minPrice + i * rangeSize;
		const end = i === numberOfRanges - 1 ? maxPrice : start + rangeSize - 1;
		return { min: start, max: end };
	});

	const handleMobileFilterOpen = () => {
		setIsMobileFilterOpen(true);
	};

	const handleMobileFilterClose = () => {
		setIsMobileFilterOpen(false);
	};

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
					onFilterClick={handleMobileFilterOpen}
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
							categories={categories}
							colors={colors}
							sizes={sizes}
							priceRanges={priceRanges}
						/>
					</Box>

					{/* Product Section */}
					<Box
						overflowY='auto'
						h='100%'
						>
						<Grid
							templateColumns={{
								base: 'repeat(2, 1fr)',
								lg: 'repeat(3, 1fr)',
								xl: 'repeat(3, 1fr)',
							}}
							gap={4}
							w='full'
						>
							{categoryProducts?.map((product: any) => (
								<ProductCard product={product} key={product.id} />
							))}
						</Grid>
					</Box>
				</Grid>
			</Flex>

			{/* Mobile Filter Sidebar */}
			<MobileFilterSidebar
				isOpen={isMobileFilterOpen}
				onClose={handleMobileFilterClose}
				categories={categories}
				colors={colors}
				sizes={sizes}
				priceRanges={priceRanges}
			/>

			<AdditionalInfo />
		</PageLayout>
	);
};

export default CategoryPageComponent;
