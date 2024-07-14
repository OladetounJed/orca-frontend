import type { PageServerLoad } from './$types';
import { BASE_URL } from '$env/static/private';

export const load: PageServerLoad = async ({ url }) => {
	const sessionId = url.searchParams.get('sessionId');
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
