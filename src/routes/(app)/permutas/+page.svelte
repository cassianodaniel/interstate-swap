<script lang="ts">
	import WhatsappIcon from '$lib/assets/whatsapp.svg';
	import type { users } from '../../../../schema/interfaces.js';
	export let data: {
		users: users.Users.User[];
	};

	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';

	console.log(data);
</script>

<div class="w-screen">
	<Table>
		<TableHead>
			<TableHeadCell>Nome</TableHeadCell>
			<TableHeadCell>Posto/Graduação</TableHeadCell>
			<TableHeadCell>UF Origem</TableHeadCell>
			<TableHeadCell>UF Destino</TableHeadCell>
			<TableHeadCell>E-mail</TableHeadCell>
			<TableHeadCell>Whatsapp</TableHeadCell>
			<TableHeadCell>Observação</TableHeadCell>
			<TableHeadCell></TableHeadCell>
		</TableHead>
		{#each data.users as user}
			<TableBody tableBodyClass="divide-y">
				<TableBodyRow>
					<TableBodyCell>{user.name}</TableBodyCell>
					<TableBodyCell>{user.current_station}</TableBodyCell>
					<TableBodyCell>{user.current_origin}</TableBodyCell>
					<TableBodyCell>{user.next_target}</TableBodyCell>
					<TableBodyCell>{user.email}</TableBodyCell>
					<TableBodyCell>{user.whatsapp}</TableBodyCell>
					<TableBodyCell>{user.personal_notes}</TableBodyCell>
					<TableBodyCell>
						<a
							href={`https://wa.me/${user.whatsapp}`}
							target="_blank"
							class="flex flex-row items-center justify-start text-blue-500"
						>
							<img src={WhatsappIcon} height="24" width="24" alt="Whatsapp" />
							<span class="cursor-pointer pl-2 text-green-500 underline">
								Falar com {user.name}
							</span>
						</a>
					</TableBodyCell>
				</TableBodyRow>
			</TableBody>
		{/each}
	</Table>
</div>
