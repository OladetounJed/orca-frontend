<script lang="ts">
	import * as Sheet from '$lib/components/shared/sheet';
	import { Button } from '$lib/components/shared/button';
	import { Input } from '$lib/components/shared/input';
	import { Label } from '$lib/components/shared/label';
	import { toast } from '$lib/components/shared/toast';
	import PasswordInput from '$lib/components/shared/input/password-input.svelte';
</script>

<Sheet.Root>
	<Sheet.Trigger asChild let:builder>
		<Button builders={[builder]} variant="outline">Open</Button>
	</Sheet.Trigger>
	<Sheet.Content side="bottom" class="flex flex-col gap-5">
		<Sheet.Header>
			<Sheet.Title>copy access token.</Sheet.Title>
		</Sheet.Header>
		<div
			class="bg-piccolo/20 text-white hover:bg-piccolo/40 border border-piccolo p-4 rounded-lg text-xs font-light leading-5"
		>
			kindly copy and save your token somewhere safe, you won’t be able to retrieve your token after
			this step.
		</div>
		<PasswordInput
			buttonLabel="copy"
			onClick={() => console.log('tokenConfirmation')}
		>
			<Input
				class="custom-input truncate rounded-none border-none p-0"
				type="text"
				placeholder="access token"
				disabled
				value="GloVLVgmZRGzqIzTKgaT6VGDUcZmhThwqtfFXgKY7Aa3JFI5uwalcCcHtPvChqL2"
			/>
		</PasswordInput>

		<Sheet.Footer>
			<Sheet.Close asChild let:builder>
				<Button builders={[builder]} type="submit">Save changes</Button>
			</Sheet.Close>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
