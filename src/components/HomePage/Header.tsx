'use client'; // Add this at the top if not already present

import {
	Badge,
	Box,
	Flex,
	Grid,
	HStack,
	IconButton,
	Image,
	Input,
	Text,
	Skeleton,
	SkeletonText,
	Center,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react'; // Add useEffect
import NavLink from '../reusable/NavLink';
import MobileNav from '../Navbar/MobileNav';
import Link from 'next/link';
import CustomContainer from '../reusable/Container';
import { useAppSelector } from '@/hooks';
import SearchDropdown from '../common/SearchDropdownFixed';
import { LuSearch, LuShoppingCart, LuUser } from 'react-icons/lu';

type HeaderProps = {
	categoryData?: any[];
	isLoading?: boolean;
};

const Header: React.FC<HeaderProps> = ({ categoryData = [], isLoading }) => {
	const { loggedIn } = useAppSelector(state => state.auth);
	const [isHydrated, setIsHydrated] = useState(false); // Add this

	// Add this useEffect
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
			<CustomContainer
				px={0}
				pt={0}>
				<Flex
					py={3}
					justify='space-between'
					align='center'
					gap={{ base: 2, md: 4 }}
					w='100%'
					px={{ base: 4, md: 7, lg: '32px', '2xl': '84px' }}>
					<Flex display={{ base: 'block', md: 'none' }}>
						<MobileNav parentCategories={parents} />

						<Link href={'/search'}>
							<IconButton
								variant='ghost'
								aria-label='Account'
								size='md'>
								<LuSearch />
							</IconButton>
						</Link>
					</Flex>

					{/* Logo */}
					<Link href={'/'}>
						<Image
							src='/ddong-logo.png'
							alt='DDONG'
							h='40px'
							flexShrink={0}
						/>
					</Link>

					{/* Search Bar */}
					<Box display={{ base: 'none', lg: 'block' }}>
						<SearchDropdown placeholder='Search products...' />
					</Box>

					{/* Icons */}
					<HStack>
						{/* UPDATED CODE - Always render login link initially */}
						<Link href={isHydrated && loggedIn ? '/user-profile' : '/login'}>
							<IconButton
								variant='ghost'
								aria-label='Account'
								size='md'>
								<LuUser />
							</IconButton>
						</Link>

						{/* <IconButton variant='ghost' aria-label='Notifications' size='sm'>
							<LuBell />
						</IconButton> */}
						<Box position='relative'>
							<Link href={'/checkout'}>
								<IconButton
									variant='ghost'
									aria-label='Cart'
									size='md'>
									<LuShoppingCart />
								</IconButton>
							</Link>
							{totalItems > 0 && (
								<Badge
									bg='red.500'
									color='white'
									borderRadius='full'
									position='absolute'
									top='-1'
									right='-1'
									fontSize='xs'
									minW='22px'
									h='22px'
									display='flex'
									alignItems='center'
									justifyContent='center'>
									{totalItems}
								</Badge>
							)}
						</Box>
					</HStack>
				</Flex>

				<Box
					border={'0.5px solid'}
					borderColor={'#e8e8e8'}
					mt={0}
					display={{ base: 'none', md: 'block' }}></Box>

				{isLoading ? (
					<Center
						display={{ base: 'none', md: 'flex' }}
						h='40px'>
						<HStack gap={8}>
							{Array.from({ length: 7 }).map((_, idx) => (
								<Skeleton
									key={idx}
									height='20px'
									width='80px'
									borderRadius='md'
								/>
							))}
						</HStack>
					</Center>
				) : (
					<Center
						display={{ base: 'none', md: 'flex' }}
						h='40px'>
						<HStack gap={8}>
							{parents?.slice(0, 7).map((item, idx) => (
								<Box
									key={item.id}
									position='relative'
									onMouseEnter={() => setHoveredCategory(item.id)}
									onMouseLeave={() => setHoveredCategory(null)}>
									<NavLink href={`/category/${item.id}`}>{item.name}</NavLink>

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

									<Box
										position='absolute'
										top='calc(100% + 10px)'
										left={(idx < 3 && '0') || 'auto'}
										right={(idx > 3 && '0') || 'auto'}
										bg='white'
										overflow={'hidden'}
										boxShadow='md'
										borderRadius='md'
										zIndex={99}
										transition='opacity 0.2s ease'
										opacity={hoveredCategory === item.id ? 1 : 0}
										visibility={hoveredCategory === item.id ? 'visible' : 'hidden'}
										pointerEvents={hoveredCategory === item.id ? 'auto' : 'none'}>
										{item?.childCategories?.length > 0 && (
											<Grid
												templateColumns={`repeat(${Math.ceil(
													(item.childCategories?.length || 0) / 5
												)}, 1fr) 180px`}>
												{chunkArray(item.childCategories || [], 5).map((chunk, colIdx) => (
													<Box key={colIdx}>
														{chunk?.map((sub: any) => (
															<Link
																key={sub.id}
																href={sub.href}>
																<Text
																	w='180px'
																	px={6}
																	py={2}
																	fontSize='sm'
																	borderBottom='1px solid'
																	borderColor='gray.100'
																	_hover={{
																		bg: 'gray.50',
																		color: 'blue.500',
																	}}
																	_last={{ borderBottom: 'none' }}>
																	{sub.label}
																</Text>
															</Link>
														))}
													</Box>
												))}
												{item.image && (
													<Image
														src={item.image}
														alt={item.name}
														w='100%'
														h='186px'
														objectFit='cover'
													/>
												)}
											</Grid>
										)}
									</Box>
								</Box>
							))}
						</HStack>
					</Center>
				)}
			</CustomContainer>
		</Box>
	);
};

export default Header;
