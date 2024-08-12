<script lang="ts">
	import { Listgroup } from 'flowbite-svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let items: {
		id: string;
		name: string;
	}[] = [];
	export let selected: string | string[];
	export let multi = false;

	$: links = items.map((i) => {
		return {
			name: i.name,
			current: multi ? selected?.includes(i.id) : i.id === selected,
			id: i.id
		};
	});
</script>

{#if items.length > 0}
	<Listgroup
		active
		items={links}
		let:item
		class="dark:bg-light-10 flex w-full flex-col rounded-none "
		on:click={(item) => {
			dispatch('itemClick', {
				itemId: item.detail.id
			});
		}}
	>
		<div class="flex w-full flex-row items-center justify-between">
			<span>
				{item.name}
			</span>
		</div>
	</Listgroup>
{:else}
	<div class="p-1 text-xs italic text-gray-500">There are no results for this filter.</div>
{/if}
