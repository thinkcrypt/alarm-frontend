import React, { FC, Fragment } from 'react';
import HeroBanner from './HeroBanner';
import CategoryGrid from './CategoryGrid';
import ProductSection from './ProductSection';
import BigDeals from './BigDeals';
import CategoryShowcase from './CategoryShowcase';
import CategoryShowcase2 from './CategoryShowcase2';
import PageLayout from '../Layout/PageLayout';
import PromotionalBanner from './PromotionalBanner';
import CategorySection from '../reusable/CategorySection';
import CustomContainer from '../reusable/Container';
import { Flex, Box } from '@chakra-ui/react';
import HomePageBannerNav from './HomePageBannerNav';
import getContentBySlug from '@/hooks/getContentBySlug';

type HomepageComponentProps = {
	categoryData?: any;
	productData?: any;
	contents?: any;
	banners?: any;
};

const HomepageComponent: FC<HomepageComponentProps> = ({
	categoryData,
	productData,
	banners,
	contents,
}) => {
	// const displayInHomeCategories = categoryData?.filter(
	// 	(category: any) => category?.displayInHomePage && !category?.isFeatured
	// );

	// const featuredAndHomeCategories = categoryData?.filter(
	// 	(category: any) => category?.displayInHomePage && category?.isFeatured
	// );
	// statin
	const gridCategories = getContentBySlug(contents, 'grid-categories');
	const productList = getContentBySlug(contents, 'product-list');
	const categoryShowcase = getContentBySlug(contents, 'category-showcase');
	const secondaryProductList = getContentBySlug(
		contents,
		'secondary-product-list'
	);

	return (
		<PageLayout categoryData={categoryData}>
			{/* Full Width Banner Section - Outside Container */}
			<Box w='100%' px={0} mx={0}>
				<HeroBanner banners={banners?.doc} />
				<HomePageBannerNav categoryData={categoryData} />
			</Box>
			<CategoryGrid categoryData={gridCategories} />
			{/* <CategoryGrid categoryData={categoryData} /> */}

			<CustomContainer>
				{/* Show first category product section */}

				{productList?.list?.map((cat: any, idx: number) => (
					<ProductSection
						id={cat}
						key={idx}
						title={cat}
						products={[]}
						perRow={productList?.content}
					/>
				))}
			</CustomContainer>

			{/* CategoryShowcase2 Section after first product section */}
			<CategoryShowcase2 categoryData={categoryShowcase} />

			<CustomContainer>
				{secondaryProductList?.list?.map((cat: any, idx: number) => (
					<ProductSection
						id={cat}
						key={idx}
						title={cat}
						products={[]}
						name={secondaryProductList?.name}
						perRow={secondaryProductList?.content}
					/>
				))}
			</CustomContainer>

			<CategoryShowcase categoryData={categoryData} />

			<CustomContainer>
				<Flex direction='column' w='100%' h='100%' gap={4}>
					{secondaryProductList?.list?.map((cat: any, idx: number) => (
						<CategorySection key={idx} category={cat} />
					))}
				</Flex>
			</CustomContainer>

			<BigDeals />

			<PromotionalBanner />
		</PageLayout>
	);
};

export default HomepageComponent;
