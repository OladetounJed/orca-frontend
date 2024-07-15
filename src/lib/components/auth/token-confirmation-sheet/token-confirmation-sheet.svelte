<script lang="ts">
	import * as Sheet from '$lib/components/shared/sheet';
	import { Button } from '$lib/components/shared/button';
	import { Input } from '$lib/components/shared/input';
	import PasswordInput from '$lib/components/shared/input/password-input.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import { copyToClipboard } from '$lib/utils/clipboard';
	import { tokenSheetState, registrationData } from '$lib/stores/authStore';

	const dispatch = createEventDispatcher();
</script>

<Sheet.Root open={$tokenSheetState}>
	<Sheet.Content side="bottom" class="flex flex-col gap-5">
		<Sheet.Header>
			<Sheet.Title>copy access token.</Sheet.Title>
		</Sheet.Header>
		<div
			class="bg-piccolo/20 text-white border border-piccolo p-4 rounded-lg text-xs font-light leading-5"
		>
			kindly copy and save your token somewhere safe, you won’t be able to retrieve your token after
			this step.
		</div>
		<PasswordInput
			class="border border-dashed"
			buttonLabel="copy"
			onClick={() => copyToClipboard($registrationData.token)}
		>
			<Input
				class="custom-input truncate rounded-none border-none p-0"
				type="text"
				placeholder="access token"
				disabled
				value={$registrationData.token}
			/>
		</PasswordInput>

		<Sheet.Footer>
			<Sheet.Close asChild let:builder>
				<Button builders={[builder]} type="submit" on:click={() => dispatch('saveChanges')}
					>continue to profile</Button
				>
			</Sheet.Close>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
