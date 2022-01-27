export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  description: string;
  amount: string;
  date: string;
}

export interface RawTransaction {
  id: string;
  type: 'income' | 'expense';
  description: string;
  amount: number;
  date: number;
}
