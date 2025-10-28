'use client';

import {
    Box,
    Flex,
    Link as ChakraLink,
    Skeleton,
    Grid,
    Text,
    Image,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';

type HomePageBannerNavProps = {
    categoryData?: any[];
    isLoading?: boolean;
};

const HomePageBannerNav: React.FC<HomePageBannerNavProps> = ({
    categoryData = [],
    isLoading = false,
}) => {
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

    // Build parent categories
    const parents = categoryData
        .filter(
            cat =>
                !cat.parentCategory &&
                cat.displayInMenu === true &&
                cat.isActive === true &&
                !cat.isDeleted
        )
        .map(parent => {
            const children = categoryData.filter(
                child =>
                    child.parentCategory?.id === parent.id &&
                    child.displayInMenu === true &&
                    child.isActive === true &&
                    !child.isDeleted
            );

            return {
                id: parent.id,
                name: parent.name,
                image: parent.image,
                href: `/category/${parent.id}`,
                childCategories: children.map(child => ({
                    id: child.id,
                    label: child.name,
                    href: `/category/${child.id}`,
                })),
            };
        });

    const chunkArray = (arr: any[], size: number) => {
        const chunks = [] as any[];
        for (let i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size));
        }
        return chunks;
    };

    // Show only first 4 categories on mobile/medium devices
    const displayCategories = {
        mobile: parents.slice(0, 4),
        desktop: parents
    };

    return (
        <Box bg="#F5F8F8" py={{ base: 3, md: 4 }}>
            {isLoading ? (
                <Flex
                    justifyContent="space-between"
                    gap={{ base: 2, md: 3, lg: 0 }}
                    px={{ base: 3, md: 4 }}
                >
                    {Array.from({ length: 4 }).map((_, idx) => (
                        <Skeleton
                            key={idx}
                            height={{ base: '40px', md: '45px', lg: '50px' }}
                            flex="1"
                            maxW={{ base: '23%', lg: '150px' }}
                            borderRadius="md"
                        />
                    ))}
                </Flex>
            ) : (
                <>
                    {/* Mobile/Medium - Show only 4 categories */}
                    <Flex
                        display={{ base: 'flex', lg: 'none' }}
                        justifyContent="space-between"
                        gap={{ base: 2, md: 3 }}
                        px={{ base: 3, md: 4 }}
                    >
                        {displayCategories.mobile?.map((item) => (
                            <ChakraLink
                                key={item.id}
                                as={Link}
                                href={item.href}
                                flex="1"
                                px={{ base: 2, md: 3 }}
                                py={{ base: 2, md: 3 }}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                textAlign="center"
                                borderRadius="md"
                                bg="transparent"
                                _hover={{
                                    bg: '#f9fafa',
                                    transition: 'all 0.2s ease-in-out',
                                    textDecoration: 'none',
                                }}
                                fontWeight="semibold"
                                fontSize={{ base: '13px', md: '14px' }}
                                whiteSpace="normal"
                                wordBreak="break-word"
                                lineHeight="1.3"
                                textTransform="uppercase"
                            >
                                {item.name}
                            </ChakraLink>
                        ))}
                    </Flex>

                    {/* Desktop - Show all categories */}
                    <Flex
                        display={{ base: 'none', lg: 'flex' }}
                        gap={0}
                        justifyContent="center"
                        w="100%"
                    >
                        {displayCategories.desktop?.map((item, idx) => (
                            <Box
                                key={item.id}
                                position="relative"
                                onMouseEnter={() => setHoveredCategory(item.id)}
                                onMouseLeave={() => setHoveredCategory(null)}
                            >
                                <ChakraLink
                                    as={Link}
                                    href={item.href}
                                    px={{ lg: 8, xl: 12, '2xl': 16 }}
                                    py={{ lg: 4, xl: 5 }}
                                    display="block"
                                    clipPath="polygon(10% 0%, 100% 0, 90% 100%, 0% 100%)"
                                    bg={hoveredCategory === item.id ? '#f9fafa' : 'transparent'}
                                    _hover={{
                                        bg: '#f9fafa',
                                        transition: 'all 0.2s ease-in-out',
                                        textDecoration: 'none',
                                    }}
                                    fontWeight="semibold"
                                    fontSize="16px"
                                    textAlign="center"
                                    whiteSpace="nowrap"
                                    textTransform="uppercase"
                                >
                                    {item.name}
                                </ChakraLink>

                                {/* Invisible bridge to prevent gap */}
                                <Box
                                    position="absolute"
                                    top="100%"
                                    left={0}
                                    width="100%"
                                    height="10px"
                                    bg="transparent"
                                    zIndex={98}
                                    display={hoveredCategory === item.id ? 'block' : 'none'}
                                />

                                {/* Subcategories Dropdown */}
                                {/* {item?.childCategories?.length > 0 && (
                                    <Box
                                        position="absolute"
                                        top="calc(100% + 10px)"
                                        left={idx < Math.floor(displayCategories.desktop.length / 2) ? '0' : 'auto'}
                                        right={idx >= Math.floor(displayCategories.desktop.length / 2) ? '0' : 'auto'}
                                        bg="white"
                                        overflow="hidden"
                                        boxShadow="lg"
                                        borderRadius="md"
                                        zIndex={99}
                                        transition="opacity 0.2s ease"
                                        opacity={hoveredCategory === item.id ? 1 : 0}
                                        visibility={hoveredCategory === item.id ? 'visible' : 'hidden'}
                                        pointerEvents={hoveredCategory === item.id ? 'auto' : 'none'}
                                        maxH="400px"
                                        overflowY="auto"
                                    >
                                        <Grid
                                            templateColumns={`repeat(${Math.ceil(
                                                (item.childCategories?.length || 0) / 5
                                            )}, 1fr) ${item.image ? 'auto' : ''}`}
                                        >
                                            {chunkArray(item.childCategories || [], 5).map(
                                                (chunk, colIdx) => (
                                                    <Box key={colIdx}>
                                                        {chunk?.map((sub: any) => (
                                                            <Link key={sub.id} href={sub.href}>
                                                                <Text
                                                                    w={{ base: '140px', sm: '160px', md: '180px' }}
                                                                    px={{ base: 4, md: 6 }}
                                                                    py={2}
                                                                    fontSize={{ base: 'xs', md: 'sm' }}
                                                                    borderBottom="1px solid"
                                                                    borderColor="gray.100"
                                                                    _hover={{
                                                                        bg: 'gray.50',
                                                                        color: 'blue.500',
                                                                    }}
                                                                    _last={{ borderBottom: 'none' }}
                                                                >
                                                                    {sub.label}
                                                                </Text>
                                                            </Link>
                                                        ))}
                                                    </Box>
                                                )
                                            )}
                                            {item.image && (
                                                <Box
                                                    w={{ base: '140px', sm: '160px', md: '180px' }}
                                                    h={{ base: '146px', sm: '166px', md: '186px' }}
                                                    overflow="hidden"
                                                >
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        w="100%"
                                                        h="100%"
                                                        objectFit="cover"
                                                    />
                                                </Box>
                                            )}
                                        </Grid>
                                    </Box>
                                )} */}
                            </Box>
                        ))}
                    </Flex>
                </>
            )}
        </Box>
    );
};

export default HomePageBannerNav;