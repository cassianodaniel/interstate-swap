import { writable } from "svelte/store";

export const session = writable({
	access_token: "",
	user: {
		user_metadata: {
			name: "",
			/// ...
		},
	},
});

export const pmsAccounts = writable([]);
