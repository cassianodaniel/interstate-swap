<script>
	import { goto } from '$app/navigation';
	import Banner from '$lib/assets/banner.png';
	import { Input } from 'flowbite-svelte';

	import ArrowLeft from '$lib/assets/arrow-left.svg';
	let password;
	let confirmPassword;
</script>

<div class="flex h-screen w-screen flex-col sm:flex-row">
	<div class="hidden h-full w-full items-center justify-center bg-[#060A2B] sm:flex sm:w-1/2">
		<img src={Banner} alt="banner" />
	</div>
	<div class="mt-10 flex h-full w-full items-start justify-center sm:mt-0 sm:w-1/2 sm:items-center">
		<div class="mx-10 flex max-w-[393px] flex-col items-center justify-center gap-3">
			<div class="mb-12 flex flex-col items-start justify-center">
				<img
					class="mb-4 cursor-pointer"
					role="button"
					on:keypress={() => {}}
					on:click={() => goto('/cadastrar/email')}
					src={ArrowLeft}
					alt="This is an arrow to get back to the last loaded page"
				/>
				<h1 class="text-[36px] font-bold leading-10">Qual senha você deseja cadastrar?</h1>
				<h2 class="mt-2 text-[18px]">
					Escolha uma senha forte. É importante para manter sua conta segura.
				</h2>
			</div>
			<Input
				placeholder="Senha"
				defaultClass="block w-full disabled:cursor-not-allowed disabled:opacity-50 rtl:text-right !placeholder:black !w-full !rounded-[20px] !border-[#060A2B] !px-4 !py-3 !text-black"
				type="password"
				value={password}
				size="lg"
			></Input>
			<Input
				placeholder="Confirmar senha"
				defaultClass="block w-full disabled:cursor-not-allowed disabled:opacity-50 rtl:text-right !placeholder:black !w-full !rounded-[20px] !border-[#060A2B] !px-4 !py-3 !text-black"
				type="password"
				value={confirmPassword}
				size="lg"
			></Input>
			<button
				on:click={() => goto('/permutas')}
				class="w-full rounded-[20px] bg-[#060A2B] px-4 py-3 text-white"
				type="button">Avançar</button
			>
		</div>
	</div>
</div>
