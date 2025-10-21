'use client';
import { useState, useEffect } from 'react';
import { Container, Grid } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import PageLayout from '../Layout/PageLayout';
import CheckoutSteps from './CheckoutSteps';
import OrderSummary from './OrderSummary';
import BillingForm from './BillingForm';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useGetSelfQuery } from '@/store/services/authApi';
import { deleteAllFromCart } from '@/store/slices/cartSlice';
import { toaster } from '../ui/toaster';
import { usePostMutation } from '@/store/services/commonApi';
import validateBangladeshiPhone from './validateBangladeshiPhone';

const CheckoutPageComponent = ({ type = 'cart' }: { type: 'cart' | 'buyNow' }) => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { loggedIn } = useAppSelector(state => state.auth);

	// Only fetch user data if logged in
	const { data: selfData } = useGetSelfQuery<any>(undefined, {
		skip: !loggedIn,
	});

	const [formData, setFormData] = useState<any>({
		name: '',
		email: '',
		phone: '',
		address: '',
		note: '',
		discount: 0,
		coupon: '',
		shipping: 'inside',
	});

	// Auto-fill form data when selfData is available (for logged-in users)
	useEffect(() => {
		if (selfData) {
			setFormData((prev: any) => ({
				...prev,
				name: selfData.name || '',
				email: selfData.email || '',
				phone: selfData.phone || '',
				address: selfData.address || prev.address,
			}));
		}
	}, [selfData]);

	const { cartItems } = useAppSelector(state => (type === 'cart' ? state.cart : state.buyNow));
	const [trigger, result] = usePostMutation();

	const subtotal = cartItems.reduce(
		(acc: any, item: any) => acc + (item.unitPrice ? item.unitPrice * item.qty : item.price),
		0
	);

	const handleFormChange = (field: string, value: string) => {
		setFormData((prev: any) => ({ ...prev, [field]: value }));
	};

	const handleConfirmOrder = async (e: any) => {
		e.preventDefault();

		if (cartItems.length === 0) {
			toaster.create({
				title: 'Empty Cart',
				description: 'Please add items to your cart before placing an order.',
				type: 'error',
			});
			return;
		}

		// Updated phone validation with Bangladeshi format
		if (!formData?.phone.trim() || !validateBangladeshiPhone(formData?.phone)) {
			toaster.create({
				title: 'Invalid Phone Number',
				description:
					'Please enter a valid Bangladeshi phone number (e.g., 01XXXXXXXXX, +8801XXXXXXXXX).',
				type: 'error',
			});
			return;
		}

		const orderBody = {
			...formData,
			customer: loggedIn ? selfData?._id : null, // Set customer ID only if logged in
			items: cartItems,
			discount: formData.discount || 0,
			coupon: formData.coupon || null,
			subTotal: subtotal,
			total: subtotal + (formData.shipping === 'inside' ? 60 : 120) - (formData?.discount || 0),
			orderDate: new Date().toISOString(),
			status: 'pending',
			shippingCharge: formData.shipping === 'inside' ? 60 : 120,
			paymentMethod: 'cod', // Default to COD for now
		};

		trigger({ path: 'orders', body: orderBody });
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
		if (result.isError && !result.isLoading) {
			toaster.create({
				title: 'Order Failed',
				description: (result as any)?.error?.data?.message,
				type: 'error',
			});
		}
	}, [result]);

	return (
		<PageLayout>
			<form onSubmit={handleConfirmOrder}>
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
							type={type}
							setCoupon={(code: string, amount: number) => {
								setFormData((prev: any) => ({ ...prev, coupon: code, discount: amount }));
							}}
						/>
					</Grid>
				</Container>
			</form>
		</PageLayout>
	);
};

export default CheckoutPageComponent;
