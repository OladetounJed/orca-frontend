<script lang="ts">
	import { Logo } from '$lib/components/shared/logo';
	import { Button } from '$lib/components/shared/button';
	import { onMount } from 'svelte';
	import { userStore } from '$lib/stores/userStore';
	import { goto } from '$app/navigation';
	import { time } from '$lib/stores/timeStore';
	import { dateFormatter } from '$lib/utils/dateFormat';
	export let data;

	onMount(() => {
		if (data.userData) {
			userStore.set(data.userData);
		}
	});

	const handleLogout = () => {
		document.cookie = 'token=; Max-Age=0; path=/;';
		goto('/');
	};
</script>

<div>
	{#if !$userStore?.id}
		<p>loading...</p>
	{:else}
		<div class="flex flex-col gap-12">
			<section class="flex justify-between">
				<Logo width={24} height={28} />
				<h1 class="text-sm">welcome back, {$userStore?.first_name}</h1>
			</section>
			<section class="flex flex-col gap-9">
				<p>Your telegam id is <span class="underline">{$userStore?.telegram_id}</span></p>
				<p class="flex flex-col gap-4">
					<span>you created your orca account on</span>
					{#if $userStore?.createdAt}
						<span class="underline">{dateFormatter.format(new Date($userStore.createdAt))}</span>
					{/if}
				</p>
				<p class="flex flex-col gap-4">
					<span>the current time is</span>
					<span class="underline">{dateFormatter.format($time)}</span>
				</p>
				<Button class="w-full" variant="destructive" on:click={handleLogout}>logout</Button>
			</section>
		</div>
	{/if}
</div>
