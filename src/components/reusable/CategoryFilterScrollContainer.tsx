'use client';
import { Flex } from '@chakra-ui/react';
import React, { FC } from 'react';

type CategoryFilterScrollContainerProps = {
	children: any;
};

const CategoryFilterScrollContainer: FC<CategoryFilterScrollContainerProps> = ({
	children,
}) => {
	return (
		<Flex direction={'column'} gap={2} maxH={'140px'} overflowY={'auto'}>
			{children}
		</Flex>
	);
};

export default CategoryFilterScrollContainer;
