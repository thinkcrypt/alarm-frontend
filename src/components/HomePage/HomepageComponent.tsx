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

type HomepageComponentProps = {
	categoryData?: any;
	productData?: any;
	banners?: any;
};

const HomepageComponent: FC<HomepageComponentProps> = ({ categoryData, productData, banners }) => {
	const displayInHomeCategories = categoryData?.filter(
		(category: any) => category?.displayInHomePage && !category?.isFeatured
	);

	const featuredAndHomeCategories = categoryData?.filter(
		(category: any) => category?.displayInHomePage && category?.isFeatured
	);

	return (
		<PageLayout categoryData={categoryData}>
			{/* Full Width Banner Section - Outside Container */}
			<Box w="100%" px={0} mx={0}>
				<HeroBanner banners={banners?.doc} />
				<HomePageBannerNav categoryData={categoryData} />
			</Box>

			<CategoryGrid categoryData={categoryData} />

			<CustomContainer>
				{/* Show first category product section */}
				{displayInHomeCategories?.slice(0, 1).map((cat: any, idx: number) => (
					<ProductSection
						id={cat?._id}
						key={idx}
						title={cat.name}
						products={productData?.filter((product: any) => product?.category?.name === cat.name)}
					/>
				))}
			</CustomContainer>

			{/* CategoryShowcase2 Section after first product section */}
			<CategoryShowcase2 categoryData={categoryData} />

			<CustomContainer >
				{/* Show remaining category product sections */}
				{displayInHomeCategories?.slice(1).map((cat: any, idx: number) => (
					<ProductSection

						id={cat?._id}
						key={idx}
						title={cat.name}
						products={productData?.filter((product: any) => product?.category?.name === cat.name)}
					/>
				))}
			</CustomContainer>

			<CategoryShowcase categoryData={categoryData} />

			<CustomContainer>
				<Flex
					direction='column'
					w='100%'
					h='100%'
					gap={4}>
					{featuredAndHomeCategories?.map((cat: any, idx: number) => (
						<CategorySection
							key={idx}
							category={cat}
							products={productData?.filter((product: any) => product?.category?.name === cat.name)}
						/>
					))}
				</Flex>
			</CustomContainer>

			<BigDeals />

			<PromotionalBanner />
		</PageLayout>
	);
};

export default HomepageComponent;