'use client';
import { VStack, Text, EmptyState } from '@chakra-ui/react';
import CartItemCard from './CartItemCard';
import { LuShoppingCart } from 'react-icons/lu';
import { useAppDispatch, useAppSelector } from '@/hooks';
import {
	deleteSingleItemFromCart,
	deleteOneFromCart,
	addToCart as addToCartAction,
} from '@/store/slices/cartSlice';

const CartItems = () => {
	const dispatch = useAppDispatch();
	const { cartItems } = useAppSelector(state => state.cart);

	const handleRemove = (uniqueId: string) => {
		dispatch(deleteSingleItemFromCart(uniqueId));
	};

	const handleUpdateQuantity = (uniqueId: string, newQty: number) => {
		const item = cartItems.find((it: any) => it.uniqueId === uniqueId);
		if (!item) return;
		const currentQty = item.qty || 0;
		if (newQty <= 0) {
			dispatch(deleteSingleItemFromCart(item.uniqueId));
			return;
		}
		if (newQty > currentQty) {
			const delta = newQty - currentQty;
			const addItem = {
				_id: item._id,
				id: item.id,
				name: item.name,
				price: item.unitPrice || item.price,
				vat: item.vat || 0,
				image: item.image,
				selectedSize: item.selectedSize,
				selectedColor: item.selectedColor,
				variationId: item.variationId,
				variantStock: item.variantStock,
			};
			dispatch(addToCartAction({ item: addItem, qty: delta }));
		} else if (newQty < currentQty) {
			const delta = currentQty - newQty;
			for (let i = 0; i < delta; i++) {
				dispatch(deleteOneFromCart(item.uniqueId));
			}
		}
	};

	return (
		<VStack
			gap={4}
			align='stretch'>
			{!cartItems || cartItems.length === 0 ? (
				<EmptyState.Root>
					<EmptyState.Content>
						<EmptyState.Indicator>
							<LuShoppingCart />
						</EmptyState.Indicator>
						<VStack textAlign='center'>
							<EmptyState.Title>Your cart is empty</EmptyState.Title>
							<EmptyState.Description>
								Explore our products and add items to your cart
							</EmptyState.Description>
						</VStack>
					</EmptyState.Content>
				</EmptyState.Root>
			) : (
				cartItems.map((item: any) => (
					<CartItemCard
						key={item.uniqueId}
						// adapting to CartItemCard expected shape using casting in props usage
						// @ts-ignore
						item={{
							id: item.uniqueId, // Use uniqueId for identification
							title: item.name,
							size: item.selectedSize || '',
							color: item.selectedColor || '',
							price: item.unitPrice || item.price,
							quantity: item.qty,
							image: item.image,
							variantName: item.variantName || '',
						}}
						onRemove={() => handleRemove(item.uniqueId)}
						onUpdateQuantity={(qty: number) => handleUpdateQuantity(item.uniqueId, qty)}
					/>
				))
			)}
		</VStack>
	);
};

export default CartItems;
