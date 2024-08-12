import * as edgedb from 'edgedb';
import e from '../../../../edgedb';

const client = edgedb.createClient()/* .withConfig({
	allow_user_specified_id: true
}); */

export async function load(params) {
	const url = new URL(params?.url);
	const searchParams = url?.searchParams;
	const from = searchParams?.get('from')?.toUpperCase() || ''
	const to = searchParams?.get('to')?.toUpperCase() || ''

	const usersQuery = e.select(e.users.Users.User, (user) => ({
		...e.users.Users.User['*'],
		/* 
		filter: e.op(
			e.op(user.user_to, '=', from),
			'and',
			// e.op(user.next_target, '=', to)
			e.op(user.next_target, '=', to)
		) */
	}));

	const users = await usersQuery.run(client)
	return {
		users: users
	}
}