'use client';
import React from 'react';
import { VStack, Text, Spinner, Box, Grid } from '@chakra-ui/react';
import { Alert } from '@chakra-ui/react';
import { useGetMyOrdersQuery } from '@/store/services/authApi';
import OrderCard from './OrderCard';

const OrdersContent: React.FC = () => {
	const { data, isFetching } = useGetMyOrdersQuery({});

	if (isFetching) {
		return (
			<VStack
				w='full'
				py={10}
				gap={4}>
				<Spinner
					size='lg'
					color='blue.500'
				/>
				<Text
					color='gray.600'
					_dark={{ color: 'gray.400' }}>
					Loading your orders...
				</Text>
			</VStack>
		);
	}

	return (
		<Box
			w='full'
			p={{ base: 2, md: 4 }}>
			{data?.totalDocs > 0 ? (
				<Grid
					templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
					gap={4}
					w='full'>
					{data?.doc?.map((order: any) => (
						<OrderCard
							key={order._id}
							order={order}
						/>
					))}
				</Grid>
			) : (
				<Alert.Root
					status='warning'
					bg='yellow.50'
					border='1px'
					borderColor='yellow.200'
					rounded='md'
					_dark={{
						bg: 'yellow.900',
						borderColor: 'yellow.600',
					}}>
					<Alert.Indicator
						color='yellow.600'
						_dark={{ color: 'yellow.400' }}
					/>
					<Alert.Content>
						<Alert.Title
							fontWeight='medium'
							color='yellow.800'
							_dark={{ color: 'yellow.200' }}>
							No order has been made yet.
						</Alert.Title>
						<Alert.Description
							fontSize='sm'
							color='yellow.700'
							_dark={{ color: 'yellow.300' }}
							mt={1}>
							<Text
								as='span'
								textDecoration='underline'
								cursor='pointer'>
								Browse Products
							</Text>{' '}
							to start shopping.
						</Alert.Description>
					</Alert.Content>
				</Alert.Root>
			)}
		</Box>
	);
};

export default OrdersContent;
