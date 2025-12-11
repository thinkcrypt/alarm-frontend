import {
	Badge,
	Box,
	Grid,
	GridItem,
	Icon,
	Image,
	Text,
	useBreakpointValue,
	VStack,
	Center,
} from '@chakra-ui/react';
import React from 'react';
import { CategoryData } from '../data/productData';
import { FiArrowUpRight } from 'react-icons/fi';
import MiniProductCard from './MiniProductCard';
import Link from 'next/link';
import { getAllProduct } from '@/lib/ssr/getAllProduct';

type CategorySectionProps = {
	category: any;
	products?: any;
};

const CategorySection: React.FC<CategorySectionProps> = async ({
	category,
}) => {
	const maxProducts = 6;

	const products = await getAllProduct(category, '6');

	const displayProducts = products?.doc?.slice(0, maxProducts) || [];

	if (products?.totalDocs < 4) return null;

	return (
		<Box w='100%' overflow='hidden'>
			<Grid
				templateColumns={{ base: '1fr', lg: '250px 1fr', '2xl': '400px 1fr' }}
				gap={{ base: 4, md: 4 }}
				alignItems='start'
				w='100%'
			>
				{/* Main Category Image */}
				<GridItem w='100%'>
					<Link href={`/category/${category}`}>
						<Box
							position='relative'
							h={{ base: '250px', md: '400px', lg: '450px', '2xl': '490px' }}
							overflow='hidden'
							bg='gray.100'
							w='100%'
						>
							<Image
								src={displayProducts?.[0]?.image || category?.image}
								alt={category?.name}
								w='100%'
								h='100%'
								objectFit='cover'
							/>
							<Box
								position='absolute'
								top={0}
								left={0}
								right={0}
								bottom={0}
								bg='linear-gradient(to right, rgba(0,0,0,0.2), rgba(0,0,0,0.4))'
							>
								<Box
									position='absolute'
									bottom={0}
									left={0}
									right={0}
									display='flex'
									alignItems='center'
									justifyContent='center'
									textAlign='center'
									p={{ base: 4, md: 6 }}
									color='white'
								>
									<Text fontSize={{ base: 'lg', md: 'xl' }}>
										{products?.doc?.[0]?.category?.name || '--'}
									</Text>
								</Box>
							</Box>
						</Box>
					</Link>
				</GridItem>

				{/* Product Grid */}
				<GridItem w='100%'>
					<Grid
						templateColumns={{
							base: '1fr',
							md: 'repeat(2, 1fr)',
							lg: 'repeat(3, 1fr)',
							'2xl': 'repeat(4, 1fr)',
						}}
						gap={{ base: 2, md: 3 }}
						w='100%'
						h={{ lg: '450px' }}
						overflow='auto'
						alignContent='start'
						templateRows={{ '2xl': 'repeat(2, 1fr)' }}
					>
						{displayProducts?.map((product: any, index: number) => {
							const isLastItem = index === displayProducts?.length - 1;
							return (
								<GridItem key={product?.id} w='100%' position='relative'>
									<Box
										w='100%'
										h={{
											base: 'auto',
											lg: `calc((450px - 12px) / 2)`,
										}}
										position='relative'
									>
										<Link href={`/product/${product?.slug}`}>
											<MiniProductCard
												image={product?.image}
												price={product?.price}
												originalPrice={product?.originalPrice}
												width='100%'
												height={{
													base: '250px',
													md: '300px',
													lg: '100%',
												}}
											/>
										</Link>
										{isLastItem && (
											<Link href={`/category/${category}`}>
												<Center
													position='absolute'
													top={0}
													left={0}
													w='100%'
													h='100%'
													bg='blackAlpha.600'
													color='white'
													fontWeight='semibold'
													textTransform='uppercase'
													fontSize={{ base: '3xl', md: '3xl' }}
													cursor='pointer'
													_hover={{ bg: 'blackAlpha.700' }}
												>
													View More
												</Center>
											</Link>
										)}
									</Box>
								</GridItem>
							);
						})}
					</Grid>
				</GridItem>
			</Grid>
		</Box>
	);
};

export default CategorySection;
