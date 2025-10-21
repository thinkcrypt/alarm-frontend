'use client';
import React from 'react';
import {
	Box,
	Text,
	VStack,
	HStack,
	Grid,
	Badge,
	Image,
	Spinner,
	Flex,
	Separator,
} from '@chakra-ui/react';
import { Alert } from '@chakra-ui/react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Phone, Mail } from 'lucide-react';
import { useGetSingleOrderQuery } from '@/store/services/authApi';
import PageLayout from '../Layout/PageLayout';

type OrderDetailsComponentProps = {
	orderId: string;
};

const OrderDetailsComponent: React.FC<OrderDetailsComponentProps> = ({ orderId }) => {
	const { data: orderData, isLoading, error } = useGetSingleOrderQuery(orderId);

	if (isLoading) {
		return (
			<PageLayout>
				<Flex
					justify='center'
					align='center'
					py={20}>
					<VStack>
						<Spinner
							size='xl'
							color='blue.500'
						/>
						<Text
							color='gray.600'
							_dark={{ color: 'gray.400' }}>
							Loading order details...
						</Text>
					</VStack>
				</Flex>
			</PageLayout>
		);
	}

	if (error || !orderData) {
		return (
			<PageLayout>
				<Flex
					justify='center'
					align='center'
					py={20}>
					<VStack>
						<Alert.Root
							status='error'
							maxW='md'>
							<Alert.Indicator />
							<Alert.Content>
								<Alert.Title>Order not found!</Alert.Title>
								<Alert.Description>The order you're looking for doesn't exist.</Alert.Description>
							</Alert.Content>
						</Alert.Root>
						<Link href='/user-profile'>
							<Text
								color='blue.500'
								_hover={{ textDecoration: 'underline' }}>
								← Back to My Profile
							</Text>
						</Link>
					</VStack>
				</Flex>
			</PageLayout>
		);
	}

	const order = orderData;

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
		<PageLayout>
			<Box
				maxW='7xl'
				mx='auto'
				px={4}
				py={6}>
				{/* Header */}
				<VStack
					align='stretch'
					mb={6}>
					<Link href='/user-profile'>
						<HStack
							color='blue.500'
							cursor='pointer'
							_hover={{ textDecoration: 'underline' }}>
							<ArrowLeft size={20} />
							<Text>Back to My Profile</Text>
						</HStack>
					</Link>

					<Flex
						direction={{ base: 'column', sm: 'row' }}
						justify='space-between'
						align={{ base: 'start', sm: 'center' }}
						gap={4}>
						<VStack
							align='start'
							gap={1}>
							<Text
								fontSize='2xl'
								fontWeight='bold'
								color='gray.800'
								_dark={{ color: 'white' }}>
								Order Details
							</Text>
							<Text
								color='gray.600'
								_dark={{ color: 'gray.400' }}>
								Order ID: {order.invoice || order._id}
							</Text>
						</VStack>
						<Badge
							colorScheme={getStatusColor(order.status)}
							fontSize='sm'
							px={3}
							py={1}
							rounded='full'>
							{order.status.charAt(0).toUpperCase() + order.status.slice(1)}
						</Badge>
					</Flex>
				</VStack>

				<Grid
					templateColumns={{ base: '1fr', lg: '2fr 1fr' }}
					gap={6}>
					{/* Order Items */}
					<Box>
						<Box
							bg='white'
							border='1px'
							borderColor='gray.200'
							rounded='lg'
							shadow='sm'
							_dark={{ bg: 'gray.800', borderColor: 'gray.600' }}>
							<Box
								p={6}
								borderBottom='1px'
								borderColor='gray.200'
								_dark={{ borderColor: 'gray.600' }}>
								<HStack>
									<Box
										as='span'
										fontSize='lg'
										role='img'
										aria-label='shopping bag'>
										🛍️
									</Box>
									<Text
										fontSize='lg'
										fontWeight='semibold'
										color='gray.800'
										_dark={{ color: 'white' }}>
										Order Items
									</Text>
								</HStack>
							</Box>

							<Box p={6}>
								{order?.items && order?.items?.length > 0 ? (
									<VStack
										gap={4}
										align='stretch'>
										{order?.items?.map((item: any, index: number) => (
											<Box
												key={item.id || item._id || index}
												p={4}
												border='1px'
												borderColor='gray.200'
												rounded='lg'
												_dark={{ borderColor: 'gray.600' }}>
												<Flex
													gap={4}
													align='center'>
													<Image
														src={item?.image || '/placeholder-image.jpg'}
														alt={item?.name}
														boxSize='64px'
														objectFit='cover'
														border='1px'
														borderColor='gray.200'
														rounded='lg'
														_dark={{ borderColor: 'gray.600' }}
													/>
													<VStack
														align='start'
														flex='1'
														gap={1}>
														<Text
															fontSize='sm'
															fontWeight='medium'
															color='gray.800'
															_dark={{ color: 'white' }}
															lineClamp={2}>
															{item?.name}
														</Text>
														<Text
															fontSize='xs'
															color='gray.500'
															_dark={{ color: 'gray.400' }}>
															{item?.variantName || item?.variant || 'Default Variant'}
														</Text>
														<Text
															fontSize='xs'
															color='gray.500'
															_dark={{ color: 'gray.400' }}>
															Qty: {item?.qty || item?.quantity}
														</Text>
														<Text
															fontSize='xs'
															color='gray.500'
															_dark={{ color: 'gray.400' }}>
															Unit Price: ৳{' '}
															{parseFloat(item.unitPrice || item.price || 0).toFixed(2)}
														</Text>
													</VStack>
													<Text
														fontSize='sm'
														fontWeight='semibold'
														color='gray.800'
														_dark={{ color: 'white' }}>
														৳ {(item.unitPrice * item.qty).toFixed(2)}
													</Text>
												</Flex>
											</Box>
										))}
									</VStack>
								) : (
									<Text
										textAlign='center'
										py={8}
										color='gray.500'
										_dark={{ color: 'gray.400' }}>
										No items in this order
									</Text>
								)}
							</Box>
						</Box>
					</Box>

					{/* Order Summary & Details */}
					<VStack
						gap={6}
						align='stretch'>
						{/* Order Summary */}
						<Box
							bg='white'
							border='1px'
							borderColor='gray.200'
							rounded='lg'
							shadow='sm'
							_dark={{ bg: 'gray.800', borderColor: 'gray.600' }}>
							<Box
								p={6}
								borderBottom='1px'
								borderColor='gray.200'
								_dark={{ borderColor: 'gray.600' }}>
								<HStack>
									<Box
										as='span'
										fontSize='lg'
										role='img'
										aria-label='credit card'>
										💳
									</Box>
									<Text
										fontSize='lg'
										fontWeight='semibold'
										color='gray.800'
										_dark={{ color: 'white' }}>
										Order Summary
									</Text>
								</HStack>
							</Box>

							<VStack
								p={6}
								gap={3}
								align='stretch'>
								<Flex justify='space-between'>
									<Text
										fontSize='sm'
										color='gray.600'
										_dark={{ color: 'gray.400' }}>
										Subtotal
									</Text>
									<Text
										fontSize='sm'
										fontWeight='medium'
										color='gray.800'
										_dark={{ color: 'white' }}>
										৳ {parseFloat(order.subTotal || 0).toFixed(2)}
									</Text>
								</Flex>

								{order.discount > 0 && (
									<Flex justify='space-between'>
										<Text
											fontSize='sm'
											color='gray.600'
											_dark={{ color: 'gray.400' }}>
											Discount
										</Text>
										<Text
											fontSize='sm'
											fontWeight='medium'
											color='green.500'>
											- ৳ {parseFloat(order.discount || 0).toFixed(2)}
										</Text>
									</Flex>
								)}

								<Flex justify='space-between'>
									<Text
										fontSize='sm'
										color='gray.600'
										_dark={{ color: 'gray.400' }}>
										Shipping
									</Text>
									<Text
										fontSize='sm'
										fontWeight='medium'
										color='gray.800'
										_dark={{ color: 'white' }}>
										৳ {parseFloat(order.shippingCharge || 0).toFixed(2)}
									</Text>
								</Flex>

								<Flex justify='space-between'>
									<Text
										fontSize='sm'
										color='gray.600'
										_dark={{ color: 'gray.400' }}>
										VAT
									</Text>
									<Text
										fontSize='sm'
										fontWeight='medium'
										color='gray.800'
										_dark={{ color: 'white' }}>
										৳ {parseFloat(order.vat || 0).toFixed(2)}
									</Text>
								</Flex>

								<Separator />

								<Flex justify='space-between'>
									<Text
										fontSize='lg'
										fontWeight='semibold'
										color='gray.800'
										_dark={{ color: 'white' }}>
										Total
									</Text>
									<Text
										fontSize='lg'
										fontWeight='semibold'
										color='gray.800'
										_dark={{ color: 'white' }}>
										৳ {parseFloat(order.total || 0).toFixed(2)}
									</Text>
								</Flex>

								<Separator />

								<VStack
									gap={2}
									align='stretch'>
									<Flex justify='space-between'>
										<Text
											fontSize='sm'
											color='gray.600'
											_dark={{ color: 'gray.400' }}>
											Paid Amount
										</Text>
										<Text
											fontSize='sm'
											fontWeight='medium'
											color={order.paidAmount > 0 ? 'green.500' : 'gray.500'}>
											৳ {parseFloat(order.paidAmount || 0).toFixed(2)}
										</Text>
									</Flex>

									{order.dueAmount > 0 && (
										<Flex justify='space-between'>
											<Text
												fontSize='sm'
												color='gray.600'
												_dark={{ color: 'gray.400' }}>
												Due Amount
											</Text>
											<Text
												fontSize='sm'
												fontWeight='medium'
												color='red.500'>
												৳ {parseFloat(order.dueAmount || 0).toFixed(2)}
											</Text>
										</Flex>
									)}
								</VStack>
							</VStack>
						</Box>

						{/* Order Information */}
						<Box
							bg='white'
							border='1px'
							borderColor='gray.200'
							rounded='lg'
							shadow='sm'
							_dark={{ bg: 'gray.800', borderColor: 'gray.600' }}>
							<Box
								p={6}
								borderBottom='1px'
								borderColor='gray.200'
								_dark={{ borderColor: 'gray.600' }}>
								<HStack>
									<Calendar size={20} />
									<Text
										fontSize='lg'
										fontWeight='semibold'
										color='gray.800'
										_dark={{ color: 'white' }}>
										Order Information
									</Text>
								</HStack>
							</Box>

							<VStack
								p={6}
								gap={4}
								align='stretch'>
								<Box>
									<Text
										fontSize='sm'
										color='gray.600'
										_dark={{ color: 'gray.400' }}>
										Order Date
									</Text>
									<Text
										fontWeight='medium'
										color='gray.800'
										_dark={{ color: 'white' }}>
										{new Date(order.orderDate || order.createdAt).toLocaleDateString('en-US', {
											year: 'numeric',
											month: 'long',
											day: 'numeric',
											hour: '2-digit',
											minute: '2-digit',
										})}
									</Text>
								</Box>

								<Box>
									<Text
										fontSize='sm'
										color='gray.600'
										_dark={{ color: 'gray.400' }}>
										Payment Status
									</Text>
									<Text
										fontWeight='medium'
										color={order.isPaid ? 'green.500' : 'red.500'}>
										{order.isPaid ? 'Paid' : 'Unpaid'}
									</Text>
								</Box>

								<Box>
									<Text
										fontSize='sm'
										color='gray.600'
										_dark={{ color: 'gray.400' }}>
										Delivery Status
									</Text>
									<Text
										fontWeight='medium'
										color={order.isDelivered ? 'green.500' : 'yellow.500'}>
										{order.isDelivered ? 'Delivered' : 'Pending'}
									</Text>
								</Box>

								{order.note && (
									<Box>
										<Text
											fontSize='sm'
											color='gray.600'
											_dark={{ color: 'gray.400' }}>
											Order Note
										</Text>
										<Text
											fontWeight='medium'
											whiteSpace='pre-line'
											color='gray.800'
											_dark={{ color: 'white' }}>
											{order.note}
										</Text>
									</Box>
								)}
							</VStack>
						</Box>

						{/* Customer Information */}
						{order?.address && (
							<Box
								bg='white'
								border='1px'
								borderColor='gray.200'
								rounded='lg'
								shadow='sm'
								_dark={{ bg: 'gray.800', borderColor: 'gray.600' }}>
								<Box
									p={6}
									borderBottom='1px'
									borderColor='gray.200'
									_dark={{ borderColor: 'gray.600' }}>
									<HStack>
										<Box
											as='span'
											fontSize='lg'
											role='img'
											aria-label='address book'>
											📇
										</Box>
										<Text
											fontSize='lg'
											fontWeight='semibold'
											color='gray.800'
											_dark={{ color: 'white' }}>
											Customer Information
										</Text>
									</HStack>
								</Box>

								<VStack
									p={6}
									gap={4}
									align='stretch'>
									{order?.address?.name && (
										<Box>
											<Text
												fontSize='sm'
												color='gray.600'
												_dark={{ color: 'gray.400' }}>
												Name
											</Text>
											<Text
												fontWeight='medium'
												color='gray.800'
												_dark={{ color: 'white' }}>
												{order?.address?.name}
											</Text>
										</Box>
									)}

									{order?.address?.email && (
										<HStack align='start'>
											<Mail
												size={16}
												color='gray'
												style={{ marginTop: '4px' }}
											/>
											<Box>
												<Text
													fontSize='sm'
													color='gray.600'
													_dark={{ color: 'gray.400' }}>
													Email
												</Text>
												<Text
													fontWeight='medium'
													color='gray.800'
													_dark={{ color: 'white' }}>
													{order?.address?.email}
												</Text>
											</Box>
										</HStack>
									)}

									{order?.address?.phone && (
										<HStack align='start'>
											<Phone
												size={16}
												color='gray'
												style={{ marginTop: '4px' }}
											/>
											<Box>
												<Text
													fontSize='sm'
													color='gray.600'
													_dark={{ color: 'gray.400' }}>
													Phone
												</Text>
												<Text
													fontWeight='medium'
													color='gray.800'
													_dark={{ color: 'white' }}>
													{order?.address?.phone}
												</Text>
											</Box>
										</HStack>
									)}

									{order?.address?.address && (
										<Box>
											<Text
												fontSize='sm'
												color='gray.600'
												_dark={{ color: 'gray.400' }}>
												Address
											</Text>
											<Text
												fontWeight='medium'
												color='gray.800'
												_dark={{ color: 'white' }}>
												{typeof order.address === 'string'
													? order?.address
													: `${order?.address?.address || ''}, ${order?.address?.city || ''}, ${
															order?.address?.state || ''
													  } ${order.address.zipCode || ''}`.trim()}
											</Text>
										</Box>
									)}
								</VStack>
							</Box>
						)}
					</VStack>
				</Grid>
			</Box>
		</PageLayout>
	);
};

export default OrderDetailsComponent;
