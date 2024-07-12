<script>
	import {
		Accordion,
		AccordionItem,
		Alert,
		ArrowKeyDown,
		ArrowKeyLeft,
		ArrowKeyRight,
		ArrowKeyUp,
		Avatar,
		Badge,
		Banner,
		BottomNav,
		BottomNavItem,
		Button,
		ButtonGroup,
		Card,
		Checkbox,
		CloseButton,
		Drawer,
		Dropdown,
		DropdownItem,
		Dropzone,
		Fileupload,
		FloatingLabelInput,
		Helper,
		ImagePlaceholder,
		Kbd,
		Label,
		Li,
		List,
		Modal,
		NavBrand,
		NavHamburger,
		NavLi,
		NavUl,
		Navbar,
		P,
		Pagination,
		Popover,
		Progressbar,
		Radio,
		Search,
		Sidebar,
		SidebarDropdownItem,
		SidebarDropdownWrapper,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper,
		Skeleton,
		Spinner,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Timeline,
		TimelineItem,
		Toggle,
		Tooltip
	} from 'flowbite-svelte';
	import {
		AdjustmentsVerticalOutline,
		ArrowRightOutline,
		ArrowRightToBracketOutline,
		BellSolid,
		BullhornSolid,
		CartSolid,
		ChartPieSolid,
		ChevronDownOutline,
		ClockSolid,
		DotsHorizontalOutline,
		DotsVerticalOutline,
		EditOutline,
		EyeSolid,
		GridSolid,
		HomeSolid,
		InfoCircleSolid,
		MailBoxSolid,
		ShoppingBagSolid,
		UserCircleSolid,
		UserRemoveSolid,
		UsersSolid,
		WalletSolid
	} from 'flowbite-svelte-icons';
	import { sineIn, sineOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	let hidden2 = true;
	let spanClass = 'flex-1 ms-3 whitespace-nowrap';
	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};
	let defaultModal = false;
	let helper = { start: 1, end: 10, total: 100 };

	const previous = () => {
		alert('Previous btn clicked. Make a call to your server to fetch data.');
	};
	const next = () => {
		alert('Next btn clicked. Make a call to your server to fetch data.');
	};
	let value = [];
	const dropHandle = (event) => {
		value = [];
		event.preventDefault();
		if (event.dataTransfer.items) {
			[...event.dataTransfer.items].forEach((item, i) => {
				if (item.kind === 'file') {
					const file = item.getAsFile();
					value.push(file.name);
					value = value;
				}
			});
		} else {
			[...event.dataTransfer.files].forEach((file, i) => {
				value = file.name;
			});
		}
	};

	const handleChange = (event) => {
		const files = event.target.files;
		if (files.length > 0) {
			value.push(files[0].name);
			value = value;
		}
	};

	const showFiles = (files) => {
		if (files.length === 1) return files[0];
		let concat = '';
		files.map((file) => {
			concat += file;
			concat += ',';
			concat += ' ';
		});

		if (concat.length > 40) concat = concat.slice(0, 40);
		concat += '...';
		return concat;
	};
	let progress = '45';
</script>

