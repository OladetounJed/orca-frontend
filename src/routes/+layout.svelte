<script>
	import { Toaster } from '$lib/components/shared/toast';
	import '../app.css';
</script>

<div class="min-h-screen bg-gohan font-satoshi flex justify-center w-full">
	<Toaster position="top-center" />
	<div class="max-w-[430px] w-full">
		<slot />
	</div>
</div>
