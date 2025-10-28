import { Box, Grid } from '@chakra-ui/react';
import React from 'react';
import ProductCard from '../reusable/ProductCard';

import { getAllProduct } from '@/lib/ssr/getAllProduct';
import SectionHeader2 from '../reusable/SectionHeader2';

interface ProductSectionProps {
	title: string;
	products: any[];
	id?: string;
}

const ProductSection: React.FC<ProductSectionProps> = async ({ title, products, id }) => {
	const productData = await getAllProduct(id, '6');

	return (
		<Box borderRadius="md">
			<SectionHeader2 title={title} mb={{ base: 6, md: 8 }} />
			<Grid
				templateColumns={{
					base: 'repeat(2, 1fr)',
					sm: 'repeat(2, 1fr)',
					md: 'repeat(2, 1fr)',
					lg: 'repeat(3, 1fr)',
					'2xl': 'repeat(6, 1fr)',
				}}
				gap={{ base: 2, md: 4 }}
				pb={{ base: 4, md: 10 }}>
				{productData?.doc?.map((product: any, index: number) => (
					<ProductCard
						key={index}
						product={product}
					/>
				))}
			</Grid>
		</Box>
	);
};

export default ProductSection;