'use client';
import { Box, Image, Text, useBreakpointValue } from '@chakra-ui/react';
import React, { FC } from 'react';

type CategoryCard2Props = {
    category: any;
};

const CategoryCard2: FC<CategoryCard2Props> = ({ category }) => {
    const cardHeight = useBreakpointValue({
        base: '200px',
        md: '250px',
        lg: '400px',
    });

    return (
        <Box shadow="md" w='100%' cursor='pointer'>
            {/* Image Container */}
            <Box
                position='relative'
                h={cardHeight}
                overflow='hidden'
                mb={3}
            >
                <Image
                    src={category?.image}
                    alt={category?.name}
                    w='100%'
                    h='100%'
                    objectFit='cover'
                />
            </Box>

            {/* Category Name Below Image */}
            <Box
                textAlign='center'
                py={2}
            >
                <Text
                    fontSize={{ base: 'lg', md: 'xl' }}
                    fontWeight='semibold'
                    color='gray.800'
                >
                    {category?.name}
                </Text>
            </Box>
        </Box>
    );
};

export default CategoryCard2;