/* import { json } from '@sveltejs/kit';
import * as edgedb from 'edgedb';
import e from '../../../../../edgedb';
import { TRANSACTION_STATE } from '../../../../lib/constants/index.ts';
import { validate } from './validator/index.ts';

const client = edgedb.createClient();

export const POST = async ({ request }) => {
	const req = await request.json();

	const createBCCInformation = async () => {
		try {
			const query = e.insert(e.dbr.transaction_data.BCCInformation, {
				email: req.value,
				Configuration: e.select(e.dbr.transaction_data.Configuration, () => ({
					filter_single: {
						id: req.id
					}
				}))
			});
			const result = await query.run(client);

			return json(result);
		} catch (e) {
			console.log(e);
		}
	};

	const createMissingTransaction = async () => {
		try {
			const createBankTransaction = e.insert(e.dbr.transaction_data.BankTransaction, {
				value: e.cast(e.int32, req.value),
				description: e.cast(e.str, req.description),
				notes: e.cast(e.str, req.notes),
				direction: req.direction,
				transaction_date: e.cast(e.str, req.transaction_date),
				BankAccount: e.select(e.dbr.transaction_data.BankAccount, () => ({
					filter_single: {
						id: req.bankAccountId
					}
				}))
			});

			const createdBankTransaction = await createBankTransaction.run(client);

			const createTransactionState = e.insert(e.dbr.transaction_data.TransactionState, {
				state: e.cast(e.dbr.TransactionState, req.transactionState),
				BankTransaction: e.select(e.dbr.transaction_data.BankTransaction, () => ({
					filter_single: {
						id: createdBankTransaction.id
					}
				}))
			});

			const createdTransactionState = await createTransactionState.run(client);

			return json(createdTransactionState);
		} catch (e) {
			console.log(e);
		}
	};

	const softDeleteConfiguration = async () => {
		try {
			const softDeleteConfigQuery = e.update(e.dbr.transaction_data.Configuration, (config) => ({
				filter: e.op(config.id, '=', e.cast(e.uuid, req.id)),
				set: {
					isDeleted: true,
					PMSAccount: null
				}
			}));

			const unsetPmsBankAccountsFromSoftDeletedConfiguration = e.update(
				e.dbr.transaction_data.BankAccount,
				(bankAccount) => ({
					filter: e.op(bankAccount.Configuration.id, '=', e.cast(e.uuid, req.id)),
					set: {
						BankAccount: null,
						PlaidBankAccount: null
					}
				})
			);

			const result = await softDeleteConfigQuery.run(client).then(async (data) => {
				if (data?.[0]?.id) {
					return await unsetPmsBankAccountsFromSoftDeletedConfiguration.run(client);
				}
			});

			return json(result);
		} catch (e) {
			console.log(e);
		}
	};

	const updatePlaidBankAccount = async () => {
		try {
			const query = e.update(e.dbr.transaction_data.BankAccount, (bankAccount) => ({
				filter: e.op(bankAccount.id, '=', e.cast(e.uuid, req.bank_account_id)),
				set: {
					PlaidBankAccount: e.select(e.dbr.plaid.PlaidBankAccount, () => ({
						filter_single: {
							id: req.plaid_bank_account_id
						}
					}))
				}
			}));

			const result = await query.run(client);

			return json(result);
		} catch (e) {
			console.log(e);
		}
	};

	const updateMissingTransactionState = async () => {
		const shouldUpdateToResolved = req.state === TRANSACTION_STATE.RESOLVED;

		if (shouldUpdateToResolved) {
			const instance = {
				id: req.missingTransaction.id,
				updated_at: req.missingTransaction.updated_at,
				created_at: req.missingTransaction.created_at,
				description: req.missingTransaction.description,
				direction: [req.missingTransaction.direction],
				transaction_date: req.missingTransaction.transaction_date,
				placeholder_url: req.missingTransaction.placeholder_url,
				offset_url: req.missingTransaction.offset_url,
				notes: req.missingTransaction.notes,
				value: req.missingTransaction.value,
				BankAccount: {
					id: req.missingTransaction.BankAccount?.id,
					name: req.missingTransaction.BankAccount?.name,
					updated_at: req.missingTransaction.BankAccount?.updated_at,
					created_at: req.missingTransaction.BankAccount?.created_at
				},
				TransactionState: {
					...req?.missingTransaction?.TransactionState?.[0],
					state: [req?.missingTransaction?.TransactionState[0]?.state]
				}
			};

			const analyticsTypeQuery = e.select(e.analytics.AnalyticsType, () => ({
				...e.analytics.AnalyticsType['*'],
				filter_single: {
					analytics_type: e.cast(e.analytics.EventTypes, 'reconciled_missing_transaction')
				}
			}));

			const analyticsType = await analyticsTypeQuery.run(client);

			const reconciledMissingTransactionSchema = await analyticsType?.json_schema_type;

			if (reconciledMissingTransactionSchema) {
				const validation = validate(instance, reconciledMissingTransactionSchema);

				if (validation.errors.length) {
					console.error(validation.errors);
					throw new Error('Invalid request data');
				}

				e.insert(e.analytics.AnalyticsEvent, {
					EventType: e.select(e.analytics.AnalyticsType, () => ({
						filter_single: {
							analytics_type: e.cast(e.analytics.EventTypes, 'reconciled_missing_transaction')
						}
					})),
					payload: instance
				}).run(client);
			} else {
				throw new Error('AnalyticsType schema is not available');
			}
		}

		try {
			const updateTransactionState = e.update(
				e.dbr.transaction_data.TransactionState,
				(transactionState) => ({
					filter: e.op(
						transactionState.BankTransaction.id,
						'=',
						e.cast(e.uuid, req.missingTransaction.id)
					),
					set: {
						state: e.cast(e.dbr.TransactionState, req.state)
					}
				})
			);

			const updateTransactionUrl = req.offset_url
				? e.update(e.dbr.transaction_data.BankTransaction, (transaction) => ({
					filter: e.op(transaction.id, '=', e.cast(e.uuid, req.missingTransaction.id)),
					set: {
						offset_url: e.cast(e.str, req.offset_url)
					}
				}))
				: req.placeholder_url
					? e.update(e.dbr.transaction_data.BankTransaction, (transaction) => ({
						filter: e.op(transaction.id, '=', e.cast(e.uuid, req.missingTransaction.id)),
						set: {
							placeholder_url: e.cast(e.str, req.placeholder_url)
						}
					}))
					: null;

			const result = await updateTransactionState.run(client).then(async () => {
				return updateTransactionUrl ? updateTransactionUrl.run(client) : null;
			});

			return json(result);
		} catch (e) {
			console.log(e);
		}
	};

	const softDeleteMissingTransaction = async () => {
		try {
			const query = e.update(e.dbr.transaction_data.BankTransaction, (transaction) => ({
				filter: e.op(e.cast(e.uuid, transaction.id), '=', e.cast(e.uuid, req.missingTransactionId)),
				set: {
					isDeleted: true
				}
			}));
			const result = await query.run(client);

			return json(result);
		} catch (e) {
			console.log(e);
			return e;
		}
	};

	switch (req.type) {
		case 'bcc':
			return createBCCInformation();
		case 'update-plaid-bank-account':
			return updatePlaidBankAccount();
		case 'transaction':
			return createMissingTransaction();
		case 'soft-delete-configuration':
			return softDeleteConfiguration();
		case 'update_missing_transaction':
			return updateMissingTransactionState();
		case 'soft-delete-transaction':
			return softDeleteMissingTransaction();
		default:
			return json({ error: 'There is no available table for this fetching request data!' });
	}
};

export const DELETE = async ({ request }) => {
	const req = await request.json();

	const deleteConfiguration = async () => {
		try {
			const query = e.delete(e.dbr.transaction_data.Configuration, (configuration) => ({
				filter: e.op(e.cast(e.uuid, configuration.id), '=', e.cast(e.uuid, req.id))
			}));
			const result = await query.run(client);
			return json(result);
		} catch (e) {
			console.log(e);
		}
	};

	switch (req.type) {
		case 'configuration':
			return deleteConfiguration();
		default:
			return json({ error: 'There is no available table for this fetching request data!' });
	}
};
 */