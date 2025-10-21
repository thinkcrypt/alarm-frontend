'use server';

import { unstable_cache } from 'next/cache';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND;

const getCachedCategories = unstable_cache(
	async () => {
		const token = process.env.NEXT_PUBLIC_TOKEN;

		const headers: Record<string, string> = {
			'Content-Type': 'application/json',
		};

		if (token) {
			headers['authorization'] = `${token}`;
		}

		if (!BASE_URL) {
			// console.error('getCategory: NEXT_PUBLIC_BACKEND is not set');
			return { doc: [] } as any;
		}

		const api = `${BASE_URL}/user-api/categories?limit=999999&sort=priority&isActive=true`;

		try {
			const res = await fetch(api, {
				headers,
			});

			if (!res.ok) {
				console.error('Failed to fetch categories:', res.status, res.statusText);
				return { doc: [] } as any;
			}

			const data = await res.json();

			const filtered = Array.isArray(data?.doc)
				? data.doc.filter((item: any) => item.isActive === true)
				: [];

			return { ...data, doc: filtered } as any;
		} catch (err: any) {
			// console.error('getCategory fetch error:', err?.message || err);
			return { doc: [] } as any;
		}
	},
	['categories'],
	{
		revalidate: 900,
		tags: ['categories'],
	}
);

export async function getCategory() {
	return getCachedCategories();
}
