'use client';

import {
	Badge,
	Box,
	Flex,
	Grid,
	HStack,
	IconButton,
	Image,
	Text,
	Skeleton,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import NavLink from '../reusable/NavLink';
import MobileNav from '../Navbar/MobileNav';
import Link from 'next/link';
import CustomContainer from '../reusable/Container';
import { useAppSelector } from '@/hooks';
import SearchDropdown from '../common/SearchDropdownFixed';
import { LuSearch, LuShoppingCart, LuUser, LuBell } from 'react-icons/lu';
import TopHeader from './TopHeader';
import AlarmLogo from './AlarmLogoComponent';
import { ShoppingBag } from 'lucide-react';
import { HiOutlineShoppingBag } from 'react-icons/hi';

type HeaderProps = {
	categoryData?: any[];
	isLoading?: boolean;
};

const Header: React.FC<HeaderProps> = ({ categoryData = [], isLoading }) => {
	const { loggedIn } = useAppSelector(state => state.auth);
	const [isHydrated, setIsHydrated] = useState(false);

	useEffect(() => {
		setIsHydrated(true);
	}, []);

	// Build parent categories
	const parents = categoryData
		.filter(
			cat =>
				!cat.parentCategory && cat.displayInMenu === true && cat.isActive === true && !cat.isDeleted
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
				childCategories: children.map(child => ({
					id: child.id,
					label: child.name,
					href: `/category/${child.id}`,
				})),
			};
		});

	const { cartItems } = useAppSelector(state => state.cart);
	const totalItems = cartItems.reduce((sum: number, it: any) => sum + (it.qty || 0), 0);

	const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

	const chunkArray = (arr: any[], size: number) => {
		const chunks = [] as any[];
		for (let i = 0; i < arr.length; i += size) {
			chunks.push(arr.slice(i, i + size));
		}
		return chunks;
	};

	return (
		<Box
			bg='white'
			borderBottom='1px solid'
			borderColor='gray.200'
			position='fixed'
			top={0}
			left={0}
			w='100%'
			zIndex={1000}>
			<Box display={{ base: 'none', md: 'block' }}>
				<TopHeader />
			</Box>

			<CustomContainer px={0} pt={0}>
				{/* Mobile, Medium, and Large Layout (base to lg) */}
				<Flex
					display={{ base: 'flex', xl: 'none' }}
					py={1.5}
					justify='space-between'
					align='center'
					w='100%'
					px={{ base: 1, md: 3, lg: 3, xl: 0 }}>
					{/* Left Side - Menu & Logo */}
					<Flex align='center' gap={{ base: 2, md: 3, lg: 4 }}>
						<Box display='flex' alignItems='center'>
							<MobileNav parentCategories={parents} />
						</Box>
						<Box display='flex' alignItems='center'>
							<Link href={'/'}>
								<AlarmLogo />
							</Link>
						</Box>
					</Flex>

					{/* Right Side - Icons */}
					<HStack gap={{ base: 0, md: 1 }} >
						<Link href={'/search'}>
							<IconButton
								variant='ghost'
								aria-label='Search'
								size={{ base: 'md', md: 'lg' }}
								fontSize={{ base: '20px', md: '22px' }}>
								<LuSearch />
							</IconButton>
						</Link>

						<Box position='relative'>
							<Link href={'/checkout'}>
								<IconButton
									variant='ghost'
									aria-label='Cart'
									size={{ base: 'md', md: 'lg' }}
									fontSize={{ base: '20px', md: '22px' }}>
									<HiOutlineShoppingBag />
								</IconButton>
							</Link>
							{totalItems > 0 && (
								<Badge
									bg='red.500'
									color='white'
									borderRadius='full'
									position='absolute'
									top={{ base: '-0', md: '-0' }}
									right={{ base: '-0', md: '-0' }}
									fontSize='xs'
									minW='20px'
									h='20px'
									display='flex'
									alignItems='center'
									justifyContent='center'>
									{totalItems}
								</Badge>
							)}
						</Box>

						{/* <IconButton
							variant='ghost'
							aria-label='Notifications'
							size={{ base: 'md', md: 'lg' }}
							fontSize={{ base: '20px', md: '22px' }}>
							<LuBell />
						</IconButton> */}

						<Link href={isHydrated && loggedIn ? '/user-profile' : '/login'}>
							<IconButton
								variant='ghost'
								aria-label='Account'
								size={{ base: 'md', md: 'lg' }}
								fontSize={{ base: '20px', md: '22px' }}>
								<LuUser />
							</IconButton>
						</Link>
					</HStack>
				</Flex>

				{/* Desktop Layout (xl and above) - Grid Layout */}
				<Grid
					display={{ base: 'none', xl: 'grid' }}
					templateColumns='1fr 2fr 1fr'
					py={3}
					alignItems='center'
					gap={4}
					w='100%'
					px={{ xl: 7, '2xl': 20 }}>
					{/* Left Side - Logo */}
					<Box justifySelf='start'>
						<Link href={'/'}>
							<AlarmLogo />
						</Link>
					</Box>

					{/* Middle - Desktop Categories Navigation */}
					<Flex justify='center' align='center'>
						{isLoading ? (
							<HStack gap={8}>
								{Array.from({ length: 7 }).map((_, idx) => (
									<Skeleton key={idx} height='20px' width='80px' borderRadius='md' />
								))}
							</HStack>
						) : (
							<HStack gap={8}>
								{parents?.slice(0, 7).map((item, idx) => (
									<Box
										key={item.id}
										position='relative'
										onMouseEnter={() => setHoveredCategory(item.id)}
										onMouseLeave={() => setHoveredCategory(null)}>
										<NavLink href={`/category/${item.id}`}>
											<Text 
												fontWeight='bold' 
												textTransform='uppercase'
												_hover={{ color: '#FF4444' }}
												transition='color 0.2s ease'>
												{item.name}
											</Text>
										</NavLink>

										{/* Invisible bridge to prevent gap */}
										<Box
											position='absolute'
											top='100%'
											left={0}
											width='220px'
											height='10px'
											bg='transparent'
											zIndex={98}
											display={hoveredCategory === item.id ? 'block' : 'none'}
										/>

										{/* Subcategories Dropdown */}
										{item?.childCategories?.length > 0 && (
											<Box
												position='absolute'
												top='calc(100% + 10px)'
												left={idx < 3 ? '0' : 'auto'}
												right={idx > 3 ? '0' : 'auto'}
												bg='white'
												overflow='hidden'
												boxShadow='md'
												borderRadius='md'
												zIndex={99}
												transition='opacity 0.2s ease'
												opacity={hoveredCategory === item.id ? 1 : 0}
												visibility={hoveredCategory === item.id ? 'visible' : 'hidden'}
												pointerEvents={hoveredCategory === item.id ? 'auto' : 'none'}>
												<Grid
													templateColumns={`repeat(${Math.ceil(
														(item.childCategories?.length || 0) / 5
													)}, 1fr) ${item.image ? '180px' : ''}`}>
													{chunkArray(item.childCategories || [], 5).map((chunk, colIdx) => (
														<Box key={colIdx}>
															{chunk?.map((sub: any) => (
																<Link key={sub.id} href={sub.href}>
																	<Text
																		w='180px'
																		px={6}
																		py={2}
																		fontSize='sm'
																		borderBottom='1px solid'
																		borderColor='gray.100'
																		_hover={{
																			bg: 'gray.50',
																			color: '#FF4444',
																		}}
																		transition='all 0.2s ease'
																		_last={{ borderBottom: 'none' }}>
																		{sub.label}
																	</Text>
																</Link>
															))}
														</Box>
													))}
													{item.image && (
														<Box w='180px' h='186px' overflow='hidden'>
															<Image
																src={item.image}
																alt={item.name}
																w='100%'
																h='100%'
																objectFit='cover'
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

					{/* Right Side - Search & Icons */}
					<HStack gap={2} justifySelf='end'>
						<SearchDropdown placeholder='Search products...' />

						<Box position='relative'>
							<Link href={'/checkout'}>
								<IconButton variant='ghost' aria-label='Cart' size='md'>
									<HiOutlineShoppingBag />
								</IconButton>
							</Link>
							{totalItems > 0 && (
								<Badge
									bg='red.500'
									color='white'
									borderRadius='full'
									position='absolute'
									top='-0'
									right='-0'
									fontSize='xs'
									minW='20px'
									h='20px'
									display='flex'
									alignItems='center'
									justifyContent='center'>
									{totalItems}
								</Badge>
							)}
						</Box>

						{/* <IconButton variant='ghost' aria-label='Notifications' size='md'>
							<LuBell />
						</IconButton> */}

						<Link href={isHydrated && loggedIn ? '/user-profile' : '/login'}>
							<IconButton variant='ghost' aria-label='Account' size='md'>
								<LuUser />
							</IconButton>
						</Link>
					</HStack>
				</Grid>
			</CustomContainer>
		</Box>
	);
};

export default Header;