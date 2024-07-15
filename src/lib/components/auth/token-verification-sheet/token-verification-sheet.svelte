<script lang="ts">
	import * as Sheet from '$lib/components/shared/sheet';
	import { Button } from '$lib/components/shared/button';
	import { Input } from '$lib/components/shared/input';
	import PasswordInput from '$lib/components/shared/input/password-input.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import { pasteFromClipboard } from '$lib/utils/clipboard';
	import { writable } from 'svelte/store';
	import {
		markAsTouched,
		tokenVerificationSchema,
		validateFormHandler
	} from '$lib/utils/formValidation';
	import { tokenSheetState } from '$lib/stores/authStore';

	const dispatch = createEventDispatcher();
	let token: string = '';
	const validationErrors = writable<{ token?: string[] }>({});
	const touched = writable({
		token: false
	});

	$: token, validateFormHandler(validationErrors, token, tokenVerificationSchema);

	const handleSubmit = () => {
		const validatedToken = validateFormHandler(
			validationErrors,
			{ token },
			tokenVerificationSchema
		);
		if (validatedToken) {
			tokenSheetState.hide();
			dispatch('saveChanges', token);
		}
	};
</script>

<Sheet.Root open={$tokenSheetState}>
	<Sheet.Content side="bottom" class="flex flex-col gap-5">
		<Sheet.Header>
			<Sheet.Title>enter access token.</Sheet.Title>
		</Sheet.Header>
		<PasswordInput
			class="border"
			buttonLabel="paste"
			onClick={() =>
				pasteFromClipboard().then((pastedText) => {
					if (pastedText) {
						token = pastedText;
					}
				})}
		>
			<Input
				on:input={() => markAsTouched('token', touched)}
				required
				class="custom-input truncate rounded-none border-none p-0"
				type="text"
				placeholder="access token"
				bind:value={token}
			/>
		</PasswordInput>
		{#if $touched.token && $validationErrors.token}
			<p class="text-red-500 text-xs">{$validationErrors.token[0]}</p>
		{/if}

		<Sheet.Footer>
			<Button type="submit" on:click={handleSubmit}>continue to profile</Button>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
