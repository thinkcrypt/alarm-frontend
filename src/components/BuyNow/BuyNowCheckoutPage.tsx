'use client';
import { useState, useEffect } from 'react';
import { Container, Grid } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import PageLayout from '../Layout/PageLayout';
import CheckoutSteps from '../Checkout/CheckoutSteps';
import OrderSummary from '../Checkout/OrderSummary';
import Coupon from '../reusable/Coupon';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useGetSelfQuery } from '@/store/services/authApi';
import { deleteAllFromCart } from '@/store/slices/cartSlice';
import { toaster } from '../ui/toaster';
import { usePostMutation } from '@/store/services/commonApi';
import BillingForm from '../Checkout/BillingForm';

interface FormData {
	name: string;
	email: string;
	phone: string;
	address: string;
	note: string;
}

const getErrorMessage = (error: FetchBaseQueryError | SerializedError): string => {
	if ('status' in error) {
		const fetchError = error as FetchBaseQueryError;
		if (fetchError.data && typeof fetchError.data === 'object' && 'message' in fetchError.data) {
			return (fetchError.data as any).message;
		}
		if (fetchError.data && typeof fetchError.data === 'object' && 'error' in fetchError.data) {
			return (fetchError.data as any).error;
		}
		return `Error ${fetchError.status}: Something went wrong`;
	} else {
		return error.message || 'Something went wrong. Please try again.';
	}
};

const CheckoutPageComponent = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const { loggedIn } = useAppSelector(state => state.auth);

	// Only fetch user data if logged in
	const { data: selfData } = useGetSelfQuery<any>(undefined, {
		skip: !loggedIn,
	});

	const [formData, setFormData] = useState<FormData>({
		name: '',
		email: '',
		phone: '',
		address: '',
		note: '',
	});

	// Auto-fill form data when selfData is available (for logged-in users)
	useEffect(() => {
		if (loggedIn && selfData) {
			setFormData(prev => ({
				...prev,
				name: selfData.name || '',
				email: selfData.email || '',
				phone: selfData.phone || '',
				address: selfData.address || prev.address,
			}));
		}
	}, [selfData, loggedIn]);

	const { cartItems } = useAppSelector(state => state.cart);
	const [trigger, result] = usePostMutation();

	const subtotal = cartItems.reduce(
		(acc: any, item: any) => acc + (item.unitPrice ? item.unitPrice * item.qty : item.price),
		0
	);

	const handleFormChange = (field: string, value: string) => {
		setFormData(prev => ({ ...prev, [field]: value }));
	};

	const handleConfirmOrder = async () => {
		try {
			if (cartItems.length === 0) {
				toaster.create({
					title: 'Empty Cart',
					description: 'Please add items to your cart before placing an order.',
					type: 'error',
				});
				return;
			}

			const { name, email, phone, address } = formData;
			if (
				!name.trim() ||
				!email.trim() ||
				!email.includes('@') ||
				!phone.trim() ||
				phone.length < 10 ||
				!address.trim()
			) {
				toaster.create({
					title: 'Invalid Details',
					description: 'Please fill in all required fields correctly.',
					type: 'error',
				});
				return;
			}

			const orderBody = {
				...formData,
				customer: loggedIn ? selfData?._id : null, // Set customer ID only if logged in
				items: cartItems,
				total: subtotal,
				orderDate: new Date().toISOString(),
				status: 'pending',
			};

			await trigger({ path: 'orders', body: orderBody });
		} catch (error) {
			console.error('Order placement error:', error);
			toaster.create({
				title: 'Order Failed',
				description: 'Something went wrong. Please try again.',
				type: 'error',
			});
		}
	};

	useEffect(() => {
		if (result.isSuccess) {
			toaster.create({
				title: 'Order Confirmed!',
				description: 'Thank you for your order. A confirmation email is on its way.',
				type: 'success',
				duration: 5000,
			});

			dispatch(deleteAllFromCart());

			const orderId = (result.data as any)?._id || 'unknown';
			router.push(`/order-success/${orderId}`);
		}
	}, [result.isSuccess, dispatch, router, result.data]);

	useEffect(() => {
		if (result.isError && result.error) {
			toaster.create({
				title: 'Order Failed',
				description: getErrorMessage(result.error),
				type: 'error',
			});
		}
	}, [result.isError, result.error]);

	return (
		<PageLayout>
			<Container py={10}>
				<CheckoutSteps currentStep={1} />
				<Grid
					templateColumns={{ base: '1fr', lg: '2fr 1fr' }}
					gap={8}
					alignItems='start'>
					<BillingForm
						formData={formData}
						onChange={handleFormChange}
					/>
					<OrderSummary
						formData={formData}
						onConfirmOrder={handleConfirmOrder}
						isProcessingOrder={result.isLoading}
						isCartPage={false}
						requireTerms={true}
					/>
				</Grid>
				<Coupon />
			</Container>
		</PageLayout>
	);
};

export default CheckoutPageComponent;
