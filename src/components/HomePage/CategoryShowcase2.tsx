'use client';
import React from 'react';
import { Grid, GridItem, useBreakpointValue } from '@chakra-ui/react';
import Link from 'next/link';
import CustomContainer from '../reusable/Container';
import CategoryCard2 from './CategoryCard2';


type CategoryShowcase2Props = {
    categoryData: any[];
};

const CategoryShowcase2: React.FC<CategoryShowcase2Props> = ({ categoryData }) => {
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
                            <CategoryCard2 category={category} />
                        </GridItem>
                    </Link>
                ))}
            </Grid>
        </CustomContainer>
    );
};

export default CategoryShowcase2;