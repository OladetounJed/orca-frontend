import { goto } from '$app/navigation';
import { toast } from '$lib/components/shared/toast';
import { browser } from '$app/environment';
import { PUBLIC_BASE_URL } from '$env/static/public';

export type LoginFormErrorType = {
	telegramId?: string[];
	password?: string[];
};

export type LoginFormType = {
	telegramId: string;
	password: string;
};

export const loginFormHandler = async (event: CustomEvent, loginData: LoginFormType) => {
	const { detail: token } = event;
	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				...loginData,
				token
			})
		});

		const result = await response.json();

		if (response.ok) {
			if (browser) {
				document.cookie = `token=${result.token};path=/;max-age=86400;`;
			}
			goto('/');
			toast.success('login successful');
		} else {
			toast.error('An error occurred during login');
		}
	} catch (error) {
		toast.error('An error occurred during login');
		console.error('An error occurred during login', error);
	}
};
