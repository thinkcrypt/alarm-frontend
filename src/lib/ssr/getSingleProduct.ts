'server-only';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND;

export async function getSingleProduct(identifier: string) {
	const token = process.env.NEXT_PUBLIC_TOKEN;

	const headers: Record<string, string> = {
		'Content-Type': 'application/json',
		store: process.env.NEXT_PUBLIC_STORE || '0001',
	};

	if (token) {
		headers['authorization'] = token;
	}

	// Try both ID and slug endpoints depending on what your backend supports
	const api = `${BASE_URL}/user-api/products/${identifier}`;

	try {
		const res = await fetch(api, {
			next: { revalidate: 60 },
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
}
