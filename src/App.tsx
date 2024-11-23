import { Route, Routes } from 'react-router-dom';
import Transactions from './containers/Transactions/Transactions';
import Categories from './containers/Categories/Categories';
import Layout from './components/Layout/Layout';
import { useAppDispatch, useAppSelector } from './app/hooks';
import {
  closeTransactionModal,
  Selectors as selectTransactions,
} from './store/slices/transactionsSlice';
import {
  closeCategoryModal,
  Selectors as selectCategories,
} from './store/slices/categoriesSlice';
import Modal from './components/UI/Modal/Modal';
import CategoriesForm from './components/CategoriesForm/CategoriesForm';
import TransactionForm from './components/TransactionForm/TransactionForm';
import { useEffect } from 'react';
import { syncAllTransactions } from './store/thunks/transactionsThunks';
import { syncAllCategories } from './store/thunks/categoriesThunks';

function App() {
  const dispatch = useAppDispatch();

  const transactionsModalOpen = useAppSelector(selectTransactions.modalOpen);
  const categoriesModalOpen = useAppSelector(selectCategories.modalOpen);

  useEffect(() => {
    dispatch(syncAllTransactions());
    dispatch(syncAllCategories());
  }, [dispatch]);

  return (
    <Layout>
      <Routes>
        <Route path='/'>
          <Route index element={<Transactions />} />
          <Route path='categories' element={<Categories />} />
        </Route>
      </Routes>
      <Modal
        open={transactionsModalOpen}
        onClose={() => dispatch(closeTransactionModal())}
      >
        <TransactionForm />
      </Modal>
      <Modal
        open={categoriesModalOpen}
        onClose={() => dispatch(closeCategoryModal())}
      >
        <CategoriesForm />
      </Modal>
    </Layout>
  );
}

export default App;
