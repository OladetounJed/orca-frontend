import type { LoginFormType } from '$lib/utils/loginFormHandler';
import { writable } from 'svelte/store';

export const registrationData = writable({ token: null });
export const loginData = writable<LoginFormType>({
	telegramId: '',
	password: ''
});

export const formSubmissionState = (() => {
	const { subscribe, set } = writable(false);

	const start = () => set(true);
	const stop = () => set(false);

	return {
		subscribe,
		start,
		stop
	};
})();

export const tokenSheetState = (() => {
	const { subscribe, set } = writable(false);

	const show = () => set(true);
	const hide = () => set(false);

	return {
		subscribe,
		show,
		hide
	};
})();
