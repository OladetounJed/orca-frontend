<script lang="ts">
	import { LoginForm } from '$lib/components/auth/login-form';
	import { Logo } from '$lib/components/shared/logo';
	import { TokenVerificationSheet } from '$lib/components/auth/token-verification-sheet';
	import { loginFormHandler } from '$lib/utils/loginFormHandler';
	import { loginData, tokenSheetState } from '$lib/stores/authStore';

	const showTokenModal = (event: CustomEvent) => {
		loginData.set(event.detail);
		tokenSheetState.show();
	};
</script>

<div>
	<section class="flex flex-col items-center justify-center gap-4 pt-24 pb-12">
		<Logo />
		<h1>let's sign you in.</h1>
	</section>

	<LoginForm on:submit={showTokenModal} />
	{#if $tokenSheetState}
		<TokenVerificationSheet on:saveChanges={(event) => loginFormHandler(event, $loginData)} />
	{/if}
</div>
