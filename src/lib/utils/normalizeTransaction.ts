import { formatCurrency } from './formatCurrency';
import { formatDate } from './formatDate';

import type { RawTransaction } from '../../common/types';

export function normalizeTransaction(transaction: RawTransaction) {
  return {
    ...transaction,
    amount: formatCurrency(transaction.amount / 100),
    date: formatDate(transaction.date)
  };
}
