import { Box, Grid } from '@chakra-ui/react';
import React from 'react';
import ProductCard from '../reusable/ProductCard';

import { getAllProduct } from '@/lib/ssr/getAllProduct';
import SectionHeader2 from '../reusable/SectionHeader2';

interface ProductSectionProps {
	title: string;
	products: any[];
	id?: string;
	perRow?: string;
	name?: string;
}

const ProductSection: React.FC<ProductSectionProps> = async ({
	title,
	products,
	id,
	name,
	perRow = '3',
}) => {
	const totalProducts = Number(perRow) * 2;
	const productData = await getAllProduct(id, totalProducts?.toString());

	if (productData?.totalDocs == 0) return null;

	return (
		<Box borderRadius='md' pb={11}>
			<SectionHeader2
				title={productData?.doc?.[0]?.category?.name || name || '--'}
				href={`/category/${id}`}
			/>
			<Grid
				templateColumns={{
					base: 'repeat(2, 1fr)',
					sm: 'repeat(2, 1fr)',
					md: 'repeat(2, 1fr)',
					lg: `repeat(${perRow}, 1fr)`,
					'2xl': `repeat(${perRow}, 1fr)`,
				}}
				gap={{ base: 2, md: 4 }}
				pb={{ base: 4, md: 8 }}
			>
				{productData?.doc?.map((product: any, index: number) => (
					<ProductCard key={index} product={product} />
				))}
			</Grid>
		</Box>
	);
};

export default ProductSection;
