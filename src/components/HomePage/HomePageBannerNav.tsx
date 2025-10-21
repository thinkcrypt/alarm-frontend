'use client';

import {
    Box,
    Flex,
    HStack,
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

    // Build parent categories - same logic as Header
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

    return (
        <Flex justify="center" bg="#fff" py={0}>
            {isLoading ? (
                <HStack gap={0}>
                    {Array.from({ length: 7 }).map((_, idx) => (
                        <Skeleton
                            key={idx}
                            height="50px"
                            width="150px"
                            clipPath="polygon(10% 0%, 100% 0, 90% 100%, 0% 100%)"
                        />
                    ))}
                </HStack>
            ) : (
                <HStack gap={0} >
                    {parents?.slice(0, 7).map((item, idx) => (
                        <Box
                            key={item.id}
                            position="relative"
                            onMouseEnter={() => setHoveredCategory(item.id)}
                            onMouseLeave={() => setHoveredCategory(null)}
                        >
                            <ChakraLink
                                as={Link}
                                href={item.href}
                                px={{ base: 8, md: 12, lg: 16, xl: 20 }}
                                py={5}
                                display="block"
                                clipPath="polygon(10% 0%, 100% 0, 90% 100%, 0% 100%)"
                                bg={hoveredCategory === item.id ? '#f9fafa' : 'transparent'}
                                _hover={{
                                    bg: '#f9fafa',
                                    transition: 'all 0.2s ease-in-out',
                                    textDecoration: 'none',
                                }}
                                fontWeight="semibold"
                                fontSize="sm"
                                textAlign="center"
                                whiteSpace="nowrap"
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
                            {item?.childCategories?.length > 0 && (
                                <Box
                                    position="absolute"
                                    top="calc(100% + 10px)"
                                    left={idx < 3 ? '0' : 'auto'}
                                    right={idx > 3 ? '0' : 'auto'}
                                    bg="white"
                                    overflow="hidden"
                                    boxShadow="lg"
                                    borderRadius="md"
                                    zIndex={99}
                                    transition="opacity 0.2s ease"
                                    opacity={hoveredCategory === item.id ? 1 : 0}
                                    visibility={hoveredCategory === item.id ? 'visible' : 'hidden'}
                                    pointerEvents={hoveredCategory === item.id ? 'auto' : 'none'}
                                >
                                    <Grid
                                        templateColumns={`repeat(${Math.ceil(
                                            (item.childCategories?.length || 0) / 5
                                        )}, 1fr) ${item.image ? '180px' : ''}`}
                                    >
                                        {chunkArray(item.childCategories || [], 5).map(
                                            (chunk, colIdx) => (
                                                <Box key={colIdx}>
                                                    {chunk?.map((sub: any) => (
                                                        <Link key={sub.id} href={sub.href}>
                                                            <Text
                                                                w="180px"
                                                                px={6}
                                                                py={2}
                                                                fontSize="sm"
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
                                            <Box w="180px" h="186px" overflow="hidden">
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
                            )}
                        </Box>
                    ))}
                </HStack>
            )}
        </Flex>
    );
};

export default HomePageBannerNav;