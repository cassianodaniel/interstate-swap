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

/** @type {import('./$types').Actions} */
/* export const actions = {
	'submit-configuration': async ({ request }) => {
		const data = await request.formData();
		const form = Object.fromEntries(data.entries());
		const configurationId = form.id;

		const queries = {
			insertGeneralInfoQuery: e.insert(e.dbr.transaction_data.Configuration, form),
			updateGeneralInfoQuery: e.update(e.dbr.transaction_data.Configuration, () => ({
				filter_single: { id: configurationId },
				set: {
					...form,
					id: undefined
				}
			}))
		};

		async function upsertData() {
			let alreadyExists = Boolean(configurationId);
			if (alreadyExists) {
				await queries.updateGeneralInfoQuery.run(client);
			} else {
				await queries.insertGeneralInfoQuery.run(client);
			}

			return {
				status: 200,
				data: form
			};
		}

		try {
			const zodSchema = DBR_SCHEMAS.CONFIGURATION;
			zodSchema.parse(form);
		} catch (err) {
			const validationError = fromZodError(err);
			return {
				data: form,
				errors: validationError?.details,
				status: 400
			};
		}

		try {
			return await upsertData();
		} catch (err) {
			return {
				data: form,
				errors: [err.message],
				status: 400
			};
		}
	},
	'submit-missing-transaction': async ({ request }) => {
		const data = await request.formData();
		const form = Object.fromEntries(data.entries());
		const date = form.date;
		try {
			const createBankTransaction = e.insert(e.dbr.transaction_data.BankTransaction, {
				value: e.cast(e.int32, form.amount * 100),
				description: e.cast(e.str, form.description),
				notes: e.cast(e.str, form.notes),
				direction: form.direction,
				transaction_date: e.cast(e.str, date),
				BankAccount: e.select(e.dbr.transaction_data.BankAccount, () => ({
					filter_single: {
						id: form.bank_account_id
					}
				}))
			});

			const createdBankTransaction = await createBankTransaction.run(client);

			const createTransactionState = e.insert(e.dbr.transaction_data.TransactionState, {
				state: e.cast(e.dbr.TransactionState, form.transaction_state),
				BankTransaction: e.select(e.dbr.transaction_data.BankTransaction, () => ({
					filter_single: {
						id: createdBankTransaction.id
					}
				}))
			});

			const createdTransactionState = await createTransactionState.run(client);

			if (createTransactionState?.id) {
				const analyticsTypeQuery = e.select(e.analytics.AnalyticsType, () => ({
					...e.analytics.AnalyticsType['*'],
					filter_single: {
						analytics_type: e.cast(e.analytics.EventTypes, 'created_missing_transaction')
					}
				}));

				const analyticsType = await analyticsTypeQuery.run(client);

				const createdMissingTransactionSchema = await analyticsType?.json_schema_type;

				if (createdMissingTransactionSchema) {
					const createdTransaction = await e
						.select(e.dbr.transaction_data.BankTransaction, () => ({
							...e.dbr.transaction_data.BankTransaction['*'],
							TransactionState: e.dbr.transaction_data.TransactionState['*'],
							BankAccount: e.dbr.transaction_data.BankAccount['*'],
							filter_single: {
								id: createdBankTransaction.id
							}
						}))
						.run(client);
					const instance = {
						id: createdTransaction.id,
						updated_at: createdTransaction.updated_at?.toISOString(),
						created_at: createdTransaction.created_at?.toISOString(),
						description: createdTransaction.description,
						direction: [createdTransaction.direction],
						transaction_date: createdTransaction.transaction_date,
						placeholder_url: createdTransaction.placeholder_url,
						offset_url: createdTransaction.offset_url,
						notes: createdTransaction.notes,
						value: createdTransaction.value,
						BankAccount: {
							id: createdTransaction.BankAccount?.id,
							name: createdTransaction.BankAccount?.name,
							updated_at: createdTransaction.BankAccount?.updated_at?.toISOString(),
							created_at: createdTransaction.BankAccount?.created_at?.toISOString()
						},
						TransactionState: {
							...createdTransaction?.TransactionState?.[0],
							updated_at: createdTransaction?.TransactionState[0]?.updated_at?.toISOString(),
							created_at: createdTransaction?.TransactionState[0]?.created_at?.toISOString(),
							state: [createdTransaction?.TransactionState[0]?.state]
						}
					};

					const validation = validate(instance, createdMissingTransactionSchema);

					if (validation.errors.length) {
						throw new Error('Invalid request data');
					}

					e.insert(e.analytics.AnalyticsEvent, {
						EventType: e.select(e.analytics.AnalyticsType, () => ({
							filter_single: {
								analytics_type: e.cast(e.analytics.EventTypes, 'created_missing_transaction')
							}
						})),
						payload: instance
					}).run(client);
				} else {
					throw new Error('AnalyticsType schema is not available');
				}
			}

			const configurationQuery = e.select(
				e.dbr.transaction_data.Configuration,
				(configuration) => ({
					...e.dbr.transaction_data.Configuration['*'],
					PMSAccount: e.dbr.pms.PMSAccount['*'],
					BankAccount: e.select(e.dbr.transaction_data.BankAccount, (bankAccount) => ({
						...e.dbr.transaction_data.BankAccount['*'],
						BankTransaction: e.select(e.dbr.transaction_data.BankTransaction, (transaction) => ({
							...e.dbr.transaction_data.BankTransaction['*'],
							order_by: {
								expression: transaction.created_at,
								direction: e.DESC,
								empty: e.EMPTY_LAST
							},
							CurrentTransactionState: {
								...e.dbr.transaction_data.BankTransaction.CurrentTransactionState['*']
							},
							filter: e.op(
								e.op(
									e.op(transaction.BankAccount.Configuration.id, '=', configuration.id),
									'and',
									e.op(transaction.isDeleted, '=', false)
								),
								'and',
								e.op(transaction.BankAccount.id, '=', bankAccount.id)
							)
						})),
						filter: e.op(bankAccount.Configuration.id, '=', configuration.id)
					})),
					order_by: {
						expression: configuration.created_at,
						direction: e.ASC,
						empty: e.EMPTY_LAST
					},
					filter: e.op(
						e.op(configuration.id, '=', e.cast(e.uuid, form.configuration_id)),
						'and',
						e.op(configuration.isDeleted, '=', false)
					)
				})
			);

			const configuration = await configurationQuery.run(client);

			return {
				status: 200,
				data: {
					form,
					createdBankTransaction,
					createdTransactionState,
					bankAccounts: [],
					configuration
				}
			};
		} catch (e) {
			return {
				status: 400,
				data: {
					form
				},
				errors: [e.message]
			};
		}
	}
};
 */