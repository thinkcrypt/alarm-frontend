'use client';

import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { CART_NAME } from '@/store/slices/cartSlice';
import { useEffect, useState } from 'react';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Check if a specific product variation is in cart
export const itemInCart = (
	productId: string,
	selectedSize?: string,
	selectedColor?: string,
	variationId?: string
) => {
	if (typeof window === 'undefined') return false;
	const cart = localStorage?.getItem(CART_NAME);
	if (!cart) return false;

	const cartData = JSON.parse(cart);
	const variationPart =
		variationId || `${selectedSize || 'no-size'}-${selectedColor || 'no-color'}`;
	const uniqueId = `${productId}-${variationPart}`;

	return cartData.cartItems.some((item: any) => item.uniqueId === uniqueId);
};

// Simpler version - check if any variation of a product is in cart
export const productInCart = (productId: string) => {
	if (typeof window === 'undefined') return false;
	const cart = localStorage?.getItem(CART_NAME);
	if (!cart) return false;

	const cartData = JSON.parse(cart);
	return cartData.cartItems.some((item: any) => item._id === productId || item.id === productId);
};

export const useTotalCartCount = () => {
	const [total, setTotal] = useState(0);
	const { cartItems } = useAppSelector(state => state.cart); // 👈 FIXED

	useEffect(() => {
		const count = cartItems ? cartItems.reduce((sum: number, item: any) => sum + item.qty, 0) : 0;
		setTotal(count);
	}, [cartItems]);

	return total;
};

export const totalCartCount = () => {
	if (typeof window === 'undefined') return 0;
	const cart = localStorage?.getItem(CART_NAME);
	return cart
		? JSON.parse(cart).cartItems.reduce((total: number, item: any) => {
				return total + item.qty;
		  }, 0)
		: 0;
};

export const calculateCartTotal = () => {
	if (typeof window === 'undefined') return 0;
	const cart = localStorage?.getItem(CART_NAME);
	return cart
		? JSON.parse(cart).cartItems.reduce((total: number, item: any) => {
				return total + item.price * item.qty;
		  }, 0)
		: 0;
};
