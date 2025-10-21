'use client';
import React from 'react';
import { Box, Text, Badge, VStack, HStack, Flex } from '@chakra-ui/react';
import Link from 'next/link';

interface OrderCardProps {
	order: {
		_id: string;
		orderId: string;
		status: string;
		orderDate: string;
		total: number;
		invoice: string;
	};
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
	const getStatusColor = (status: string) => {
		switch (status) {
			case 'pending':
				return 'yellow';
			case 'delivered':
				return 'green';
			case 'cancelled':
				return 'red';
			case 'processing':
				return 'blue';
			default:
				return 'gray';
		}
	};

	return (
		<Link
			href={`/orders/${order._id}`}
			passHref>
			<Box
				display='block'
				p={{ base: 3, md: 4 }}
				bg='white'
				border='1px'
				borderColor='gray.200'
				rounded='md'
				shadow='sm'
				cursor='pointer'
				transition='shadow 0.2s'
				_hover={{ shadow: 'md' }}
				_dark={{
					bg: 'gray.800',
					borderColor: 'gray.600',
				}}>
				<Flex
					justify='space-between'
					align='center'
					mb={3}>
					<Text
						fontSize='lg'
						fontWeight='semibold'
						color='gray.800'
						_dark={{ color: 'white' }}>
						{order?.invoice}
					</Text>
					<Badge
						colorScheme={getStatusColor(order?.status)}
						fontSize='xs'
						px={2}
						py={1}
						rounded='full'>
						{/* comment */}
						{order?.status?.charAt(0)?.toUpperCase() + order.status.slice(1)}
					</Badge>
				</Flex>

				<VStack
					align='stretch'
					gap={2}>
					<Box>
						<Text
							fontSize='sm'
							color='gray.600'
							_dark={{ color: 'gray.400' }}>
							<Text
								as='span'
								fontWeight='medium'>
								Order Date:
							</Text>{' '}
							{new Date(order.orderDate).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'short',
								day: 'numeric',
							})}
						</Text>
					</Box>

					<Box
						pt={2}
						borderTop='1px'
						borderColor='gray.200'
						_dark={{ borderColor: 'gray.600' }}>
						<Text
							fontSize='lg'
							fontWeight='semibold'
							color='gray.800'
							_dark={{ color: 'white' }}>
							৳ {Number(order.total || 0).toFixed(2)}
						</Text>
						<Text
							fontSize='xs'
							color='gray.500'
							_dark={{ color: 'gray.400' }}>
							Total Amount
						</Text>
					</Box>
				</VStack>
			</Box>
		</Link>
	);
};

export default OrderCard;
