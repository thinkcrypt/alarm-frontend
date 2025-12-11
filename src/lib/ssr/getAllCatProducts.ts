'use server';

import { unstable_cache } from 'next/cache';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND;

const getCachedProducts = unstable_cache(
async (id?: string, limit?: string) => {
	const token = process.env.NEXT_PUBLIC_TOKEN;
	

	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
	};

	if (token) {
		headers['authorization'] = `${token}`;
	}

	if (!BASE_URL) {
		return { doc: [] } as any;
	}

	const api = `${BASE_URL}/user-api/products/category/${id}`;
	// console.log('api', api);

	try {
		const res = await fetch(api, {
			headers,
		});

		if (!res.ok) {
			// return { doc: [] } as any;

			const text = await res.text();
			console.error('getAllCatProducts error:', res.status, text);
			return { doc: [] } as any;
		}

		const data = await res.json();
		// console.log('retrned p data:', data);
		return data as any;
	} catch (_) {
		return { doc: [] } as any;
	}
},
	['products'],
	{
		revalidate: 3600,
		tags: ['products'],
	});

export async function getAllCatProducts(id?: string, limit?: string) {
	return getCachedProducts(id, limit);
}
