'use client';
import { Flex } from '@chakra-ui/react';
import React, { FC } from 'react';

type CategoryFilterSectionContainerProps = {
	children: any;
};

const CategoryFilterSectionContainer: FC<
	CategoryFilterSectionContainerProps
> = ({ children }) => {
	return (
		<Flex direction={'column'} borderRadius={'md'} gap={2} bg='white' pl={4} py={4}>
			{children}
		</Flex>
	);
};

export default CategoryFilterSectionContainer;
