'use client';
import React, { FC, useMemo } from 'react';
import {
	Box,
	Button,
	HStack,
	Heading,
	Text,
	VStack,
	useDisclosure,
	useBreakpointValue,
	Badge,
	Table,
} from '@chakra-ui/react';

const BulkDiscountModal: FC<{ product: any }> = ({ product }) => {
	const { open: isOpen, onOpen, onClose } = useDisclosure();
	const isMobile = useBreakpointValue({ base: true, md: false });

	const tiers = useMemo(() => {
		const list = product?.bulkDiscounts || [];
		return list;
	}, [product?.bulkDiscounts]);

	if (!tiers.length) return null;

	return (
		<>
			<Button
				variant='ghost'
				size='sm'
				onClick={onOpen}
				textDecoration='underline'
				color='blue.500'
				p={0}
				h='auto'
				minH='auto'
				_hover={{ bg: 'transparent', color: 'blue.600' }}
			>
				View Bulk Discounts
			</Button>

			{isOpen && (
				<Box
					position='fixed'
					top='0'
					left='0'
					w='100vw'
					h='100vh'
					bg='blackAlpha.600'
					display='flex'
					alignItems='center'
					justifyContent='center'
					zIndex={1000}
					onClick={onClose}
				>
					<Box
						bg='white'
						borderRadius='lg'
						maxW={{ base: '95vw', md: '520px' }}
						maxH='90vh'
						w='100%'
						p={{ base: 4, md: 6 }}
						overflowY='auto'
						onClick={e => e.stopPropagation()}
					>
						{/* Header */}
						<HStack justify='space-between' mb={4}>
							<Heading size='md'>Bulk Discounts</Heading>
							<Button variant='ghost' size='sm' onClick={onClose}>
								✕
							</Button>
						</HStack>

						<VStack align='stretch' gap={4}>
							<Text fontSize='sm' color='gray.600'>
								Buy more, save more. Unit price updates automatically by
								quantity.
							</Text>

							{/* Mobile: stacked cards */}
							{isMobile ? (
								<VStack align='stretch' gap={3}>
									{tiers?.map((tier: any, i: number) => (
										<Box
											key={tier.minQuantity}
											borderWidth='1px'
											borderColor='gray.200'
											borderRadius='md'
											p={3}
										>
											<HStack justify='space-between'>
												<Text fontWeight='semibold'>
													Min Qty: {tier.minQuantity}+
												</Text>
												<Badge colorScheme='green' fontSize='0.8em'>
													৳ {tier.price} / unit
												</Badge>
											</HStack>
										</Box>
									))}
								</VStack>
							) : (
								<Box
									borderWidth='1px'
									borderColor='gray.200'
									borderRadius='md'
									overflowX='auto'
								>
									<Table.Root size='sm' variant='line'>
										<Table.Header bg='gray.50'>
											<Table.Row>
												<Table.ColumnHeader>Min Quantity</Table.ColumnHeader>
												<Table.ColumnHeader textAlign='end'>
													Unit Price
												</Table.ColumnHeader>
											</Table.Row>
										</Table.Header>

										<Table.Body>
											{tiers?.map((tier: any, i: number) => {
												const nextMin = tiers[i + 1]?.minQuantity;
												return (
													<Table.Row key={tier.minQuantity}>
														<Table.Cell fontWeight='medium'>
															{tier.minQuantity}+
														</Table.Cell>
														<Table.Cell textAlign='end' fontWeight='bold'>
															৳ {tier.price}
														</Table.Cell>
													</Table.Row>
												);
											})}
										</Table.Body>
									</Table.Root>
								</Box>
							)}

							{/* Footer */}
							<HStack justify='flex-end'>
								<Button colorScheme='blue' onClick={onClose}>
									Got it!
								</Button>
							</HStack>
						</VStack>
					</Box>
				</Box>
			)}
		</>
	);
};

export default BulkDiscountModal;
