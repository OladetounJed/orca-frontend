import { goto } from '$app/navigation';
import { toast } from '$lib/components/shared/toast';
import { browser } from '$app/environment';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { formSubmissionState, registrationData, tokenSheetState } from '$lib/stores/authStore';

export type RegisterFormErrorType = {
	telegramId?: string[];
	password?: string[];
	firstName?: string[];
};

export type RegisterFormType = {
	telegramId: string;
	password: string;
	firstName: string;
};

export const registerFormHandler = async (event: CustomEvent) => {
	const { detail } = event;
	formSubmissionState.start();
	try {
		const response = await fetch(`${PUBLIC_BASE_URL}/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(detail)
		});

		const result = await response.json();

		if (response.ok) {
			registrationData.set(result);
			tokenSheetState.show();
			if (browser) {
				document.cookie = `token=${result.token};path=/;max-age=86400;`;
			}
		} else {
			toast.error('An error occurred during registration');
		}
		formSubmissionState.stop();
	} catch (error) {
		formSubmissionState.stop();
		toast.error('An error occurred during registration');
		console.error('An error occurred during registration', error);
	}
};

export const redirectToHome = () => {
	toast.success('Registration successful');
	goto('/home');
	tokenSheetState.hide();
};
