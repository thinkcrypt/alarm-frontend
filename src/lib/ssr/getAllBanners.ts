'use server';

import { unstable_cache } from 'next/cache';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND;

const getCachedBanners = unstable_cache(
	async () => {
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

		const api = `${BASE_URL}/user-api/banners?limit=10&sort=-priority`;

		try {
			const res = await fetch(api, {
				headers,
			});

			if (!res.ok) {
				return { doc: [] } as any;
			}

			const data = await res.json();
			return data as any;
		} catch (_) {
			return { doc: [] } as any;
		}
	},
	['banners'],
	{
		revalidate: 600,
		tags: ['banners'],
	}
);

export async function getAllBanners() {
	return getCachedBanners();
}
