<script>
	import { goto } from '$app/navigation';
	import Banner from '$lib/assets/banner.png';
	import { Input } from 'flowbite-svelte';

	let login;
	let password;
</script>

<div class="flex h-screen w-screen flex-col sm:flex-row">
	<div class="flex h-full w-full items-center justify-center bg-[#060A2B] sm:w-1/2">
		<img src={Banner} alt="banner" />
	</div>
	<div class="flex h-full w-full items-center justify-center sm:w-1/2">
		<div class="mx-5 flex flex-col items-center justify-center gap-3">
			<div class="mb-12 flex flex-col items-center justify-center">
				<h1 class="text-center text-[30px] font-bold leading-10 sm:text-[36px]">
					Faça login para continuar
				</h1>
				<h2 class="mt-2 text-[18px]">Digite seu login e senha.</h2>
			</div>

			<!-- class="" -->
			<Input
				placeholder="Login"
				defaultClass="block w-full disabled:cursor-not-allowed disabled:opacity-50 rtl:text-right !placeholder:black !w-full !rounded-[20px] !border-[#060A2B] !px-4 !py-3 !text-black"
				type="text"
				value={login}
				size="lg"
			></Input>
			<Input
				placeholder="Senha"
				defaultClass="block w-full disabled:cursor-not-allowed disabled:opacity-50 rtl:text-right !placeholder:black !w-full !rounded-[20px] !border-[#060A2B] !px-4 !py-3 !text-black"
				type="password"
				value={password}
				size="lg"
			></Input>

			<!-- class="w-full rounded-[20px] border border-[#060A2B] px-4 py-3 font-semibold text-[#060A2B]" -->

			<span class=" text-gray-600">Esqueceu sua senha?</span>
			<button
				on:click={() => goto('/permutas')}
				class="mt-4 w-full rounded-[20px] bg-[#060A2B] px-4 py-3 text-white"
				type="button"
			>
				Entrar</button
			>
		</div>
	</div>
</div>
