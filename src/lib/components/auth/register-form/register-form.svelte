<script lang="ts">
	import * as Form from '$lib/components/shared/form';
	import { Input, PasswordInput } from '$lib/components/shared/input';
	import { registerFormSchema, type RegisterFormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<RegisterFormSchema>>;

	const form = superForm(data, {
		validators: zodClient(registerFormSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form class="w-full p-4 gap-6 flex flex-col" method="POST" use:enhance>
	<Form.Field {form} name="telegramId">
		<Form.Control let:attrs>
			<Input {...attrs} bind:value={$formData.telegramId} placeholder="telegram id" />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="firstName">
		<Form.Control let:attrs>
			<Input {...attrs} bind:value={$formData.firstName} placeholder="first name" />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="password">
		<Form.Control let:attrs>
			<PasswordInput onClick={() => console.log('hello')} buttonLabel="show">
				<Input
					class="custom-input truncate rounded-none border-none p-0"
					{...attrs}
					bind:value={$formData.password}
					placeholder="password"
				/>
			</PasswordInput>
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<p class="text-white text-xs font-light">
		have an account?
		<a class="underline" href="/login">login</a>
	</p>
	<Form.Button>register</Form.Button>
</form>
