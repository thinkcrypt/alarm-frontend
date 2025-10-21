'use client';

import { Box, Flex, Image, Text, VStack, Checkbox, Input, Center } from '@chakra-ui/react';
import DynamicSelector from './DynamicSelector';
import { paymentOptions } from '../data/checkoutData';
import PrimaryButton from '../reusable/PrimaryButton';
import { colors } from '../data/color';
import CustomSeparator from '../reusable/CustomSeparator';

import { useState } from 'react';
import { useAppSelector } from '@/hooks';
import CartItemCard from './CartItemCard';
import EmptyCart from './EmptyCart';

interface OrderSummaryProps {
	formData?: any;
	onConfirmOrder?: any;
	isProcessingOrder?: boolean;
	isCartPage?: boolean;
	requireTerms?: boolean;
}

export default function BuyNowOrderSummary({
	formData,
	onConfirmOrder,
	isProcessingOrder = false,
	isCartPage = false,
	requireTerms = false,
}: OrderSummaryProps) {
	const { cartItems } = useAppSelector(state => state.buyNow);
	const [isProcessing, setIsProcessing] = useState(false);
	const [paymentMethod, setPaymentMethod] = useState('inside');
	const [couponCode, setCouponCode] = useState('');
	const [couponApplied, setCouponApplied] = useState(false);
	const [termsAccepted, setTermsAccepted] = useState(true);

	// --- Calculations -------------------------------------------------
	const subtotal = cartItems.reduce(
		(acc: any, item: any) => acc + (item.unitPrice ? item.unitPrice * item.qty : item.price),
		0
	);
	const discountFromOldPrice = 0;
	const shipping = formData?.shipping === 'inside' ? 60 : 120;
	const couponDiscount = couponApplied ? Math.round(subtotal * 0.1) : 0;
	const grandTotal = subtotal + shipping - couponDiscount;

	// --- Handlers -----------------------------------------------------
	const handleApplyCoupon = () => {};

	const getButtonText = () => {
		if (isCartPage) return 'Proceed to Checkout';
		else return 'Confirm Order';
	};

	const isButtonDisabled = () => {
		return (
			cartItems.length === 0 ||
			isProcessing ||
			isProcessingOrder ||
			(!isCartPage && requireTerms && !termsAccepted)
		);
	};

	// --- UI -----------------------------------------------------------
	return (
		<Box {...containerCss}>
			<Box flex='1'>
				{cartItems.length === 0 ? (
					<EmptyCart />
				) : (
					cartItems.map((item: any) => (
						<CartItemCard
							type='buyNow'
							key={item?.uniqueId}
							item={item}
						/>
					))
				)}

				<CustomSeparator />

				{/* Totals */}
				<VStack
					gap={2}
					align='stretch'
					mt={4}>
					<Flex justify='space-between'>
						<Text fontSize='sm'>Subtotal</Text>
						<Text fontSize='sm'>৳ {subtotal.toLocaleString()}</Text>
					</Flex>
					<Flex justify='space-between'>
						<Text fontSize='sm'>Shipping</Text>
						<Text fontSize='sm'>{`৳ ${shipping}`}</Text>
					</Flex>
					{/* <Flex justify='space-between'>
						<Text fontSize='sm'>Shipping</Text>
						<Text
							fontSize='sm'
							color={shipping === 0 ? 'green.600' : 'inherit'}>
							{shipping === 0 ? 'Free' : `৳ ${shipping}`}
						</Text>
					</Flex> */}
					{/* {subtotal > 0 && subtotal < 1000 && (
						<Text
							fontSize='xs'
							color='gray.500'>
							Free shipping on orders over ৳1,000
						</Text>
					)} */}

					<CustomSeparator />

					<Flex
						justify='space-between'
						fontWeight='bold'
						fontSize='lg'>
						<Text>Total Order</Text>
						<Text>৳ {grandTotal.toLocaleString()}</Text>
					</Flex>
				</VStack>

				{/* Coupon input */}
				{cartItems.length > 0 && (
					<Flex
						mt={4}
						gap={2}>
						<Input
							placeholder='Enter coupon code (try: SAVE10)'
							value={couponCode}
							onChange={e => setCouponCode(e.target.value)}
							size='sm'
							disabled={couponApplied}
						/>
						<PrimaryButton
							size='sm'
							onClick={handleApplyCoupon}
							disabled={couponApplied || !couponCode.trim()}>
							{couponApplied ? 'Applied' : 'Apply'}
						</PrimaryButton>
					</Flex>
				)}

				{/* Payment Method Selector - show on checkout page */}
				{!isCartPage && cartItems.length > 0 && (
					<DynamicSelector
						title='Payment Method'
						options={paymentOptions}
						defaultValue='cod'
						onChange={val => setPaymentMethod(val)}
					/>
				)}

				{/* Terms - show on checkout page */}
				{!isCartPage && requireTerms && cartItems.length > 0 && (
					<Checkbox.Root
						required
						mt={4}
						checked={termsAccepted}
						onCheckedChange={e => setTermsAccepted(!!e.checked)}>
						<Checkbox.HiddenInput />
						<Checkbox.Control />
						<Checkbox.Label fontSize='sm'>
							I accept the <Text {...termsTextCss}>Terms & Conditions</Text>,{' '}
							<Text {...termsTextCss}>Return & Refund Policy</Text> and{' '}
							<Text {...termsTextCss}>Privacy Policy</Text> of www.ddongbd.com
						</Checkbox.Label>
					</Checkbox.Root>
				)}
			</Box>

			{/* Buttons */}
			<VStack
				gap={3}
				mt={6}
				width='100%'>
				<PrimaryButton
					{...continueShoppingButtonCss}
					href='/'>
					Continue Shopping
				</PrimaryButton>

				<PrimaryButton
					{...checkoutButtonCss}
					{...(isCartPage ? { href: '/checkout' } : { type: 'submit' })}
					disabled={isButtonDisabled()}>
					{getButtonText()}
				</PrimaryButton>
			</VStack>
		</Box>
	);
}

const containerCss: any = {
	border: `0.5px solid ${colors.blackBorder}`,
	backgroundColor: colors.whiteBg,
	borderRadius: 'md',
	padding: '24px',
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
};

const continueShoppingButtonCss: any = {
	border: `1px solid ${colors.blackBorder}`,
	wFraction: 'full',
	variant: 'outline',
	colorPalette: 'gray',
	bgColor: `${colors.whiteBg} !important`,
	size: 'md',
	_hover: {
		borderColor: colors.blackBorder,
		bg: 'gray.50',
	},
};

const checkoutButtonCss: any = {
	w: 'full',
	size: 'md',
	bgColor: 'black',
	color: 'white',
	_hover: { bg: 'gray.800' },
	_active: { bg: 'gray.900' },
};

const termsTextCss: any = {
	as: 'span',
	color: 'blue.500',
	cursor: 'pointer',
};
