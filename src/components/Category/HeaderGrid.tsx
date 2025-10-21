'use client';
import { Button, Flex, Grid, Menu, Text } from '@chakra-ui/react';
import React, { FC } from 'react';
import { FaSortDown, FaFilter } from 'react-icons/fa';

type HeaderGridProps = {
	categoryName?: any;
	value?: string;
	onChange?: any;
	onFilterClick?: () => void;
	onSortChange?: any;
};

const HeaderGrid: FC<HeaderGridProps> = ({ categoryName, onFilterClick, onSortChange }) => {
	return (
		<>
			{/* Desktop Layout */}
			<Grid
				pt={4}
				templateColumns={{ base: 'none', md: '300px 1fr' }}
				gap={4}
				display={{ base: 'none', md: 'grid' }}>
				<Flex
					bg={'white'}
					px={4}
					py={2}
					borderRadius={'md'}
					alignItems={'center'}>
					<Text fontWeight={600}>Filter</Text>
				</Flex>

				<Flex
					bg={'white'}
					px={4}
					py={2}
					borderRadius={'md'}
					direction='column'
					gap={4}>
					<Flex
						justify='space-between'
						align='center'
						flexWrap='wrap'
						gap={2}>
						<Text fontWeight={600}>{categoryName}</Text>
						<Menu.Root>
							<Menu.Trigger asChild>
								<Button
									variant='outline'
									size='sm'>
									Sort By {<FaSortDown />}
								</Button>
							</Menu.Trigger>
							<Menu.Positioner>
								<Menu.Content>
									<Menu.Item value='low-high' onSelect={() => onSortChange?.('low-high')}>Price: Low to High</Menu.Item>
									<Menu.Item value="high-low" onSelect={() => onSortChange?.('high-low')}>Price: High to Low</Menu.Item>
									<Menu.Item value="a-z" onSelect={() => onSortChange?.('a-z')}>Name: A - Z</Menu.Item>
									<Menu.Item value="z-a" onSelect={() => onSortChange?.('z-a')}>Name: Z - A</Menu.Item>
								</Menu.Content>
							</Menu.Positioner>
						</Menu.Root>
					</Flex>
				</Flex>
			</Grid>

			{/* Mobile Layout */}
			<Flex
				pt={4}
				justify='space-between'
				align='center'
				gap={3}
				display={{ base: 'flex', md: 'none' }}
				px={1}>
				{/* Left side - Filter and Category */}
				<Flex
					align='center'
					gap={3}
					flex='1'>
					<Button
						size='sm'
						bg='gray.100'
						color='gray.700'
						_hover={{ bg: 'gray.200' }}
						onClick={onFilterClick}
						px={3}
						py={2}
						h='auto'
						fontWeight={500}
						display='flex'
						alignItems='center'
						gap={2}>
						<FaFilter />
						Filter
					</Button>

					<Text
						fontSize='sm'
						fontWeight={600}
						border='1px solid'
						borderColor='gray.300'
						px={3}
						py={2}
						borderRadius='md'
						bg='white'
						flex='1'
						whiteSpace='nowrap'
						overflow='hidden'
						textOverflow='ellipsis'>
						{categoryName}
					</Text>
				</Flex>

				{/* Right side - Sort */}
				<Menu.Root>
					<Menu.Trigger asChild>
						<Button
							variant='outline'
							size='sm'
							flexShrink={0}
							bg='gray.100'
							color='gray.700'
							_hover={{ bg: 'gray.200' }}
							px={3}
							py={2}
							h='auto'
							fontWeight={500}
							display='flex'
							alignItems='center'
							gap={2}>
							Sort {<FaSortDown />}
						</Button>
					</Menu.Trigger>
					<Menu.Positioner>
						<Menu.Content>
							<Menu.Item value='low-high'>Price: Low to High</Menu.Item>
							<Menu.Item value='high-low'>Price: High to Low</Menu.Item>
							<Menu.Item value='a-z'>Name: A - Z</Menu.Item>
							<Menu.Item value='z-a'>Name: Z - A</Menu.Item>
						</Menu.Content>
					</Menu.Positioner>
				</Menu.Root>
			</Flex>
		</>
	);
};

export default HeaderGrid;
