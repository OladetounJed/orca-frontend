<script lang="ts">
	import { LoginForm } from '$lib/components/auth/login-form';
	import { Logo } from '$lib/components/shared/logo';
	import type { PageData } from '../$types';

	export let data: PageData;
</script>

<div>
	<section class="flex flex-col items-center justify-center gap-4 pt-24 pb-12">
		<Logo />
		<h1>let's sign you in.</h1>
	</section>

	<LoginForm data={data.form} />
</div>
