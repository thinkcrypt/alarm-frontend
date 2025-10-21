import React from 'react';
import PageLayout from '../Layout/PageLayout';
import { Box, Container, Grid } from '@chakra-ui/react';
import CheckoutSteps from '../Checkout/CheckoutSteps';
import OrderSummary from '../Checkout/OrderSummary';
import Coupon from '../reusable/Coupon';
import BuyNowCartItems from '../Cart/BuyNowCartItems';

const CartPageComponent = () => {
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
					<OrderSummary
						isCartPage={true} // ✅ Added flag to indicate this is cart page
					/>
				</Grid>
			</Container>
		</PageLayout>
	);
};

export default CartPageComponent;
