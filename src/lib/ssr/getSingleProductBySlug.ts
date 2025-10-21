'server-only';

import { unstable_cache } from 'next/cache';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND;

const getCachedProductBySlug = unstable_cache(
	async (identifier: string) => {
		const token = process.env.NEXT_PUBLIC_TOKEN;

		const headers: Record<string, string> = {
			'Content-Type': 'application/json',
			store: process.env.NEXT_PUBLIC_STORE || '0001',
		};

		if (token) {
			headers['authorization'] = token;
		}

		// Try both ID and slug endpoints depending on what your backend supports
		const api = `${BASE_URL}/user-api/products/get/slug/${identifier}`;

		try {
			const res = await fetch(api, {
				headers,
			});

			if (!res.ok) {
				return null;
			}

			const data = await res.json();
			return data;
		} catch (error) {
			console.error('getSingleProduct failed:', error);
			return null;
		}
	},
	['single-product'],
	{
		revalidate: 300,
		tags: ['single-product'],
	}
);

export async function getSingleProductBySlug(identifier: string) {
	return getCachedProductBySlug(identifier);
}
