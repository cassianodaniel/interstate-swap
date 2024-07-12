import * as edgedb from 'edgedb';
import e from '../../../../edgedb';

const client = edgedb.createClient()/* .withConfig({
	allow_user_specified_id: true
}); */

export async function load() {
	const usersQuery = e.select(e.users.Users.User, () => ({
		...e.users.Users.User['*'],
	}));

	const users = await usersQuery.run(client)
	console.log(users);
	return {
		users: users
	}
}