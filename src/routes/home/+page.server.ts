// src/routes/+page.server.ts
import { redirect, type Cookies } from '@sveltejs/kit';
import { BASE_URL } from '$env/static/private';
import type { PageServerLoad } from '../$types';

const pageLoadErrorHandler = (cookies: Cookies) => {
	cookies.delete('token', { path: '/' });
	throw redirect(302, '/');
};

export const load: PageServerLoad = async ({ cookies }) => {
	try {
		const token = cookies.get('token');

		if (!token) {
			throw redirect(302, '/');
		}
		const response = await fetch(`${BASE_URL}/user`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		if (!response.ok) {
			pageLoadErrorHandler(cookies);
		}

		const userData = await response.json();

		return {
			userData
		};
	} catch {
		pageLoadErrorHandler(cookies);
	}
};
