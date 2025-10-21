'server-only';

import { unstable_cache } from 'next/cache';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND;

const getCachedSingleCategory = unstable_cache(
	async (identifier: string) => {
		const token = process.env.NEXT_PUBLIC_TOKEN;

		const headers: Record<string, string> = {
			'Content-Type': 'application/json',
		};

		if (token) {
			headers['authorization'] = token;
		}

		// Try both ID and slug endpoints depending on what your backend supports
		const api = `${BASE_URL}/user-api/categories/${identifier}`;

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
	['single-category'],
	{
		revalidate: 900,
		tags: ['single-category'],
	}
);

export default async function getASingleCategory(identifier: string) {
	return getCachedSingleCategory(identifier);
}
