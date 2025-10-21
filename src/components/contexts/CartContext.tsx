'use client';
import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from 'react';
import { CartItem } from '../data/cartData';

interface CartContextType {
	cart: CartItem[];
	addToCart: (item: CartItem) => void;
	removeFromCart: (id: number, size?: string) => void;
	updateQuantity: (id: number, size: string, quantity: number) => void;
	clearCart: () => void;
	isLoaded: boolean; // Add loading state
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
	const [cart, setCart] = useState<CartItem[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);

	// Load cart from localStorage on component mount
	useEffect(() => {
		if (typeof window !== 'undefined') {
			try {
				const savedCart = localStorage.getItem('shopping_cart');
				if (savedCart) {
					const parsedCart = JSON.parse(savedCart);
					setCart(parsedCart);
				}
			} catch (error) {
				console.error('Error loading cart from localStorage:', error);
			} finally {
				setIsLoaded(true);
			}
		}
	}, []);

	// Save cart to localStorage whenever cart changes (but only after initial load)
	useEffect(() => {
		if (isLoaded && typeof window !== 'undefined') {
			try {
				localStorage.setItem('shopping_cart', JSON.stringify(cart));
			} catch (error) {
				console.error('Error saving cart to localStorage:', error);
			}
		}
	}, [cart, isLoaded]);

	const addToCart = (newItem: CartItem) => {
		setCart(prev => {
			const existingItem = prev.find(
				item => item.id === newItem.id && item.size === newItem.size
			);

			if (existingItem) {
				return prev.map(item =>
					item.id === newItem.id && item.size === newItem.size
						? { ...item, quantity: item.quantity + newItem.quantity }
						: item
				);
			}

			return [...prev, { ...newItem }];
		});
	};

	const removeFromCart = (id: number, size?: string) => {
		setCart(prev =>
			prev.filter(item =>
				size ? !(item.id === id && item.size === size) : item.id !== id
			)
		);
	};

	const updateQuantity = (id: number, size: string, quantity: number) => {
		if (quantity <= 0) {
			removeFromCart(id, size);
			return;
		}

		setCart(prev =>
			prev.map(item =>
				item.id === id && item.size === size ? { ...item, quantity } : item
			)
		);
	};

	const clearCart = () => {
		setCart([]);
		if (typeof window !== 'undefined') {
			localStorage.removeItem('shopping_cart');
		}
	};

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				removeFromCart,
				updateQuantity,
				clearCart,
				isLoaded,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) throw new Error('useCart must be used within CartProvider');
	return context;
};