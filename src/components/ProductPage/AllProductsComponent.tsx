'use client';
import React, { useMemo, useState } from 'react';
import PageLayout from '../Layout/PageLayout';
import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import SectionHeader2 from '../reusable/SectionHeader2';
import Link from 'next/link';
import ProductCard from '../reusable/ProductCard';
import AdditionalInfo from './AdditionalInfo';
import CategoryFilterSection from '../Category/CategoryFilterSection';
import HeaderGrid from '../Category/HeaderGrid';
import MobileFilterSidebar from '../Category/MobileFilterSidebar';

type Props = {
	allProducts?: any;
};

export default function AllProductsComponent({ allProducts }: Props) {
	const categories = [...new Set(allProducts?.map((p: any) => p?.category?.name))] as string[];

	const allVariations = allProducts.flatMap((p: any) => p?.variations || []);

	// Colors
	const allColors = [
		...new Set(
			allVariations
				.map((v: any) => {
					const colorAttr = v.attributes.find(
						(attr: any) => attr.label.toLowerCase() === 'color'
					);
					if (colorAttr) return colorAttr.value;
					const possibleColor = v.name.split('-')[1];
					return possibleColor || null;
				})
				.filter(Boolean)
		),
	] as string[];

	// Sizes
	const commonSizes = [
		...new Set(
			allVariations
				.map((v: any) => {
					const sizeAttr = v.attributes.find(
						(attr: any) => attr.label.toLowerCase() === 'size'
					);
					if (sizeAttr) return sizeAttr.value;
					const possibleSize = v.name.split('-')[0];
					return possibleSize || null;
				})
				.filter(Boolean)
		),
	] as string[];

	const prices = allProducts?.map((p: any) => p.price);
	const minPrice = Math.min(...prices);
	const maxPrice = Math.max(...prices);

	// Filter states
	const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
	const [selectedColors, setSelectedColors] = useState<string[]>([]);
	const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
	const [startPrice, setStartPrice] = useState<number>(minPrice || 0);
	const [endPrice, setEndPrice] = useState<number>(maxPrice || 10000);
	const [sortType, setSortType] = useState<string | null>(null);
	const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

	// Filtering logic
	const filteredProducts = useMemo(() => {
		return allProducts.filter((product: any) => {
			const categoryMatch =
				selectedSubCategories.length === 0 ||
				selectedSubCategories.includes(product.category?.name);

			const colorMatch =
				selectedColors.length === 0 ||
				product.variations.some((v: any) => {
					const colorAttr = v.attributes.find(
						(attr: any) => attr.label.toLowerCase() === 'color'
					);
					const color = colorAttr ? colorAttr.value : v.name.split('-')[1];
					return selectedColors.includes(color);
				});

			const sizeMatch =
				selectedSizes.length === 0 ||
				product.variations.some((v: any) => {
					const sizeAttr = v.attributes.find(
						(attr: any) => attr.label.toLowerCase() === 'size'
					);
					const size = sizeAttr ? sizeAttr.value : v.name.split('-')[0];
					return selectedSizes.includes(size);
				});

			const priceMatch = product.price >= startPrice && product.price <= endPrice;

			return categoryMatch && colorMatch && sizeMatch && priceMatch;
		});
	}, [allProducts, selectedSubCategories, selectedColors, selectedSizes, startPrice, endPrice]);

	// Sorting logic
	const sortedProducts = useMemo(() => {
		if (!sortType) return filteredProducts;

		const productsCopy = [...filteredProducts];
		switch (sortType) {
			case 'low-high':
				return productsCopy.sort((a, b) => a.price - b.price);
			case 'high-low':
				return productsCopy.sort((a, b) => b.price - a.price);
			case 'a-z':
				return productsCopy.sort((a, b) => a.name.localeCompare(b.name));
			case 'z-a':
				return productsCopy.sort((a, b) => b.name.localeCompare(a.name));
			default:
				return productsCopy;
		}
	}, [filteredProducts, sortType]);

	const handleMobileFilterOpen = () => setIsMobileFilterOpen(true);
	const handleMobileFilterClose = () => setIsMobileFilterOpen(false);

	return (
		<PageLayout categoryData={allProducts}>
			<Flex direction={'column'} w={'full'} gap={4} px={{ base: 4, md: 12 }}>
				<HeaderGrid
					categoryName={'All Products'}
					onFilterClick={handleMobileFilterOpen}
					onSortChange={setSortType}
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
						<CategoryFilterSection
							id={'all-products'}
							colors={selectedColors}
							sizes={selectedSizes}
							setColors={setSelectedColors}
							setSizes={setSelectedSizes}
							setSubCategories={setSelectedSubCategories}
							selectedSubCategories={selectedSubCategories}
							startPrice={startPrice}
							endPrice={endPrice}
							setStartPrice={setStartPrice}
							setEndPrice={setEndPrice}
						/>
					</Box>

					{/* Products Section */}
					<Box overflowY='auto' h='100%'>
						{sortedProducts.length < 1 ? (
							<Flex h={'100dvh'} justifyContent={'center'} alignItems={'center'}>
								<Text fontSize={30} fontWeight={600}>
									No Products Found.
								</Text>
							</Flex>
						) : (
							<Grid
								templateColumns={{
									base: 'repeat(2, 1fr)',
									lg: 'repeat(3, 1fr)',
									xl: 'repeat(4, 1fr)',
								}}
								gap={4}
								w='full'
							>
								{sortedProducts?.map((product: any) => (
									<Link key={product.id} href={`/category/${product.id}`}>
										<ProductCard key={product?.id} product={product} />
									</Link>
								))}
							</Grid>
						)}
					</Box>
				</Grid>
			</Flex>

			{/* Mobile Filter Sidebar */}
			<MobileFilterSidebar
				isOpen={isMobileFilterOpen}
				onClose={handleMobileFilterClose}
				categories={categories}
				colors={allColors}
				sizes={commonSizes}
				priceRanges={[]}
			/>

			<AdditionalInfo />
		</PageLayout>
	);
}