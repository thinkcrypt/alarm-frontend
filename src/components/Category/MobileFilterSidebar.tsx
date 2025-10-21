'use client';
import {
	Box,
	Button,
	Flex,
	Text,
	Checkbox,
	RadioGroup,
	Drawer,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { FaTimes } from 'react-icons/fa';
import CategoryFilterScrollContainer from '../reusable/CategoryFilterScrollContainer';
import CategoryFilterSectionContainer from '../reusable/CategoryFilterSectionContainer';

type MobileFilterSidebarProps = {
	isOpen: boolean;
	onClose: () => void;
	categories: any;
	colors?: any;
	sizes?: any;
	priceRanges?: any;
};

const MobileFilterSidebar: FC<MobileFilterSidebarProps> = ({
	isOpen,
	onClose,
	categories,
	colors,
	sizes,
	priceRanges,
}) => {
	return (
		<Drawer.Root open={isOpen} onOpenChange={onClose} placement='start'>
			<Drawer.Backdrop />
			<Drawer.Positioner>
				<Drawer.Content>
					{/* Header */}
					<Flex
						justify='space-between'
						align='center'
						p={4}
						borderBottom='1px solid'
						borderColor='gray.200'
						bg='white'
					>
						<Text fontSize='lg' fontWeight={600}>
							Filters
						</Text>
						<Button
							variant='ghost'
							size='sm'
							onClick={onClose}
							p={2}
							minW='auto'
						>
							<FaTimes />
						</Button>
					</Flex>

					{/* Filter Content */}
					<Box p={4} overflowY='auto' flex='1'>
						<Flex direction='column' gap={6}>
							{/* Categories */}
							<CategoryFilterSectionContainer>
								<Text fontWeight={600} mb={3}>
									Categories
								</Text>
								<CategoryFilterScrollContainer>
									{categories?.map((item: any, index: number) => (
										<Checkbox.Root key={index} pl={2}>
											<Checkbox.HiddenInput />
											<Checkbox.Control />
											<Checkbox.Label>{item?.name ?? item}</Checkbox.Label>
										</Checkbox.Root>
									))}
								</CategoryFilterScrollContainer>
							</CategoryFilterSectionContainer>

							{/* Colors */}
							<CategoryFilterSectionContainer>
								<Text fontWeight={600} mb={3}>
									Colors
								</Text>
								<CategoryFilterScrollContainer>
									{colors?.map((item: any, index: number) => (
										<Checkbox.Root key={index} pl={2}>
											<Checkbox.HiddenInput />
											<Checkbox.Control />
											<Checkbox.Label>{item}</Checkbox.Label>
										</Checkbox.Root>
									))}
								</CategoryFilterScrollContainer>
							</CategoryFilterSectionContainer>

							{/* Sizes */}
							<CategoryFilterSectionContainer>
								<Text fontWeight={600} mb={3}>
									Sizes
								</Text>
								<CategoryFilterScrollContainer>
									{sizes?.map((item: any, index: number) => (
										<Checkbox.Root key={index} pl={2}>
											<Checkbox.HiddenInput />
											<Checkbox.Control />
											<Checkbox.Label>{item}</Checkbox.Label>
										</Checkbox.Root>
									))}
								</CategoryFilterScrollContainer>
							</CategoryFilterSectionContainer>

							{/* Price Range */}
							<CategoryFilterSectionContainer>
								<Text fontWeight={600} mb={3}>
									Price Range
								</Text>
								<CategoryFilterScrollContainer>
									<RadioGroup.Root
										style={{
											display: 'flex',
											flexDirection: 'column',
											gap: '8px',
										}}
									>
										{priceRanges?.map((item: any, index: number) => (
											<RadioGroup.Item
												key={index}
												value={`${item.min}-${item.max}`}
												pl={2}
											>
												<RadioGroup.ItemHiddenInput />
												<RadioGroup.ItemIndicator />
												<RadioGroup.ItemText>
													{item.min.toFixed(2)} to {item.max.toFixed(2)}
												</RadioGroup.ItemText>
											</RadioGroup.Item>
										))}
									</RadioGroup.Root>
								</CategoryFilterScrollContainer>
							</CategoryFilterSectionContainer>
						</Flex>
					</Box>

					{/* Footer Actions */}
					{/* <Flex
						p={4}
						gap={3}
						borderTop='1px solid'
						borderColor='gray.200'
						bg='white'
					>
						<Button variant='outline' flex='1'>
							Clear All
						</Button>
						<Button colorScheme='blue' flex='1' onClick={onClose}>
							Apply Filters
						</Button>
					</Flex> */}
				</Drawer.Content>
			</Drawer.Positioner>
		</Drawer.Root>
	);
};

export default MobileFilterSidebar;
