<script lang="ts">
	import { RegisterForm } from '$lib/components/auth/register-form';
	import { Logo } from '$lib/components/shared/logo';
	import type { PageData } from '../$types';

	export let data: PageData;
</script>

<div>
	<section class="flex flex-col items-center justify-center gap-4 pt-24 pb-12">
		<Logo />
		<h1>let's sign you in.</h1>
	</section>

	<RegisterForm data={data.form} />
</div>
