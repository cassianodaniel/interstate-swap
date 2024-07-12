<script>
	let loading = true;
	let hasAccess = true;
	$: {
		if (hasAccess) {
			loading = false;
		}
	}
</script>

{#if loading}
	Loading...
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
