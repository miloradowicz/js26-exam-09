export interface Transaction {
  id: string;
  categoryId: string;
  amount: number;
  createdAt: string;
}

export interface Category {
  id: string;
  type: 'income' | 'expense';
  name: string;
}

export type TransactionBase = Omit<Transaction, 'id'>;

export type CategoryBase = Omit<Category, 'id'>;

export type APIIdentifier = {
  name: string;
};

export type APIContainer<T> = {
  [name: string]: T;
};
