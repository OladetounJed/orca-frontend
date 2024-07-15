<script lang="ts">
	import { Button } from '$lib/components/shared/button';
	import { Input, PasswordInput } from '$lib/components/shared/input';
	import {
		markAsTouched,
		registerFormSchema,
		validateFormHandler
	} from '$lib/utils/formValidation';
	import type { RegisterFormErrorType } from '$lib/utils/registerFormHandler';
	import { createEventDispatcher, onMount } from 'svelte';
	import { writable } from 'svelte/store';

	const dispatch = createEventDispatcher();
	const formData = writable<{ telegramId: string; firstName: string; password: string }>({
		telegramId: '',
		firstName: '',
		password: ''
	});
	const validationErrors = writable<RegisterFormErrorType>({});
	const showPassword = writable(false);
	const touched = writable({
		telegramId: false,
		password: false,
		firstName: false
	});
	export let sessionData: { telegramId: string; firstName: string } | undefined;

	onMount(() => {
		if (sessionData) {
			formData.set({
				telegramId: `${sessionData.telegramId}`,
				firstName: sessionData.firstName,
				password: ''
			});
		}
	});

	$: $formData, validateFormHandler(validationErrors, $formData, registerFormSchema);

	const handleSubmit = () => {
		const validatedData = validateFormHandler(validationErrors, $formData, registerFormSchema);
		if (validatedData) {
			dispatch('submit', validatedData);
		}
	};
</script>

<form class="w-full gap-6 flex flex-col" on:submit|preventDefault={handleSubmit}>
	<Input
		required
		bind:value={$formData.telegramId}
		placeholder="telegram id"
		on:input={() => markAsTouched('telegramId', touched)}
	/>
	{#if $touched.telegramId && $validationErrors.telegramId}
		<p class="text-red-500 text-xs">{$validationErrors.telegramId[0]}</p>
	{/if}
	<Input
		required
		bind:value={$formData.firstName}
		placeholder="first name"
		on:input={() => markAsTouched('firstName', touched)}
	/>
	{#if $touched.firstName && $validationErrors.firstName}
		<p class="text-red-500 text-xs">{$validationErrors.firstName[0]}</p>
	{/if}
	<PasswordInput onClick={() => showPassword.set(!$showPassword)} buttonLabel="show">
		<Input
			on:input={() => markAsTouched('password', touched)}
			required
			class="custom-input truncate rounded-none border-none p-0"
			type={$showPassword ? 'text' : 'password'}
			bind:value={$formData.password}
			placeholder="password"
		/>
	</PasswordInput>
	{#if $touched.password && $validationErrors.password}
		<p class="text-red-500 text-xs">{$validationErrors.password[0]}</p>
	{/if}
	<p class="text-white text-xs font-light">
		have an account?
		<a class="underline" href="/login">login</a>
	</p>
	<Button type="submit">register</Button>
</form>
