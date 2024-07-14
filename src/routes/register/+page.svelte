<script lang="ts">
	import { RegisterForm } from '$lib/components/auth/register-form';
	import { Logo } from '$lib/components/shared/logo';
	import { TokenConfirmationSheet } from '$lib/components/auth/token-confirmation-sheet';
	import { redirectToHome, registerFormHandler } from '$lib/utils/registerFormHandler.js';
	import { isTokenSheetVisible } from '../../lib/stores/authStore';

	export let data;
</script>

<div>
	<section class="flex flex-col items-center justify-center gap-4 pt-24 pb-12">
		<Logo />
		<h1>welcome to orca.</h1>
	</section>

	<RegisterForm on:submit={registerFormHandler} sessionData={data.sessionData} />
	{#if $isTokenSheetVisible}
		<TokenConfirmationSheet on:saveChanges={redirectToHome} />
	{/if}
</div>
