// src/routes/+page.server.ts
import { redirect } from '@sveltejs/kit';
import { BASE_URL } from '$env/static/private';

export async function load({ cookies }) {
	const token = cookies.get('token');

	if (!token) {
		throw redirect(302, '/login');
	}
	const response = await fetch(`${BASE_URL}/user`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	if (!response.ok) {
		cookies.delete('token', { path: '/' });
		throw redirect(302, '/login');
	}

	const userData = await response.json();

	return {
		userData
	};
}
