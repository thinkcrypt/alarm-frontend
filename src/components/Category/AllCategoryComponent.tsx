import React from 'react'
import PageLayout from '../Layout/PageLayout';
import { Box, Flex, Grid } from '@chakra-ui/react';
import AdditionalInfo from '../ProductPage/AdditionalInfo';
import Link from 'next/link';
import CategoryCard from '../reusable/CategoryCard';
import SectionHeader2 from '../reusable/SectionHeader2';

type Props = {
    categoryData?: any;
}

export default function AllCategoryComponent({ categoryData }: Props) {

    if (categoryData.length < 1) {
        return (
            <PageLayout categoryData={categoryData}>
                <Flex pb={4} h='80vh' justifyContent={'center'} alignItems={'center'}>
                    <h1>No Categories.</h1>
                </Flex>
            </PageLayout>
        );
    }

    return (
        <PageLayout categoryData={categoryData}>
            <SectionHeader2 title={"All Categories"} />
            <Flex direction={'column'} w={'full'} gap={4} px={{ base: 4, md: 12 }}>
                <Box overflowY='auto' h='100%'>
                    <Grid
                        templateColumns={{
                            base: 'repeat(2, 1fr)',
                            lg: 'repeat(3, 1fr)',
                            xl: 'repeat(4, 1fr)',
                        }}
                        gap={4}
                        w='full'
                    >
                        {categoryData?.map((product: any) => (
                            <Link 
                            key={product.id}
                            href={`/category/${product.id}`} >
                                <CategoryCard
                                    key={product?.id}
                                    image={product?.image}
                                    title={product?.name} />
                            </Link>
                        ))}
                    </Grid>
                </Box>
            </Flex>
            <AdditionalInfo />
        </PageLayout>
    )
}