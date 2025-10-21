export interface CartItem {
	id: number;
	title: string;
	price: number;
	oldPrice?: number; // optional
	discount?: number; // optional
	color?: string; // optional
	size: string;
	quantity: number;
	image: string;
	variantName?: string; // optional - for displaying variant info
}

export const cartItems: CartItem[] = [
	{
		id: 1,
		title: 'Barton Contrast Chest Design T-Shirt',
		size: 'M',
		color: 'Black',
		price: 960,
		oldPrice: 1200,
		discount: 20,
		quantity: 1,
		image: '/image-1.webp',
	},
];
