import React, { useState, useEffect, useRef } from 'react';
import { Box, Input, VStack, HStack, Text, Image, Spinner, Flex } from '@chakra-ui/react';
import { LuSearch } from 'react-icons/lu';
import NextLink from 'next/link';
import { useGetAllQuery } from '@/store/services/commonApi';
import { useRouter } from 'next/navigation';

interface Product {
	_id: string;
	name: string;
	images: string[];
	price: number;
	salePrice?: number;
	oldPrice?: number;
	slug: string;
	category?: {
		name: string;
	};
}

interface SearchDropdownProps {
	placeholder?: string;
	maxResults?: number;
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({
	placeholder = 'Search products...',
	maxResults = 5,
}) => {
	const [searchValue, setSearchValue] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [debouncedSearch, setDebouncedSearch] = useState('');
	const dropdownRef = useRef<HTMLDivElement>(null);
	const router = useRouter();

	// Debounce search input
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearch(searchValue);
		}, 300);

		return () => clearTimeout(timer);
	}, [searchValue]);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	// API call with debounced search
	const {
		data: searchResults,
		isLoading,
		isFetching,
	} = useGetAllQuery(
		{
			path: 'products',
			search: debouncedSearch,
			limit: maxResults + 1,
			isActive: true,
		},
		{
			skip: !debouncedSearch || debouncedSearch.length < 2,
		}
	);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchValue(value);
		setIsOpen(value.length >= 2);
	};

	const handleSearchSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchValue.trim()) {
			router.push(`/search?q=${encodeURIComponent(searchValue.trim())}`);
			setIsOpen(false);
		}
	};

	const handleViewMore = () => {
		if (searchValue.trim()) {
			router.push(`/search?q=${encodeURIComponent(searchValue.trim())}`);
			setIsOpen(false);
		}
	};

	const handleProductClick = () => {
		setIsOpen(false);
		setSearchValue('');
	};

	const products = searchResults?.doc || [];
	const hasMoreResults = products.length > maxResults;
	const displayProducts = hasMoreResults ? products.slice(0, maxResults) : products;

	return (
		<Box
			position='relative'
			flex='1'
			maxW='600px'
			minW={{ base: '150px', md: '600px' }}
			ref={dropdownRef}>
			<form onSubmit={handleSearchSubmit}>
				<Box position='relative'>
					<Input
						placeholder={placeholder}
						bg='gray.50'
						size='sm'
						w='100%'
						pr='40px'
						borderRadius='full'
						value={searchValue}
						onChange={handleInputChange}
						onFocus={() => searchValue.length >= 2 && setIsOpen(true)}
					/>
					<Box
						position='absolute'
						right={3}
						top='50%'
						transform='translateY(-50%)'
						cursor='pointer'
						onClick={handleSearchSubmit}>
						<LuSearch
							color='gray'
							size={18}
						/>
					</Box>
				</Box>
			</form>

			{/* Search Results Dropdown */}
			{isOpen && (
				<Box
					position='absolute'
					top='100%'
					left={0}
					right={0}
					bg='white'
					borderRadius='md'
					boxShadow='lg'
					border='1px solid'
					borderColor='gray.200'
					zIndex={1000}
					mt={1}
					maxH='400px'
					overflowY='auto'>
					{isLoading || isFetching ? (
						<Flex
							justify='center'
							align='center'
							py={4}>
							<Spinner
								size='sm'
								mr={2}
							/>
							<Text fontSize='sm'>Searching...</Text>
						</Flex>
					) : displayProducts.length > 0 ? (
						<VStack
							gap={0}
							align='stretch'>
							{displayProducts?.map((product: Product) => (
								<NextLink
									key={product?._id}
									href={`/product/${product?.slug}`}>
									<Box
										onClick={handleProductClick}
										p={3}
										_hover={{ bg: 'gray.50' }}
										cursor='pointer'
										borderBottom='1px solid'
										borderColor='gray.100'
										_last={{ borderBottom: 'none' }}>
										<HStack gap={3}>
											{product?.images?.[0] && (
												<Image
													src={product.images[0]}
													alt={product.name}
													boxSize='40px'
													objectFit='cover'
													borderRadius='md'
													flexShrink={0}
												/>
											)}
											<Box flex={1}>
												<Text
													fontSize='sm'
													fontWeight='medium'
													color='gray.900'
													lineClamp={1}>
													{product?.name}
												</Text>
												{product?.category?.name && (
													<Text
														fontSize='xs'
														color='gray.500'
														lineClamp={1}>
														in {product.category.name}
													</Text>
												)}
											</Box>
											<VStack
												gap={0}
												align='end'>
												{product?.oldPrice ? (
													<>
														<Text
															fontSize='sm'
															fontWeight='bold'
															color='red.500'>
															৳{product?.price.toLocaleString()}
														</Text>
														<Text
															fontSize='xs'
															color='gray.400'
															textDecoration='line-through'>
															৳{product?.oldPrice?.toLocaleString()}
														</Text>
													</>
												) : (
													<Text
														fontSize='sm'
														fontWeight='bold'
														color='gray.900'>
														৳{product?.price?.toLocaleString()}
													</Text>
												)}
											</VStack>
										</HStack>
									</Box>
								</NextLink>
							))}

							{/* View More Button */}
							{hasMoreResults && (
								<Box
									p={3}
									textAlign='center'
									borderTop='1px solid'
									borderColor='gray.100'
									cursor='pointer'
									onClick={handleViewMore}
									_hover={{ bg: 'gray.50' }}>
									<Text
										fontSize='sm'
										color='blue.500'
										fontWeight='medium'>
										View More Results
									</Text>
								</Box>
							)}
						</VStack>
					) : debouncedSearch.length >= 2 ? (
						<Box
							p={4}
							textAlign='center'>
							<Text
								fontSize='sm'
								color='gray.500'>
								No products found for "{debouncedSearch}"
							</Text>
						</Box>
					) : null}
				</Box>
			)}
		</Box>
	);
};

export default SearchDropdown;
