'server-only';
import { unstable_cache } from 'next/cache';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND;

async function fetchDocById(path: string, id: string) {
	const token = process.env.NEXT_PUBLIC_TOKEN;
	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
	};

	if (token) {
		headers['authorization'] = `${token}`;
	}

	const api: string = `${BASE_URL}/user-api/${path}/${id}`;

	try {
		const res = await fetch(api, {
			headers,
		});

		if (!res.ok) {
			console.error('Failed to fetch doc:', res.status, res.statusText);
			return {} as any;
		}

		const data = await res.json();
		return data as any;
	} catch (err: any) {
		return {} as any;
	}
}

export async function getDocById(path: string, id: string) {
	const getCachedDoc = unstable_cache(async () => fetchDocById(path, id), [`doc-${path}-${id}`], {
		revalidate: 120, // 2 minutes
		tags: [`doc-${path}-${id}`],
	});

	return getCachedDoc();
}
