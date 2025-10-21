'use client';
import React from 'react';
import { Grid, GridItem, useBreakpointValue } from '@chakra-ui/react';
import { categoryData } from '../data/productData';
import Link from 'next/link';
import CustomContainer from '../reusable/Container';
import CategoryCard from './CategoryCard';

type CategoryShowcaseProps = {
	categoryData: any[];
};

const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({ categoryData }) => {
	const homePageCategories = categoryData?.filter(category => category.displayInHomePage);
	const gridColumns = useBreakpointValue({
		base: 1,
		sm: 2,
		md: 2,
		lg: 3,
		'2xl': 4,
	});

	return (
		<CustomContainer>
			<Grid
				templateColumns={`repeat(${gridColumns}, 1fr)`}
				gap={{ base: 2, md: 6 }}
				w='100%'>
				{homePageCategories?.slice(0, 4).map(category => (
					<Link
						key={category?.id}
						href={`/category/${category?.id}`}>
						<GridItem>
							<CategoryCard category={category} />
						</GridItem>
					</Link>
				))}
			</Grid>
		</CustomContainer>
	);
};

export default CategoryShowcase;
