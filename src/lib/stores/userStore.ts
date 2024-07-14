// src/stores/userStore.ts
import { writable } from 'svelte/store';

export const userStore = writable({
	first_name: null,
	last_name: null,
	email: null,
	createdAt: null,
	telegram_id: null,
	id: null
});
