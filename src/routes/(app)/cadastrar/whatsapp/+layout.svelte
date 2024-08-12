<script>
	let loading = true;
	let hasAccess = true;
	$: {
		if (hasAccess) {
			loading = false;
		}
	}

	import { browser } from '$app/environment';

	let isDarkMode = false;
	$: if (browser) {
		document.documentElement.classList.toggle('dark', isDarkMode);
	}
</script>

{#if loading || !browser}
	<div class="flex h-full items-center justify-center">
		<div
			class="text-surface inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
			role="status"
		>
			<span
				class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
				>Loading...</span
			>
		</div>
	</div>
{:else if hasAccess}
	<slot />
{:else}
	<div style="text-align: center; color:gray;">
		<h1 style="font-size: 50px;">Indisponível</h1>
		<button
			onclick="history.back()"
			style="display: block;cursor: pointer; margin: auto; background-color: #fff; padding: 0.5rem; margin-top: 2rem; text-align: left; padding-left: 1rem; padding-right: 1rem; border: 1px solid #ccc; border-radius: 0.375rem; font-size: 0.875rem; font-weight: 500; color: #555; line-height: 1.25;vertical-align: center;"
		>
			Voltar
		</button>
	</div>
{/if}
