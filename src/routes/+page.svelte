<script>
	import { goto } from '$app/navigation';
	import Banner from '$lib/assets/banner.png';
	import GoogleIcon from '$lib/assets/flat-color-icons_google.svg';
</script>

<div class="flex h-screen w-screen flex-col sm:flex-row">
	<div class="flex h-full w-full items-center justify-center bg-[#060A2B] sm:w-1/2">
		<img src={Banner} alt="banner" />
	</div>
	<div class="flex h-full w-full items-center justify-center sm:w-1/2">
		<div class="flex min-w-[393px] flex-col items-center justify-center gap-3">
			<div class="mb-12 flex flex-col items-center justify-center">
				<h1 class="text-[36px] font-bold">Seja bem-vindo!</h1>
				<h2 class="text-[18px]">Como deseja acessar?</h2>
			</div>
			<button
				on:click={() => goto('/cadastrar/whatsapp')}
				class="w-full rounded-[20px] bg-[#060A2B] px-4 py-3 text-white"
				type="button">Cadastrar</button
			>
			<button
				on:click={() => goto('/entrar')}
				class="w-full rounded-[20px] border border-[#060A2B] px-4 py-3 font-semibold text-[#060A2B]"
				type="button">Entrar</button
			>
			<span>ou</span>
			<button
				on:click={() => goto('/permutas')}
				class="flex w-full items-center justify-center gap-2 rounded-[20px] border border-[#060A2B] px-4 py-3 font-semibold text-[#060A2B]"
				type="button"
			>
				<img src={GoogleIcon} alt="entrar com google" />

				Entrar com Google</button
			>
		</div>
	</div>
</div>
