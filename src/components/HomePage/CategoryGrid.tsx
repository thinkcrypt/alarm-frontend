import React from 'react';
import Link from 'next/link';
import CategoryCard from '../reusable/CategoryCard';
import { Box, Container, Grid } from '@chakra-ui/react';
import SectionHeader from '../reusable/SectionHeader';
import CustomContainer from '../reusable/Container';
import SectionHeader2 from '../reusable/SectionHeader2';

// JSON data for categories
const categories = [
	{ id: 't-shirts', title: 'T-Shirts', image: '/image-4.webp' },
	{ id: 'accessories', title: 'Accessories', image: '/image-2.webp' },
	{ id: 'socks', title: 'Socks', image: '/image-8.webp' },
	{ id: 'casual-sets', title: 'Casual Sets', image: '/image-9.jpg' },
	{ id: 'masks', title: 'Masks', image: '/image-15.webp' },
	{ id: 'denim-pants', title: 'Denim Pants', image: '/image-10.jpg' },
];

type CategoryGridProps = {
	categoryData: any[];
};

const CategoryGrid: React.FC<CategoryGridProps> = ({ categoryData }) => {
	const featuredCategories = categoryData?.filter(category => category.isFeatured);

	// console.log('featuredCategories', featuredCategories);

	return (
		<CustomContainer>
			<Box>
				<SectionHeader2 title='Shop By Category' />
				<Grid
					templateColumns={{
						base: 'repeat(2, 1fr)',
						md: 'repeat(2, 1fr)',
						lg: 'repeat(3, 1fr)',
					}}
					gap={{ base: 2, md: 4 }}>
					{featuredCategories.slice(0, 6).map(category => (
						<Link
							key={category.id}
							href={`/category/${category._id}`}
							passHref>
							<CategoryCard
								image={category.image}
								title={category.name}
							/>
						</Link>
					))}
				</Grid>
			</Box>
		</CustomContainer>
	);
};

export default CategoryGrid;
