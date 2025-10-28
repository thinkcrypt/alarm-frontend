'use client';
import { Box, Flex, FlexProps } from '@chakra-ui/react';
import React, { FC } from 'react';
import Header from '../HomePage/Header';
import Footer from '../Footer/Footer';
import { colors } from '../data/color';
import { useGetAllQuery } from '@/store/services/commonApi';

type PageLayoutProps = FlexProps & {
	children: any;
	props?: any;
	categoryData?: any;
};

const PageLayout: FC<PageLayoutProps> = ({
	children,
	...props
}) => {
	const { data, isLoading } = useGetAllQuery({
		path: 'categories',
		limit: '20',
		sort: 'priority',
		isActive: 'true',
	});

	const categoryData = data?.doc;

	return (
		<Box backgroundColor={colors.bg}>
			<Header
				categoryData={categoryData}
				isLoading={isLoading}
			/>
			<Flex
				direction={'column'}
				minH={'100vh'}
				w={'full'}
				pt={{ base: '52px', md: '102px' }}
				pb='0px'
				px={0}
				mx={0}
				overflow='hidden'
				{...props}>
				{children}
			</Flex>
			<Footer />
		</Box>
	);
};

export default PageLayout;