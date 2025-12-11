'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

declare global {
	interface Window {
		fbq: any;
	}
}

export function trackViewContent(product: {
	id: string;
	name: string;
	price: number;
	category?: string;
}) {
	if (typeof window !== 'undefined' && window.fbq) {
		window.fbq('track', 'ViewContent', {
			content_ids: [product.id],
			content_name: product.name,
			content_type: 'product',
			content_category: product.category,
			value: product.price,
			currency: 'BDT',
		});
	}
}

export function trackAddToCart(product: {
	id: string;
	name: string;
	price: number;
	quantity: number;
}) {
	if (typeof window !== 'undefined' && window.fbq) {
		window.fbq('track', 'AddToCart', {
			content_ids: [product.id],
			content_name: product.name,
			content_type: 'product',
			value: product.price * product.quantity,
			currency: 'BDT',
		});
	}
}

export function trackPurchase(order: {
	orderId: string;
	total: number;
	products: Array<{ id: string; quantity: number }>;
}) {
	if (typeof window !== 'undefined' && window.fbq) {
		window.fbq('track', 'Purchase', {
			content_ids: order.products.map(p => p.id),
			content_type: 'product',
			value: order.total,
			currency: 'BDT',
			transaction_id: order.orderId,
		});
	}
}
