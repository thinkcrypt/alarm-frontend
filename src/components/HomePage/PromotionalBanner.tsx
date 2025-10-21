'use client';

import React from 'react';
import { Box, HStack, useBreakpointValue, Grid, GridItem } from '@chakra-ui/react';
import CustomContainer from '../reusable/Container';
import PromoItem from './PromoItem';
import { promoItems } from '../data/promoData';

const PromotionalBanner: React.FC = () => {
	const isSmallScreen = useBreakpointValue({ base: true, lg: false });
	return (
		<Box
			bg='red.500'
			py={{ base: 6, md: 3 }}
			w='100%'>
			{isSmallScreen ? (
				// Mobile: 2x2 Grid Layout
				<CustomContainer pt={0}>
					<Grid
						templateColumns='repeat(2, 1fr)'
						gap={4}>
						{promoItems?.map((item, index) => (
							<GridItem key={index}>
								<PromoItem
									icon={item.icon}
									title={item.title}
									subtitle={item.subtitle}
								/>
							</GridItem>
						))}
					</Grid>
				</CustomContainer>
			) : (
				// Desktop: Horizontal Layout
				<CustomContainer pt={0}>
					<HStack
						justify='space-between'
						align='center'
						gap={4}
						wrap='nowrap'>
						{promoItems?.map((item, index) => (
							<PromoItem
								key={index}
								icon={item.icon}
								title={item.title}
								subtitle={item.subtitle}
							/>
						))}
					</HStack>
				</CustomContainer>
			)}
		</Box>
	);
};

export default PromotionalBanner;
