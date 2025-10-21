'use client';

import { Grid } from '@chakra-ui/react';
import React from 'react';
import ProductCard from '../reusable/ProductCard';
import SectionHeader2 from '../reusable/SectionHeader2';
import { useGetAllQuery } from '@/store/services/commonApi';

interface ProductSectionProps {
	title: string;
	id: string;
}

const ClientProductSection: React.FC<ProductSectionProps> = ({ title, id }) => {
	const { data, isFetching } = useGetAllQuery({ path: `products?category=${id}&limit=6` });
	if (isFetching) return null;
	return (
		<>
			<SectionHeader2 title={title} />
			<Grid
				templateColumns={{
					base: 'repeat(1, 1fr)',
					sm: 'repeat(2, 1fr)',
					md: 'repeat(2, 1fr)',
					lg: 'repeat(3, 1fr)',
					'2xl': 'repeat(6, 1fr)',
				}}
				gap={4}
				pb={10}>
				{data?.doc?.map((product: any, index: number) => (
					<ProductCard
						key={index}
						product={product} // only this prop
					/>
				))}
			</Grid>
		</>
	);
};

export default ClientProductSection;
