<script>
	import { DarkMode } from 'flowbite-svelte';
	import '../app.pcss';
	let btnClass =
		'absolute right-0 top-0 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-xl p-2 m-2';
</script>

<div class="h-screen w-full overflow-y-auto dark:bg-light-10">
	<DarkMode {btnClass} />
	<slot />
</div>