<div class="flex flex-col gap-12">
	<div>
		<Alert>
			<span class="font-medium">Default alert!</span>
			Change a few things up and try submitting again.
		</Alert>
		<Alert color="blue">
			<span class="font-medium">Info alert!</span>
			Change a few things up and try submitting again.
		</Alert>
		<Alert color="red">
			<span class="font-medium">Danger alert!</span>
			Change a few things up and try submitting again.
		</Alert>
		<Alert color="green">
			<span class="font-medium">Success alert!</span>
			Change a few things up and try submitting again.
		</Alert>
		<Alert color="yellow">
			<span class="font-medium">Warning alert!</span>
			Change a few things up and try submitting again.
		</Alert>
		<Alert color="dark">
			<span class="font-medium">Dark alert!</span>
			Change a few things up and try submitting again.
		</Alert>
	</div>
	<div>
		<div>
			<div>
				<Button on:click={() => (defaultModal = true)}>Default modal</Button>
				<Modal title="Terms of Service" bind:open={defaultModal} autoclose>
					<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
						With less than a month to go before the European Union enacts new consumer privacy laws
						for its citizens, companies around the world are updating their terms of service
						agreements to comply.
					</p>
					<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
						The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on
						May 25 and is meant to ensure a common set of data rights in the European Union. It
						requires organizations to notify users as soon as possible of high-risk data breaches
						that could personally affect them.
					</p>
					<svelte:fragment slot="footer">
						<Button on:click={() => alert('Handle "success"')}>I accept</Button>
						<Button color="alternative">Decline</Button>
					</svelte:fragment>
				</Modal>
			</div>
			<div>
				<p class="m-12 text-gray-500 dark:text-gray-400">
					Please press <Kbd class="px-2 py-1.5">Ctrl</Kbd> + <Kbd class="px-2 py-1.5">Shift</Kbd> + <Kbd
						class="px-2 py-1.5">R</Kbd
					> to re-render an MDN page.
				</p>
			</div>
			<div>
				<div class="flex flex-col items-center justify-center gap-2">
					<div class="text-sm text-gray-700 dark:text-gray-400">
						Showing <span class="font-semibold text-gray-900 dark:text-white">{helper.start}</span>
						to
						<span class="font-semibold text-gray-900 dark:text-white">{helper.end}</span>
						of
						<span class="font-semibold text-gray-900 dark:text-white">{helper.total}</span>
						Entries
					</div>

					<Pagination table large>
						<span slot="prev">Prev</span>
					</Pagination>
				</div>
			</div>
			<div class="m-2">
				<Button id="offset">Default popover</Button>
				<Popover
					offset="30"
					class="w-64 text-sm font-light"
					title="Popover title"
					triggeredBy="#offset">And here's some amazing content. It's very engaging. Right?</Popover
				>
			</div>
			<div class="m-2">
				<Progressbar
					{progress}
					animate
					precision={2}
					labelOutside="With animation"
					labelInside
					tweenDuration={1500}
					easing={sineOut}
					size="h-6"
					labelInsideClass="bg-blue-600 text-blue-100 text-base font-medium text-center p-1 leading-none rounded-full"
					class="mb-8"
				/>
				<Progressbar
					{progress}
					labelOutside="Without animation"
					labelInside
					size="h-6"
					labelInsideClass="bg-blue-600 text-blue-100 text-base font-medium text-center p-1 leading-none rounded-full"
				/>
				<Button on:click={() => (progress = `${Math.round(Math.random() * 100)}`)} class="mt-8">
					Randomize
				</Button>
			</div>
			<div class="m-2">
				<Navbar rounded color="form">
					<NavBrand href="/">
						<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
							>Navigation</span
						>
					</NavBrand>
					<NavHamburger />
					<NavUl>
						<NavLi href="/" active={true}>Home</NavLi>
						<NavLi href="/about">About</NavLi>
						<NavLi href="/docs/components/navbar">Navbar</NavLi>
						<NavLi href="/pricing">Pricing</NavLi>
						<NavLi href="/contact">Contact</NavLi>
					</NavUl>
				</Navbar>
			</div>
			<div>
				<Table>
					<TableHead>
						<TableHeadCell>Key</TableHeadCell>
						<TableHeadCell>Description</TableHeadCell>
					</TableHead>
					<TableBody class="divide-y">
						<TableBodyRow>
							<TableBodyCell>
								<Kbd class="px-2 py-1.5">Shift</Kbd> or <Kbd class="px-2 py-1.5">Tab</Kbd>
							</TableBodyCell>
							<TableBodyCell>Navigate to interactive elements</TableBodyCell>
						</TableBodyRow>
						<TableBodyRow>
							<TableBodyCell>
								<Kbd class="px-2 py-1.5">Enter</Kbd> or <Kbd class="px-4 py-1.5">Space bar</Kbd>
							</TableBodyCell>
							<TableBodyCell
								>Ensure elements with ARIA role="button" can be activated with both key commands.</TableBodyCell
							>
						</TableBodyRow>
						<TableBodyRow>
							<TableBodyCell>
								<Kbd class="me-1 inline-flex items-center px-2 py-1.5">
									<ArrowKeyUp />
									<span class="sr-only">Arrow key up</span>
								</Kbd>
								<Kbd class="me-1 inline-flex items-center px-2 py-1.5">
									<ArrowKeyDown />
									<span class="sr-only">Arrow key down</span>
								</Kbd> or
								<Kbd class="me-1 inline-flex items-center px-2 py-1.5">
									<ArrowKeyLeft />
									<span class="sr-only">Arrow key left</span>
								</Kbd>
								<Kbd class="me-1 inline-flex items-center px-2 py-1.5">
									<ArrowKeyRight />
									<span class="sr-only">Arrow key right</span>
								</Kbd>
							</TableBodyCell>
							<TableBodyCell>Choose and activate previous/next tab.</TableBodyCell>
						</TableBodyRow>
					</TableBody>
				</Table>
			</div>
			<div
				id="bell"
				class="inline-flex items-center text-center text-sm font-medium text-gray-500 hover:text-gray-900 focus:outline-none dark:text-gray-400 dark:hover:text-white"
			>
				<BellSolid class="h-8 w-8" />
				<div class="relative flex">
					<div
						class="relative -top-2 end-4 inline-flex h-3 w-3 rounded-full border-2 border-white bg-red-500 dark:border-gray-900"
					/>
				</div>
			</div>
			<Dropdown
				triggeredBy="#bell"
				class="w-full max-w-sm divide-y divide-gray-100 rounded shadow dark:divide-gray-700 dark:bg-primary-50"
			>
				<div slot="header" class="py-2 text-center font-bold">Notifications</div>
				<DropdownItem class="flex space-x-4 rtl:space-x-reverse">
					<Avatar src="/images/profile-picture-1.webp" dot={{ color: 'bg-gray-300' }} rounded />
					<div class="w-full ps-3">
						<div class="mb-1.5 text-sm text-gray-500 dark:text-gray-400">
							New message from <span class="font-semibold text-gray-900 dark:text-white"
								>Jese Leos</span
							>
							: "Hey, what's up? All set for the presentation?"
						</div>
						<div class="text-xs text-primary-600 dark:text-primary-500">a few moments ago</div>
					</div>
				</DropdownItem>
				<DropdownItem class="flex space-x-4 rtl:space-x-reverse">
					<Avatar src="/images/profile-picture-2.webp" dot={{ color: 'bg-red-400' }} rounded />
					<div class="w-full ps-3">
						<div class="mb-1.5 text-sm text-gray-500 dark:text-gray-400">
							<span class="font-semibold text-gray-900 dark:text-white">Joseph Mcfall</span>
							and
							<span class="font-medium text-gray-900 dark:text-white">5 others</span>
							started following you.
						</div>
						<div class="text-xs text-primary-600 dark:text-primary-500">10 minutes ago</div>
					</div>
				</DropdownItem>
				<DropdownItem class="flex space-x-4 rtl:space-x-reverse">
					<Avatar src="/images/profile-picture-3.webp" dot={{ color: 'bg-green-400' }} rounded />
					<div class="w-full ps-3">
						<div class="mb-1.5 text-sm text-gray-500 dark:text-gray-400">
							<span class="font-semibold text-gray-900 dark:text-white">Bonnie Green</span>
							and
							<span class="font-medium text-gray-900 dark:text-white">141 others</span>
							love your story. See it and view more stories.
						</div>
						<div class="text-xs text-primary-600 dark:text-primary-500">44 minutes ago</div>
					</div>
				</DropdownItem>
				<a
					slot="footer"
					href="/"
					class="-my-1 block bg-gray-50 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 dark:bg-primary-50 dark:text-white dark:hover:bg-gray-700"
				>
					<div class="inline-flex items-center">
						<EyeSolid class="me-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
						View all
					</div>
				</a>
			</Dropdown>
		</div>
		<div>
			<DotsHorizontalOutline class="dots-menu dark:text-white" />
			<DotsVerticalOutline class="dots-menu dark:text-white" />
			<Dropdown triggeredBy=".dots-menu">
				<DropdownItem>Dashboard</DropdownItem>
				<DropdownItem>Settings</DropdownItem>
				<DropdownItem>Earnings</DropdownItem>
				<DropdownItem slot="footer">Sign out</DropdownItem>
			</Dropdown>
		</div>
		<div class="mb-2 mt-2">
			<Button on:click={() => (hidden2 = false)}>Show drawer navigation</Button>
		</div>
		<div>
			<Button
				>Dropdown search<ChevronDownOutline
					class="ms-2 h-6 w-6 text-white dark:text-white"
				/></Button
			>
			<Dropdown class="h-44 overflow-y-auto px-3 pb-3 text-sm">
				<div slot="header" class="p-3">
					<Search size="md" />
				</div>
				<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
					<Checkbox>Robert Gouth</Checkbox>
				</li>
				<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
					<Checkbox>Jese Leos</Checkbox>
				</li>
				<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
					<Checkbox checked>Bonnie Green</Checkbox>
				</li>
				<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
					<Checkbox>Jese Leos</Checkbox>
				</li>
				<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
					<Checkbox>Robert Gouth</Checkbox>
				</li>
				<li class="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600">
					<Checkbox>Bonnie Green</Checkbox>
				</li>
				<a
					slot="footer"
					href="/"
					class="-mb-1 flex items-center bg-gray-50 p-3 text-sm font-medium text-red-600 hover:bg-gray-100 hover:underline dark:bg-gray-700 dark:text-red-500 dark:hover:bg-gray-600"
				>
					<UserRemoveSolid class="me-2 h-4 w-4 text-primary-700 dark:text-primary-700" />Delete user
				</a>
			</Dropdown>
		</div>
		<Alert>
			<InfoCircleSolid slot="icon" class="h-5 w-5" />
			<span class="font-medium">Default alert!</span>
			Change a few things up and try submitting again.
		</Alert>
		<Alert color="blue">
			<InfoCircleSolid slot="icon" class="h-5 w-5" />
			<span class="font-medium">Info alert!</span>
			Change a few things up and try submitting again.
		</Alert>
		<Alert color="red">
			<InfoCircleSolid slot="icon" class="h-5 w-5" />
			<span class="font-medium">Danger alert!</span>
			Change a few things up and try submitting again.
		</Alert>
		<Alert color="green">
			<InfoCircleSolid slot="icon" class="h-5 w-5" />
			<span class="font-medium">Success alert!</span>
			Change a few things up and try submitting again.
		</Alert>
		<Alert color="yellow">
			<InfoCircleSolid slot="icon" class="h-5 w-5" />
			<span class="font-medium">Warning alert!</span>
			Change a few things up and try submitting again.
		</Alert>
		<Alert color="dark">
			<InfoCircleSolid slot="icon" class="h-5 w-5" />
			<span class="font-medium">Dark alert!</span>
			Change a few things up and try submitting again.
		</Alert>
	</div>

	<Alert border>
		<InfoCircleSolid slot="icon" class="h-5 w-5" />
		<span class="font-medium">Default alert!</span>
		Change a few things up and try submitting again.
	</Alert>
	<Alert border color="blue">
		<InfoCircleSolid slot="icon" class="h-5 w-5" />
		<span class="font-medium">Info alert!</span>
		Change a few things up and try submitting again.
	</Alert>
	<Alert border color="red">
		<InfoCircleSolid slot="icon" class="h-5 w-5" />
		<span class="font-medium">Danger alert!</span>
		Change a few things up and try submitting again.
	</Alert>
	<Alert border color="green">
		<InfoCircleSolid slot="icon" class="h-5 w-5" />
		<span class="font-medium">Success alert!</span>
		Change a few things up and try submitting again.
	</Alert>
	<Alert border color="yellow">
		<InfoCircleSolid slot="icon" class="h-5 w-5" />
		<span class="font-medium">Warning alert!</span>
		Change a few things up and try submitting again.
	</Alert>
	<Alert border color="dark">
		<InfoCircleSolid slot="icon" class="h-5 w-5" />
		<span class="font-medium">Dark alert!</span>
		Change a few things up and try submitting again.
	</Alert>
	<div>
		<Alert class="!items-start">
			<span slot="icon">
				<InfoCircleSolid slot="icon" class="h-5 w-5" />
				<span class="sr-only">Info</span>
			</span>
			<p class="font-medium">Ensure that these requirements are met:</p>
			<ul class="ms-4 mt-1.5 list-inside list-disc">
				<li>At least 10 characters (and up to 100 characters)</li>
				<li>At least one lowercase character</li>
				<li>Inclusion of at least one special character, e.g., ! @ # ?</li>
			</ul>
		</Alert>
		<Alert color="blue" class="!items-start">
			<span slot="icon">
				<InfoCircleSolid slot="icon" class="h-5 w-5" />
				<span class="sr-only">Info</span>
			</span>
			<p class="font-medium">Ensure that these requirements are met:</p>
			<List class="ms-4 mt-1.5">
				<Li>At least 10 characters (and up to 100 characters)</Li>
				<Li>At least one lowercase character</Li>
				<Li>Inclusion of at least one special character, e.g., ! @ # ?</Li>
			</List>
		</Alert>
	</div>
	<div>
		<Alert dismissable>
			<InfoCircleSolid slot="icon" class="h-5 w-5" />
			A simple default alert with an
			<a href="/" class="font-semibold underline hover:text-blue-800 dark:hover:text-blue-900"
				>example link</a
			>
			. Give it a click if you like.
		</Alert>
		<Alert color="blue" dismissable>
			<InfoCircleSolid slot="icon" class="h-5 w-5" />
			A simple info alert with an
			<a href="/" class="font-semibold underline hover:text-blue-800 dark:hover:text-blue-900"
				>example link</a
			>
			. Give it a click if you like.
		</Alert>
		<Alert color="red" dismissable>
			<InfoCircleSolid slot="icon" class="h-5 w-5" />
			A simple info alert with an
			<a href="/" class="font-semibold underline hover:text-red-800 dark:hover:text-red-900"
				>example link</a
			>
			. Give it a click if you like.
		</Alert>
		<Alert color="green" dismissable>
			<InfoCircleSolid slot="icon" class="h-5 w-5" />
			A simple info alert with an
			<a href="/" class="font-semibold underline hover:text-green-800 dark:hover:text-green-900"
				>example link</a
			>
			. Give it a click if you like.
		</Alert>
		<Alert color="yellow" dismissable transition={fly} params={{ x: 200 }}>
			<InfoCircleSolid slot="icon" class="h-5 w-5" />
			An alert with non default animation - fly away.
		</Alert>
		<Alert color="dark" dismissable>
			<InfoCircleSolid slot="icon" class="h-5 w-5" />
			An alert with the custom dismissal button.
			<Button slot="close-button" size="xs" let:close on:click={close} class="ms-auto"
				>Dissmiss</Button
			>
		</Alert>
	</div>
	<div>
		<Alert rounded={false} class="border-t-4">
			<InfoCircleSolid slot="icon" class="h-5 w-5" />
			<span class="font-medium">Info alert!</span>
			Change a few things up and try submitting again.
		</Alert>
		<Alert color="red" rounded={false} class="border-t-4">
			<InfoCircleSolid slot="icon" class="h-5 w-5" />
			<span class="font-medium">Danger alert!</span>
			Change a few things up and try submitting again.
		</Alert>
		<Alert color="green" rounded={false} class="border-t-4">
			<InfoCircleSolid slot="icon" class="h-5 w-5" />
			<span class="font-medium">Success alert!</span>
			Change a few things up and try submitting again.
		</Alert>
		<Alert color="yellow" rounded={false} class="border-t-4">
			<InfoCircleSolid slot="icon" class="h-5 w-5" />
			<span class="font-medium">Warning alert!</span>
			Change a few things up and try submitting again.
		</Alert>
		<Alert color="dark" rounded={false} class="flex-row-reverse border-t-4">
			<InfoCircleSolid slot="icon" class="h-5 w-5" />
			<span class="font-medium">Dark alert!</span>
			Change a few things up and try submitting again.
		</Alert>
	</div>
	<div>
		<Alert>
			<div class="flex items-center gap-3">
				<InfoCircleSolid slot="icon" class="h-5 w-5" />
				<span class="text-lg font-medium">This is a info alert</span>
			</div>
			<p class="mb-4 mt-2 text-sm">
				More info about this info alert goes here. This example text is going to run a bit longer so
				that you can see how spacing within an alert works with this kind of content.
			</p>
			<div class="flex gap-2">
				<Button size="xs"><EyeSolid class="me-2 h-4 w-4" />View more</Button>
				<Button size="xs" outline>Go to Home</Button>
			</div>
		</Alert>
		<Alert color="green">
			<div class="flex items-center gap-3">
				<InfoCircleSolid slot="icon" class="h-5 w-5" />
				<span class="text-lg font-medium">This is a info alert</span>
			</div>
			<p class="mb-4 mt-2 text-sm">
				More info about this info alert goes here. This example text is going to run a bit longer so
				that you can see how spacing within an alert works with this kind of content.
			</p>
			<div class="flex gap-2">
				<Button size="xs" color="green"><EyeSolid class="me-2 h-4 w-4" />View more</Button>
				<Button size="xs" outline color="green">Go to Home</Button>
			</div>
		</Alert>
	</div>
	<div>
		<Accordion>
			<AccordionItem>
				<span slot="header">My Header 1</span>
				<p class="mb-2 text-gray-500 dark:text-gray-400">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus sint
					explicabo ...
				</p>
				<p class="text-gray-500 dark:text-gray-400">
					Check out this guide to learn how to <a
						href="/"
						target="_blank"
						rel="noreferrer"
						class="text-blue-600 hover:underline dark:text-blue-500"
					>
						get started
					</a>
					and start developing websites even faster with components on top of Tailwind CSS.
				</p>
			</AccordionItem>
			<AccordionItem>
				<span slot="header">My Header 2</span>
				<p class="mb-2 text-gray-500 dark:text-gray-400">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus sint
					explicabo ...
				</p>
				<p class="mb-2 text-gray-500 dark:text-gray-400">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus sint
					explicabo ...
				</p>
				<p class="mb-2 text-gray-500 dark:text-gray-400">Learn more about these technologies:</p>
				<ul class="list-disc ps-5 text-gray-500 dark:text-gray-400">
					<li>
						<a
							href="/"
							target="_blank"
							rel="noreferrer"
							class="text-blue-600 hover:underline dark:text-blue-500"
						>
							Lorem ipsum
						</a>
					</li>
					<li>
						<a
							href="https://tailwindui.com/"
							rel="noreferrer"
							target="_blank"
							class="text-blue-600 hover:underline dark:text-blue-500"
						>
							Tailwind UI
						</a>
					</li>
				</ul>
			</AccordionItem>
		</Accordion>
	</div>

	<div>
		<Accordion>
			<AccordionItem open>
				<span slot="header">Header 2-1</span>
				<p class="mb-2 text-gray-500 dark:text-gray-400">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus sint
					explicabo ...
				</p>
			</AccordionItem>
			<AccordionItem>
				<span slot="header">Header 2-2</span>
				<p class="mb-2 text-gray-500 dark:text-gray-400">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo ab necessitatibus sint
					explicabo ...
				</p>
			</AccordionItem>
		</Accordion>
	</div>

	<div>
		<Avatar />
		<Avatar rounded />
		<Avatar border />
		<Avatar rounded border />
		<Avatar>JL</Avatar>
	</div>

	<div>
		<Badge>Default</Badge>
		<Badge color="dark">Dark</Badge>
		<Badge color="red">Red</Badge>
		<Badge color="green">Green</Badge>
		<Badge color="yellow">Yellow</Badge>
		<Badge color="indigo">Indigo</Badge>
		<Badge color="purple">Purple</Badge>
		<Badge color="pink">Pink</Badge>
		<Badge large>Default</Badge>
		<Badge large color="dark">Dark</Badge>
		<Badge large color="red">Red</Badge>
		<Badge large color="green">Green</Badge>
		<Badge large color="yellow">Yellow</Badge>
		<Badge large color="indigo">Indigo</Badge>
		<Badge large color="purple">Purple</Badge>
		<Badge large color="pink">Pink</Badge>
		<Badge border>Default</Badge>
		<Badge border color="dark">Dark</Badge>
		<Badge border color="red">Red</Badge>
		<Badge border color="green">Green</Badge>
		<Badge border color="yellow">Yellow</Badge>
		<Badge border color="indigo">Indigo</Badge>
		<Badge border color="purple">Purple</Badge>
		<Badge border color="pink">Pink</Badge>
		<Badge rounded>Default</Badge>
		<Badge rounded color="dark">Dark</Badge>
		<Badge rounded color="red">Red</Badge>
		<Badge rounded color="green">Green</Badge>
		<Badge rounded color="yellow">Yellow</Badge>
		<Badge rounded color="indigo">Indigo</Badge>
		<Badge rounded color="purple">Purple</Badge>
		<Badge rounded color="pink">Pink</Badge>
		<Badge href="/">Badge link</Badge>
		<Badge href="/" large>Badge link</Badge>
		<Badge href="/" border>Badge link</Badge>
		<Badge href="/" rounded>Badge link</Badge>
		<Badge color="dark" border>
			<ClockSolid class="me-1.5 h-2.5 w-2.5" />
			3 days ago
		</Badge>
		<Badge border>
			<ClockSolid class="me-1.5 h-2.5 w-2.5 text-primary-800 dark:text-primary-400" />
			2 minutes ago
		</Badge>
	</div>

	<div>
		<Skeleton class="py-4" />
		<ImagePlaceholder class="py-4" />

		<Banner id="default-banner" position="absolute">
			<p class="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
				<span class="me-3 inline-flex rounded-full bg-gray-200 p-1 dark:bg-gray-600">
					<BullhornSolid class="h-3 w-3 text-gray-500 dark:text-gray-400" />
					<span class="sr-only">Light bulb</span>
				</span>
				<span>
					New brand identity has been launched for the <a
						href="https://flowbite.com"
						class="decoration-600 dark:decoration-500 inline font-medium text-primary-600 underline decoration-solid underline-offset-2 hover:no-underline dark:text-primary-500"
					>
						Flowbite Library
					</a>
				</span>
			</p>
		</Banner>
	</div>
	<div>
		<Skeleton class="py-4" />
		<ImagePlaceholder class="pb-20" />

		<BottomNav position="fixed bottom-0" classInner="grid-cols-4">
			<BottomNavItem btnName="Home">
				<HomeSolid
					class="mb-1 h-6 w-6 text-gray-500 group-hover:text-primary-600 dark:text-gray-400 dark:group-hover:text-primary-500"
				/>
			</BottomNavItem>
			<BottomNavItem btnName="Wallet">
				<WalletSolid
					class="mb-1 h-6 w-6 text-gray-500 group-hover:text-primary-600 dark:text-gray-400 dark:group-hover:text-primary-500"
				/>
			</BottomNavItem>
			<BottomNavItem btnName="Settings">
				<AdjustmentsVerticalOutline
					class="mb-1 h-6 w-6 text-gray-500 group-hover:text-primary-600 dark:text-gray-400 dark:group-hover:text-primary-500"
				/>
			</BottomNavItem>
			<BottomNavItem btnName="Profile">
				<UserCircleSolid
					class="mb-1 h-6 w-6 text-gray-500 group-hover:text-primary-600 dark:text-gray-400 dark:group-hover:text-primary-500"
				/>
			</BottomNavItem>
		</BottomNav>
	</div>
	<div>
		<ButtonGroup>
			<Button>Profile</Button>
			<Button>Settings</Button>
			<Button>Messages</Button>
		</ButtonGroup>

		<Button>Default</Button>
		<Button color="alternative">Alternative</Button>
		<Button color="dark">Dark</Button>
		<Button color="light">Light</Button>
		<Button color="blue">Blue</Button>
		<Button color="green">Green</Button>
		<Button color="red">Red</Button>
		<Button color="yellow">Yellow</Button>
		<Button color="purple">Purple</Button>
		<Button pill>Default</Button>
		<Button color="alternative" pill>Alternative</Button>
		<Button color="dark" pill>Dark</Button>
		<Button color="light" pill>Light</Button>
		<Button color="blue" pill>Blue</Button>
		<Button color="green" pill>Green</Button>
		<Button color="red" pill>Red</Button>
		<Button color="yellow" pill>Yellow</Button>
		<Button color="purple" pill>Purple</Button>
	</div>

	<Card href="/cards">
		<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			Noteworthy technology acquisitions 2021
		</h5>
		<p class="font-normal leading-tight text-gray-700 dark:text-gray-400">
			Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
			chronological order.
		</p>
	</Card>
	<div>
		<Drawer transitionType="fly" {transitionParams} bind:hidden={hidden2} id="sidebar2">
			<div class="flex items-center">
				<h5
					id="drawer-navigation-label-3"
					class="text-base font-semibold uppercase text-gray-500 dark:text-gray-400"
				>
					Menu
				</h5>
				<CloseButton on:click={() => (hidden2 = true)} class="mb-4 dark:text-white" />
			</div>
			<Sidebar>
				<SidebarWrapper divClass="overflow-y-auto py-4 px-3 rounded dark:bg-primary-50">
					<SidebarGroup>
						<SidebarItem label="Dashboard">
							<svelte:fragment slot="icon">
								<ChartPieSolid
									class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
								/>
							</svelte:fragment>
						</SidebarItem>
						<SidebarDropdownWrapper label="E-commerce">
							<svelte:fragment slot="icon">
								<CartSolid
									class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
								/>
							</svelte:fragment>
							<SidebarDropdownItem label="Products" />
							<SidebarDropdownItem label="Billing" />
							<SidebarDropdownItem label="Invoice" />
						</SidebarDropdownWrapper>
						<SidebarItem label="Kanban" {spanClass}>
							<svelte:fragment slot="icon">
								<GridSolid
									class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
								/>
							</svelte:fragment>
							<svelte:fragment slot="subtext">
								<span
									class="ms-3 inline-flex items-center justify-center rounded-full bg-gray-200 px-2 text-sm font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300"
								>
									Pro
								</span>
							</svelte:fragment>
						</SidebarItem>
						<SidebarItem label="Inbox" {spanClass}>
							<svelte:fragment slot="icon">
								<MailBoxSolid
									class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
								/>
							</svelte:fragment>
							<svelte:fragment slot="subtext">
								<span
									class="ms-3 inline-flex h-3 w-3 items-center justify-center rounded-full bg-primary-200 p-3 text-sm font-medium text-primary-600 dark:bg-primary-900 dark:text-primary-200"
								>
									3
								</span>
							</svelte:fragment>
						</SidebarItem>
						<SidebarItem label="Users">
							<svelte:fragment slot="icon">
								<UsersSolid
									class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
								/>
							</svelte:fragment>
						</SidebarItem>
						<SidebarItem label="Products">
							<svelte:fragment slot="icon">
								<ShoppingBagSolid
									class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
								/>
							</svelte:fragment>
						</SidebarItem>
						<SidebarItem label="Sign In">
							<svelte:fragment slot="icon">
								<ArrowRightToBracketOutline
									class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
								/>
							</svelte:fragment>
						</SidebarItem>
						<SidebarItem label="Sign Up">
							<svelte:fragment slot="icon">
								<EditOutline
									class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
								/>
							</svelte:fragment>
						</SidebarItem>
					</SidebarGroup>
				</SidebarWrapper>
			</Sidebar>
		</Drawer>
	</div>
	<div>
		<Button id="specific-button-anywhere-on-page">Hover on me</Button>
		<Tooltip triggeredBy="#specific-button-anywhere-on-page">Tooltip content</Tooltip>
	</div>
	<div class="ml-4">
		<Timeline>
			<TimelineItem title="Application UI code in Tailwind CSS" date="February 2022">
				<p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
					Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar,
					and pre-order E-commerce & Marketing pages.
				</p>
				<Button color="alternative">Learn more<ArrowRightOutline class="ms-2 h-5 w-5" /></Button>
			</TimelineItem>
			<TimelineItem title="Application UI code in Tailwind CSS" date="March 2022">
				<p class="text-base font-normal text-gray-500 dark:text-gray-400">
					All of the pages and components are first designed in Figma and we keep a parity between
					the two versions even as we update the project.
				</p>
			</TimelineItem>
			<TimelineItem title="Application UI code in Tailwind CSS" date="April 2022">
				<p class="text-base font-normal text-gray-500 dark:text-gray-400">
					Get started with dozens of web components and interactive elements built on top of
					Tailwind CSS.
				</p>
			</TimelineItem>
		</Timeline>
	</div>
	<div>
		<p class="text-xs dark:text-white">Flowbite</p>

		<p class="text-sm dark:text-white">FlowBite</p>

		<p class="text-base dark:text-white">FlowBite</p>

		<p class="text-lg dark:text-white">FlowBite</p>

		<p class="text-xl dark:text-white">FlowBite</p>

		<p class="text-2xl dark:text-white">FlowBite</p>
	</div>
	<div>
		<Label class="py-2" for="larg_size">Large file input</Label>
		<Fileupload id="larg_size" size="lg" />
		<Dropzone
			id="dropzone"
			on:drop={dropHandle}
			on:dragover={(event) => {
				event.preventDefault();
			}}
			on:change={handleChange}
		>
			<svg
				aria-hidden="true"
				class="mb-3 h-10 w-10 text-gray-400"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
				/></svg
			>
			{#if value.length === 0}
				<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
					<span class="font-semibold">Click to upload</span> or drag and drop
				</p>
				<p class="text-xs text-gray-500 dark:text-gray-400">
					SVG, PNG, JPG or GIF (MAX. 800x400px)
				</p>
			{:else}
				<p>{showFiles(value)}</p>
			{/if}
		</Dropzone>
		<div id="exampleWrapper" class="grid w-full items-end gap-6 md:grid-cols-3">
			<FloatingLabelInput
				style="filled"
				id="disabled_filled"
				name="disabled_filled"
				type="text"
				disabled
			>
				Disabled filled
			</FloatingLabelInput>
			<FloatingLabelInput
				style="outlined"
				id="disabled_outlined"
				name="disabled_outlined"
				type="text"
				disabled
			>
				Disabled outlined
			</FloatingLabelInput>
			<FloatingLabelInput id="disabled_standard" name="disabled_standard" type="text" disabled>
				Disabled standard
			</FloatingLabelInput>
		</div>
		<div class="mb-6 grid items-end gap-6 md:grid-cols-3">
			<div>
				<FloatingLabelInput
					color="green"
					style="filled"
					id="filled_success"
					aria-describedby="filled_success_help"
					name="filled_success"
					type="text"
				>
					Filled success
				</FloatingLabelInput>
				<Helper color="green">
					<span class="font-medium">Well done!</span>
					Some success message.
				</Helper>
			</div>
			<div>
				<FloatingLabelInput
					color="green"
					style="outlined"
					id="outlined_success"
					aria-describedby="outlined_success_help"
					name="outlined_success"
					type="text"
				>
					Outlined success
				</FloatingLabelInput>
				<Helper color="green">
					<span class="font-medium">Well done!</span>
					Some success message.
				</Helper>
			</div>
			<div>
				<FloatingLabelInput
					color="green"
					style="standard"
					id="standard_success"
					aria-describedby="standard_success_help"
					name="standard_success"
					type="text"
				>
					Standard success
				</FloatingLabelInput>
				<Helper color="green">
					<span class="font-medium">Well done!</span>
					Some success message.
				</Helper>
			</div>
		</div>
		<!-- Error messages -->
		<div class="mb-6 grid items-end gap-6 md:grid-cols-3">
			<div>
				<FloatingLabelInput
					color="red"
					style="filled"
					id="filled_error"
					aria-describedby="filled_error_help"
					name="filled_error"
					type="text"
				>
					Filled error
				</FloatingLabelInput>
				<Helper color="red">
					<span class="font-medium">Oh, snapp!</span>
					Some error message.
				</Helper>
			</div>
			<div>
				<FloatingLabelInput
					color="red"
					style="outlined"
					id="outlined_error"
					aria-describedby="outlined_error_help"
					name="outlined_success"
					type="text"
				>
					Outlined error
				</FloatingLabelInput>
				<Helper color="red">
					<span class="font-medium">Oh, snapp!</span>
					Some error message.
				</Helper>
			</div>
			<div>
				<FloatingLabelInput
					color="red"
					style="standard"
					id="standard_error"
					aria-describedby="standard_error_help"
					name="standard_success"
					type="text"
				>
					Standard error
				</FloatingLabelInput>
				<Helper color="red">
					<span class="font-medium">Oh, snapp!</span>
					Some error message.
				</Helper>
			</div>
		</div>
		<p class="mb-4 font-semibold text-gray-900 dark:text-white">Identification</p>
		<ul
			class="w-full items-center divide-x divide-gray-200 rounded-lg border border-gray-200 dark:divide-gray-600 dark:border-gray-600 dark:bg-primary-50 sm:flex rtl:divide-x-reverse"
		>
			<li class="w-full"><Radio name="hor-list" class="p-3">Svelte</Radio></li>
			<li class="w-full"><Radio name="hor-list" class="p-3">Vue JS</Radio></li>
			<li class="w-full"><Radio name="hor-list" class="p-3">React</Radio></li>
			<li class="w-full"><Radio name="hor-list" class="p-3">Angular</Radio></li>
		</ul>
		<Toggle color="red" checked>Red</Toggle>
		<Toggle color="green" checked>Green</Toggle>
		<Toggle color="purple" checked>Purple</Toggle>
		<Toggle color="yellow" checked>Yellow</Toggle>
		<Toggle color="teal" checked>Teal</Toggle>
		<Toggle color="orange" checked>Orange</Toggle>
	</div>
	<div class="mb-24">
		<Spinner />
		<Spinner color="gray" />
		<Spinner color="green" />
		<Spinner color="red" />
		<Spinner color="yellow" />
		<Spinner color="pink" />
		<Spinner color="purple" />
	</div>
	<div class="m-24">
		<P class="mb-3" weight="light" color="text-gray-500 dark:text-gray-400"
			>Track work across the enterprise through an open, collaborative platform. Link issues across
			Jira and ingest data from other software development tools, so your IT support and operations
			teams have richer contextual information to rapidly respond to requests, incidents, and
			changes.</P
		>
		<P class="mb-3" weight="light" color="text-gray-500 dark:text-gray-400"
			>Deliver great service experiences fast - without the complexity of traditional ITSM
			solutions.Accelerate critical development work, eliminate toil, and deploy changes with ease,
			with a complete audit trail for every change.</P
		>
	</div>
</div>
