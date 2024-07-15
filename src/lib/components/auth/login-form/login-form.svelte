<script lang="ts">
	import { Button } from '$lib/components/shared/button';
	import { Input, PasswordInput } from '$lib/components/shared/input';
	import { formSubmissionState } from '$lib/stores/authStore';
	import { loginFormSchema, markAsTouched, validateFormHandler } from '$lib/utils/formValidation';
	import { type LoginFormErrorType, type LoginFormType } from '$lib/utils/loginFormHandler';
	import { createEventDispatcher } from 'svelte';
	import { writable } from 'svelte/store';

	const dispatch = createEventDispatcher();
	const formData = writable<LoginFormType>({
		telegramId: '',
		password: ''
	});
	const validationErrors = writable<LoginFormErrorType>({});
	const showPassword = writable(false);
	const touched = writable({
		telegramId: false,
		password: false
	});

	$: $formData, validateFormHandler(validationErrors, $formData, loginFormSchema);

	const handleSubmit = () => {
		const validatedData = validateFormHandler(validationErrors, $formData, loginFormSchema);
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
	<PasswordInput onClick={() => showPassword.set(!$showPassword)} buttonLabel="show">
		<Input
			class="custom-input truncate rounded-none border-none p-0"
			bind:value={$formData.password}
			placeholder="password"
			required
			type={$showPassword ? 'text' : 'password'}
			on:input={() => markAsTouched('password', touched)}
		/>
	</PasswordInput>
	{#if $touched.password && $validationErrors.password}
		<p class="text-red-500 text-xs">{$validationErrors.password[0]}</p>
	{/if}
	<p class="text-white text-xs font-light">
		don't have an account?
		<a class="underline" href="/register">register</a>
	</p>
	<Button disabled={$formSubmissionState} type="submit"
		>{$formSubmissionState ? 'please wait..,' : 'login'}</Button
	>
</form>
