<script lang="ts">
	import { goto } from '$app/navigation';
	import List from '$lib/components/List.svelte';
	import { STATES, TABS } from '$lib/constants/index.js';
	import type { users } from '../../../../schema/interfaces.js';

	export let data: {
		users: users.Users.User[];
	};

	import { Heading } from 'flowbite-svelte';

	let isLoading = false;

	let activeTab = TABS.PM;

	let from = '';
	let to = [];
</script>

<svelte:head>
	<title>Permutas Online</title>
</svelte:head>
{#if isLoading}
	Loading
{:else}
	<div class="dark:bg-light-10 grid h-screen grid-cols-12">
		<div
			class="dark:bg-light-10 col-span-12 flex h-[50vh] flex-col sm:col-span-3 sm:h-full
		"
		>
			<div class="mx-5 mb-5 mt-10">
				<Heading class="mb-5" tag="h4">1. Selecione o Estado de Origem</Heading>
				<p class="text-sm text-gray-500">
					<!-- De onde é a permuta que você procura? Você pode selecionar apenas um estado. -->
					Para onde você quer permutar? Você pode selecionar apenas um estado.
				</p>
			</div>
			<div class="mx-5 grid max-h-[75vh] grid-cols-12 gap-2 overflow-y-auto">
				<div class="col-span-12">
					<List
						items={STATES}
						selected={from}
						on:itemClick={(e) => {
							from = e.detail.itemId;
							goto(`permutas/?from=${from}&to=${to}`);
						}}
					/>
				</div>
			</div>
		</div>
		<div
			class="dark:bg-light-10 col-span-12 flex h-[50vh] flex-col sm:col-span-3 sm:h-full
		"
		>
			<div class="mx-5 mb-5 mt-10">
				<Heading class="mb-5" tag="h4">2. Selecione o Estado de Destino</Heading>
				<p class="text-sm text-gray-500">
					De onde você cede a permuta? Você pode selecionar apenas um estado.
				</p>
				<!-- <div
					class="
					animation fixed
					bottom-0 block transform animate-bounce text-3xl text-gray-500 sm:hidden"
					id="emoji"
				>
					👇 Desça para ver mais 👇
				</div> -->
			</div>
			<div class="mx-5 grid max-h-[75vh] grid-cols-12 gap-2 overflow-y-auto">
				<div class="col-span-12">
					<!-- 
					
					
						multi
						on:itemClick={(e) => {
							if (to.includes(e.detail.itemId)) {
								to = to.filter((item) => item !== e.detail.itemId);
								return;
							}
							to = [...to, e.detail.itemId];
						}}-->
					<List
						items={STATES}
						selected={to}
						on:itemClick={(e) => {
							to = e.detail.itemId;
							goto(`permutas/?from=${from}&to=${to}`);
						}}
					/>
					<!-- Create an arrow down indicating that the user should scroll down 
					  -->
				</div>
			</div>
		</div>
		<div class="dark:bg-light-10 col-span-12 flex flex-col sm:col-span-6">
			<div class="flex h-screen w-full flex-col">
				<div class={'h-screen w-full overflow-y-auto'}>
					<div class="w-full">
						<div class="flex flex-col items-start justify-between px-5 pt-10">
							<h4 class="mb-5 w-full text-2xl font-bold text-gray-900 dark:text-white">
								3. Selecione uma Permuta
							</h4>
							<p class="text-sm text-gray-500">
								Aqui serão mostradas as permutas disponíveis para o seu estado de origem e destinos
								selecionados. Clique em um nome para iniciar uma conversa no Whatsapp.
							</p>
						</div>
					</div>
					<div class="border-dark-a10 dark:border-dark-a30 flex gap-5 border-b-2 px-5 pt-5">
						{#each Object.values(TABS) as tab}
							<div
								class="
									relative flex
									flex-row text-base font-bold leading-none {activeTab === tab ? 'text-yellow-60' : ''}"
							>
								<button
									class="pb-3 pt-5 capitalize outline-none"
									on:click={() => (activeTab = tab)}
								>
									{tab}
								</button>
								{#if activeTab === tab}
									<div
										class="bg-yellow-60 pointer-events-none absolute -bottom-[2px] left-0 right-0 h-[2px] w-full"
									/>
								{/if}
							</div>
						{/each}
					</div>

					{#if activeTab === TABS.PM}
						<div
							class="mt-2 grid grid-cols-4 gap-1 px-5
							"
						>
							<div class="truncate font-bold">Nome</div>
							<div class="truncate font-bold">Graduação</div>
							<div class="truncate font-bold">Origem</div>
							<div class="truncate font-bold">Destino</div>
						</div>
						{#if from && to && data.users.length}
							{#each [...data.users, ...data.users, ...data.users] as user, index}
								<div
									tabindex="0"
									role="button"
									on:keydown={() => {}}
									on:click={() => {
										window.open(`https://wa.me/${user.whatsapp}`, '_blank');
									}}
									class="m-2 mt-2 grid cursor-pointer grid-cols-4 gap-2 rounded-lg p-2 px-5 dark:bg-gray-700
									
								{index % 2 === 0 ? 'bg-gray-100 dark:bg-gray-800' : ''}"
								>
									<div class="truncate text-sm">
										{user.nome}
									</div>
									<div class="truncate text-sm">{user.graduacao}</div>
									<div class="truncate text-sm">{user.estado_origem}</div>
									<div class="truncate text-sm">{JSON.stringify(user.estados_destino)}</div>
								</div>
							{/each}
						{:else}
							<div class="mx-5 mt-5 flex items-center justify-start text-sm">
								<p class="text-gray-500">
									Não há permutas disponíveis para os estados selecionados.
								</p>
							</div>
						{/if}
					{/if}

					{#if activeTab === TABS.BM}
						In development...
					{/if}
				</div>
			</div>
		</div>
	</div>
{/if}
