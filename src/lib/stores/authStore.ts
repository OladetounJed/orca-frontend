import type { LoginFormType } from '$lib/utils/loginFormHandler';
import { writable } from 'svelte/store';

export const isTokenSheetVisible = writable(false);
export const registrationData = writable({ token: null });
export const loginData = writable<LoginFormType>({
	telegramId: '',
	password: ''
});

export const showTokenSheet = () => {
	isTokenSheetVisible.set(true);
};

export const closeTokenSheet = () => {
	isTokenSheetVisible.set(false);
};
