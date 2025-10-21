import { HStack, VStack, Link, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';
import PrimaryButton from '../reusable/PrimaryButton';
import { DetailedProduct } from '../data/productData';
import { toaster } from '../ui/toaster';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { addToCart as addToCartAction } from '@/store/slices/cartSlice';

const AddToCartBuyNow: React.FC<{ product: DetailedProduct }> = ({
	product,
}) => {
	const isMobile = useBreakpointValue({ base: true, md: false });
	const dispatch = useAppDispatch();
	const { cartItems } = useAppSelector(state => state.cart);
	const router = useRouter();

	const isInCart = cartItems.some(
		(item: any) => String(item.id) === String(product.id)
	);

	const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) =>
		isMobile ? (
			<VStack gap={3} w='full' mt={4}>
				{children}
			</VStack>
		) : (
			<HStack gap={3} mt={4}>
				{children}
			</HStack>
		);

	const handleAddToCart = () => {
		if (isInCart) {
			toaster.create({
				title: `${product.name} is already in your cart`,
				type: 'info',
			});
			return;
		}
		const primaryImage = product.images?.[0];
		const item = {
			_id: String(product.id),
			id: product.id,
			name: product.name,
			price: product.price,
			vat: product.vat || 0,
			image: primaryImage,
		};
		dispatch(addToCartAction({ item, qty: 1 }));
		toaster.create({
			title: `${product.name} has been added to your cart`,
			type: 'success',
		});
	};

	const handleShopNow = () => {
		if (!isInCart) {
			const primaryImage = product.images?.[0];
			const item = {
				_id: String(product.id),
				id: product.id,
				name: product.name,
				price: product.price,
				vat: product.vat || 0,
				image: primaryImage,
			};
			dispatch(addToCartAction({ item, qty: 1 }));
		}
		setTimeout(() => {
			router.push('/checkout');
		}, 100);
	};

	return (
		<Wrapper>
			<PrimaryButton
				flex={isMobile ? undefined : 1}
				w={isMobile ? 'full' : undefined}
				variant='outline'
				colorPalette='blue'
				onClick={handleAddToCart}
				disabled={isInCart}
			>
				{isInCart ? 'In Cart' : 'Add to Cart'}
			</PrimaryButton>

			<PrimaryButton
				flex={isMobile ? undefined : 1}
				w={isMobile ? 'full' : undefined}
				colorPalette='black'
				textAlign='center'
				onClick={handleShopNow}
			>
				Shop Now
			</PrimaryButton>
		</Wrapper>
	);
};

export default AddToCartBuyNow;
