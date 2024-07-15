<script lang="ts">
	import { cn } from '$lib/utils/classnames';
	import { Button } from '../button';

	type $$Props = {
		onClick: () => void;
		buttonLabel: string;
		class?: string;
	};

	export let onClick: $$Props['onClick'];
	export let buttonLabel: $$Props['buttonLabel'];
	let className: $$Props['class'] = '';
	export { className as class };
</script>

<div class={cn('relative w-full flex gap-4 rounded-lg border border-trunks px-3 py-4', className)}>
	<slot />
	<Button
		class="w-min flex items-center cursor-pointer transparent outline-none text-white underline text-xs h-auto p-0"
		variant="ghost"
		on:click={onClick}
	>
		{buttonLabel}
	</Button>
</div>
