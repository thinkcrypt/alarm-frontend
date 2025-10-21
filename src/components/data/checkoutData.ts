export const fields = [
	{ label: 'Full name *', placeholder: 'Full Name', isRequired: true },
	{ label: 'Phone number *', placeholder: 'Phone Number', isRequired: true },
	{ label: 'Email address', placeholder: 'E-mail Address', isRequired: true },
	{
		label: 'Full Address *',
		placeholder: 'Address Details',
		isRequired: true,
		type: 'textarea',
	},
];

// data.ts

export const shippingOptions = [
	{ id: 'inside', label: 'Inside Dhaka (60)', price: 60 },
	{ id: 'outside', label: 'Outside Dhaka (120)', price: 120 },
];

export const paymentOptions = [
	// { id: 'sslcommerz', label: 'SSLCOMMERZ (Online Payment)' },
	{ id: 'cod', label: 'Cash on Delivery (COD)' },
];

export const steps = [
	{
		title: 'Cart',
		description: 'Shopping Cart',
	},
	{
		title: 'Checkout',
		description: 'Checkout',
	},
	{
		title: 'Order Complete',
		description: 'Order Complete',
	},
];

export const orderData = {
	products: [
		{
			id: 1,
			title: 'Barton Contrast Chest Design T-Shirt',
			image: '/image-1.webp',
			color: 'BLACK',
			size: 'M',
			qty: 1,
			price: 960,
		},
		// you can add more products here
	],
	totals: [
		{ label: 'Subtotal', value: 960.0 },
		{ label: 'Shipping Charge', value: 60.0 },
		{ label: 'Total Discount', value: 0.0 },
		{ label: 'VAT', value: 0.0 },
	],
	grandTotal: 1020,
};
