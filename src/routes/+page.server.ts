// src/routes/+page.server.ts
import { redirect } from '@sveltejs/kit';
import { parse } from 'cookie';
import { BASE_URL } from '$env/static/private';

export async function load({ request }) {
	const cookies = parse(request.headers.get('cookie') || '');
	const token = cookies.token;

	if (!token) {
		throw redirect(302, '/login');
	}
	const response = await fetch(`${BASE_URL}/user`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	if (!response.ok) {
		throw redirect(302, '/login');
	}

	const userData = await response.json();

	return {
		userData
	};
}
