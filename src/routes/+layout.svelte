<script>
	import '../app.pcss';
	let btnClass =
		'absolute right-0 top-0 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-xl p-2 m-2';
</script>

<div class="dark:bg-light-10 h-screen w-full overflow-y-auto">
	<!-- <DarkMode {btnClass} /> -->
	<slot />
</div>
