import { useEffect, useState } from 'react';
import AppHeader from '../AppHeader/AppHeader.js';
import Modal from '../Modal/Modal.js';
import IngredientDetails from '../IngredientDetails/IngredientDetails.js';
import OrderDetails from '../OrderDetails/OrderDetails.js';
import styles from './App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  ADD_INGREDIENT_INFO,
  checkout,
  getIngredients,
  REMOVE_INGREDIENT_INFO,
} from '../../services/actions/index.js';
import Home from '../../pages/home.js';

export default function App() {
  const { orderNumber, checkoutRequest, checkoutRequestFailed } = useSelector(
    (store) => store.order
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIngredientModal, setisIngredientModal] = useState(false);

  function handleIngredientClick(ingredient) {
    dispatch({ type: ADD_INGREDIENT_INFO, ingredient });
    setisIngredientModal(true);
    setIsModalOpen(true);
  }

  function handleCheckout(data) {
    setisIngredientModal(false);
    setIsModalOpen(true);
    dispatch(checkout(data));
  }

  function closeModal() {
    dispatch({ type: REMOVE_INGREDIENT_INFO });
    setIsModalOpen(false);
  }

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <Home
          handleIngredientClick={handleIngredientClick}
          handleCheckout={handleCheckout}
        />
      </main>
      <div style={{ overflow: 'hidden' }}>
        {isModalOpen &&
          (isIngredientModal ? (
            <Modal
              closeModal={closeModal}
              title={isIngredientModal && 'Детали ингредиента'}
            >
              <IngredientDetails />
            </Modal>
          ) : (
            <Modal closeModal={closeModal}>
              <OrderDetails
                orderNumber={orderNumber}
                isOrdering={checkoutRequest}
                isOrderFailed={checkoutRequestFailed}
              />
            </Modal>
          ))}
      </div>
    </>
  );
}
