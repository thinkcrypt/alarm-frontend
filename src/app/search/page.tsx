'use client';

import React, { useState, useEffect, Suspense } from 'react';
import {
	Box,
	Container,
	Text,
	Grid,
	VStack,
	HStack,
	Input,
	Button,
	Spinner,
	Flex,
} from '@chakra-ui/react';
import { LuSearch } from 'react-icons/lu';
import { useSearchParams, useRouter } from 'next/navigation';
import { useGetAllQuery } from '@/store/services/commonApi';
import ProductCard from '@/components/reusable/ProductCard';
import PageLayout from '@/components/Layout/PageLayout';
import CustomContainer from '@/components/reusable/Container';

interface Product {
	_id: string;
	name: string;
	images: string[];
	price: number;
	salePrice?: number;
	category?: {
		name: string;
	};
	brand?: {
		name: string;
	};
}

const SearchResultsContent: React.FC = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const initialQuery = searchParams.get('q') || '';

	const [searchValue, setSearchValue] = useState(initialQuery);
	const [currentPage, setCurrentPage] = useState(1);
	const [sortBy, setSortBy] = useState('-createdAt');
	const [filters, setFilters] = useState({});

	const limit = 20;

	// API call for search results
	const {
		data: searchResults,
		isLoading,
		isFetching,
		error,
	} = useGetAllQuery(
		{
			path: 'products',
			search: initialQuery,
			page: currentPage,
			limit,
			sort: sortBy,
			isActive: true,
			...filters,
		},
		{
			skip: !initialQuery,
		}
	);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchValue.trim()) {
			const newUrl = `/search?q=${encodeURIComponent(searchValue.trim())}`;
			router.push(newUrl);
			setCurrentPage(1);
		}
	};

	const handleSortChange = (newSort: string) => {
		setSortBy(newSort);
		setCurrentPage(1);
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		// Scroll to top
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const products = searchResults?.doc || [];
	const totalPages = searchResults?.totalPages || 0;
	const totalResults = searchResults?.totalDocs || 0;

	// Generate page numbers for pagination
	const getPageNumbers = () => {
		const pages = [];
		const maxPagesToShow = 5;
		let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
		const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

		if (endPage - startPage < maxPagesToShow - 1) {
			startPage = Math.max(1, endPage - maxPagesToShow + 1);
		}

		for (let i = startPage; i <= endPage; i++) {
			pages.push(i);
		}

		return pages;
	};

	//

	return (
		<PageLayout
			categoryData={[]}
			py={8}
		>
			
			<CustomContainer>
				{/* Search Header */}
				<VStack
					gap={6}
					align='stretch'
					mb={8}
					pt={{base: 8, md: 0}}
				>
					<Box>
						<Text
							fontSize='2xl'
							fontWeight='bold'
							mb={2}>
							Search Results
						</Text>
						{initialQuery && (
							<Text
								fontSize='md'
								color='gray.600'>
								Showing results for: <strong>"{initialQuery}"</strong>
							</Text>
						)}
					</Box>

					{/* Search Bar */}
					<form onSubmit={handleSearch}>
						<HStack gap={4}>
							<Box
								position='relative'
								flex={1}
								maxW='500px'>
								<Input
									bg='white'
									placeholder='Search products...'
									value={searchValue}
									onChange={e => setSearchValue(e.target.value)}
									pr='50px'
								/>
								<Button
									position='absolute'
									right={0}
									top={0}
									h='full'
									px={4}
									type='submit'
									bg='transparent'
									_hover={{ bg: 'gray.100' }}>
									<LuSearch
										size={18}
										color='black'
									/>
								</Button>
							</Box>
						</HStack>
					</form>

					{/* Filters and Sort */}
					<HStack
						justify='space-between'
						wrap='wrap'
						gap={4}>
						<HStack gap={4}>
							<Text
								fontSize='sm'
								color='gray.600'>
								{totalResults > 0
									? `${totalResults} product${totalResults !== 1 ? 's' : ''} found`
									: 'No products found'}
							</Text>
						</HStack>

						<HStack gap={4}>
							<select
								style={{
									padding: '8px 12px',
									borderRadius: '6px',
									border: '1px solid #e2e8f0',
									fontSize: '14px',
									minWidth: '150px',
								}}
								value={sortBy}
								onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
									handleSortChange(e.target.value) 
								}>
								<option value='-createdAt'>Newest First</option>
								<option value='createdAt'>Oldest First</option>
								<option value='name'>Name (A-Z)</option>
								<option value='-name'>Name (Z-A)</option>
								<option value='price'>Price (Low to High)</option>
								<option value='-price'>Price (High to Low)</option>
							</select>
						</HStack>
					</HStack>
				</VStack>

				{/* Loading State */}
				{(isLoading || isFetching) && (
					<Flex
						justify='center'
						align='center'
						py={12}>
						<Spinner
							size='lg'
							mr={4}
						/>
						<Text>Loading products...</Text>
					</Flex>
				)}

				{/* Error State */}
				{error && (
					<Box
						textAlign='center'
						py={12}>
						<Text
							color='red.500'
							fontSize='lg'>
							Something went wrong. Please try again.
						</Text>
					</Box>
				)}

				{/* Results */}
				{!isFetching && !error && (
					<>
						{products.length > 0 ? (
							<>
								<Grid
									templateColumns={{
										base: 'repeat(2, 1fr)',
										md: 'repeat(3, 1fr)',
										lg: 'repeat(4, 1fr)',
									}}
									gap={4}
									mb={8}>
									{products?.map((product: any) => (
										<ProductCard
											product={product}
											key={product._id}
										/>
									))}
								</Grid>

								{/* Pagination */}
								{totalPages > 1 && (
									<Flex
										justify='center'
										align='center'
										gap={2}
										flexWrap='wrap'>
										<Button
											size='sm'
											variant='outline'
											disabled={currentPage === 1}
											onClick={() => handlePageChange(currentPage - 1)}>
											Previous
										</Button>

										{getPageNumbers().map(page => (
											<Button
												key={page}
												size='sm'
												variant={page === currentPage ? 'solid' : 'outline'}
												colorScheme={page === currentPage ? 'blue' : 'gray'}
												onClick={() => handlePageChange(page)}>
												{page}
											</Button>
										))}

										<Button
											size='sm'
											variant='outline'
											disabled={currentPage === totalPages}
											onClick={() => handlePageChange(currentPage + 1)}>
											Next
										</Button>
									</Flex>
								)}
							</>
						) : (
							initialQuery && (
								<Box
									textAlign='center'
									py={12}>
									<Text
										fontSize='lg'
										color='gray.600'
										mb={4}>
										No products found for "{initialQuery}"
									</Text>
									<Text
										fontSize='md'
										color='gray.500'>
										Try adjusting your search terms or browse our categories.
									</Text>
								</Box>
							)
						)}
					</>
				)}
			</CustomContainer>
		</PageLayout>
	);
};

const SearchResultsPage: React.FC = () => {
	return (
		<Suspense
			fallback={
				<Container
					maxW='7xl'
					py={8}>
					<Flex
						justify='center'
						align='center'
						minH='50vh'>
						<Spinner
							size='lg'
							mr={4}
						/>
						<Text>Loading search results...</Text>
					</Flex>
				</Container>
			}>
			<SearchResultsContent />
		</Suspense>
	);
};

export default SearchResultsPage;
// 