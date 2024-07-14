import type { PageServerLoad } from './$types';
import { BASE_URL } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url, cookies }) => {
	const sessionId = url.searchParams.get('sessionId');
	const token = cookies.get('token');

	if (token) {
		throw redirect(302, '/');
	}
	if (!sessionId) {
		return;
	}

	try {
		const response = await fetch(`${BASE_URL}/session?sessionId=${sessionId}`);

		if (!response.ok) {
			return;
		}

		const sessionData = await response.json();

		return {
			sessionData
		};
	} catch {
		return;
	}
};
