'use server';
import { unstable_cache } from 'next/cache';
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND;

export const getContents = unstable_cache(
	async () => {
		const token = process.env.NEXT_PUBLIC_TOKEN;
		const headers: Record<string, string> = {
			'Content-Type': 'application/json',
		};

		if (token) {
			headers['authorization'] = `${token}`;
		}

		const api = `${BASE_URL}/user-api/contents?limit=100`;

		const res = await fetch(api, {
			headers,
		});

		if (!res.ok) {
			console.error(`Failed to fetch contents, Status: ${res.status}`);
			const errorText = await res.text();
			console.error('Error response:', errorText);
			return { doc: [] }; // Fallback to prevent crashes
		}

		const data = await res.json();
		return data?.doc; // Expected format: { doc: [...] }
	},
	['contents'],
	{
		revalidate: 900, // 15 minutes
		tags: ['contents'],
	}
);
