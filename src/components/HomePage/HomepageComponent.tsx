import React, { FC } from 'react';
import HeroBanner from './HeroBanner';
import CategoryGrid from './CategoryGrid';
import ProductSection from './ProductSection';
import BigDeals from './BigDeals';
import CategoryShowcase from './CategoryShowcase';
import PageLayout from '../Layout/PageLayout';
import PromotionalBanner from './PromotionalBanner';
import CategorySection from '../reusable/CategorySection';
import CustomContainer from '../reusable/Container';
import { Flex } from '@chakra-ui/react';

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
			<HeroBanner banners={banners?.doc} />
			<CategoryGrid categoryData={categoryData} />

			<CustomContainer>
				{displayInHomeCategories?.map((cat: any, idx: number) => (
					<ProductSection
						id={cat?._id}
						key={idx}
						title={cat.name}
						products={productData?.filter((product: any) => product?.category?.name === cat.name)}
					/>
				))}
			</CustomContainer>

			<CategoryShowcase categoryData={categoryData} />
			{/* <ProductSection title='Signature Product' products={signatureProducts} /> */}
			{/* <SpecialOffers
				categories={displayInHomeCategories}
				// productData={productData}
			/> */}

			<CustomContainer pb={10}>
				<Flex
					direction='column'
					w='100%'
					gap={8}>
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
