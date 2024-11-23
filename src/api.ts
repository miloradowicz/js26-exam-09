import axios from 'axios';
import {
  APIContainer,
  APIIdentifier,
  Category,
  CategoryBase,
  Transaction,
  TransactionBase,
} from './types';

const baseURL =
  'https://js26-na-default-rtdb.europe-west1.firebasedatabase.app/exam-09/';

const api = axios.create({ baseURL });

type TransactionContainer = APIContainer<TransactionBase>;
type CategoryContainer = APIContainer<CategoryBase>;

const readAllTransactions = async (): Promise<Transaction[] | null> => {
  const endpoint = 'transactions.json';

  const { data, status, statusText } = await api.get<TransactionContainer>(
    endpoint
  );

  if (status !== 200) {
    throw new Error(statusText);
  }

  return data && Object.entries(data).map(([k, v]) => ({ ...v, id: k }));
};

const createTransaction = async (dish: TransactionBase) => {
  const endpoint = 'transactions.json';

  const { data, status, statusText } = await api.post<APIIdentifier>(
    endpoint,
    dish
  );

  if (status !== 200) {
    throw new Error(statusText);
  }

  return data.name;
};

const readTransaction = async (id: string): Promise<Transaction | null> => {
  const endpoint = `transactions/${id}.json`;

  const { data, status, statusText } = await api.get<TransactionBase | null>(
    endpoint
  );

  if (status !== 200) {
    throw new Error(statusText);
  }

  return data && { ...data, id };
};

const updateTransaction = async (
  id: string,
  dish: TransactionBase
): Promise<Transaction> => {
  const endpoint = `transactions/${id}.json`;

  const { data, status, statusText } = await api.put<TransactionBase>(
    endpoint,
    dish
  );

  if (status !== 200) {
    throw new Error(statusText);
  }

  return { ...data, id };
};

const deleteTransaction = async (id: string): Promise<void> => {
  const endpoint = `transactions/${id}.json`;

  const { status, statusText } = await api.delete(endpoint);

  if (status !== 200) {
    throw new Error(statusText);
  }
};

const readAllCategories = async (): Promise<Category[] | null> => {
  const endpoint = 'categories.json';

  const { data, status, statusText } = await api.get<CategoryContainer>(
    endpoint
  );

  if (status !== 200) {
    throw new Error(statusText);
  }

  return data && Object.entries(data).map(([k, v]) => ({ ...v, id: k }));
};

const createCategory = async (dish: CategoryBase) => {
  const endpoint = 'categories.json';

  const { data, status, statusText } = await api.post<APIIdentifier>(
    endpoint,
    dish
  );

  if (status !== 200) {
    throw new Error(statusText);
  }

  return data.name;
};

const readCategory = async (id: string): Promise<Category | null> => {
  const endpoint = `categories/${id}.json`;

  const { data, status, statusText } = await api.get<CategoryBase | null>(
    endpoint
  );

  if (status !== 200) {
    throw new Error(statusText);
  }

  return data && { ...data, id };
};

const updateCategory = async (
  id: string,
  dish: CategoryBase
): Promise<Category> => {
  const endpoint = `categories/${id}.json`;

  const { data, status, statusText } = await api.put<CategoryBase>(
    endpoint,
    dish
  );

  if (status !== 200) {
    throw new Error(statusText);
  }

  return { ...data, id };
};

const deleteCategory = async (id: string): Promise<void> => {
  const endpoint = `categories/${id}.json`;

  const { status, statusText } = await api.delete(endpoint);

  if (status !== 200) {
    throw new Error(statusText);
  }
};

export default {
  readAllTransactions,
  createTransaction,
  readTransaction,
  updateTransaction,
  deleteTransaction,
  readAllCategories,
  createCategory,
  readCategory,
  updateCategory,
  deleteCategory,
};
