import BuyNowCartPage from '@/components/BuyNow/BuyNowCartPage';
import { Box, Container, Grid } from '@chakra-ui/react';
import React from 'react';
import PageLayout from '@/components/Layout/PageLayout';
import CheckoutSteps from '@/components/Checkout/CheckoutSteps';
import Coupon from '@/components/reusable/Coupon';
import BuyNowCartItems from '@/components/Cart/BuyNowCartItems';
import BuyNowOrderSummary from '@/components/Checkout/BuyNowOrderSummary';

export default function BuyNowCart() {
	return (
		<PageLayout>
			<Container py={10}>
				<CheckoutSteps currentStep={0} />
				<Grid
					templateColumns={{ base: '1fr', lg: '2fr 1fr' }}
					gap={8}
					alignItems='start'>
					<Box>
						<BuyNowCartItems />
						<Coupon />
					</Box>
					<BuyNowOrderSummary
						isCartPage={true} // ✅ Added flag to indicate this is cart page
					/>
				</Grid>
			</Container>
		</PageLayout>
	);
}
