import { useEffect, useState } from 'react';
import AppHeader from '../AppHeader/AppHeader.js';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.js';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.js';
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
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function App() {
  const { ingredientsRequest, ingredientsRequestFailed } = useSelector(
    (store) => store.ingredients
  );
  const {
    orderNumber,
    checkoutRequest,
    checkoutRequestFailed } = useSelector(
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
        {!ingredientsRequest && !ingredientsRequestFailed && (
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients onIngredientClick={handleIngredientClick} />

            <BurgerConstructor
               onCheckout={handleCheckout}
            />
          </DndProvider>
        )}
        {ingredientsRequest && (
          <p className="text text text_type_main-small mt-10">
            Загружаем данные ...
          </p>
        )}
        {(ingredientsRequestFailed) && (
          <div>
            <p
              className="text text text_type_main-small mt-10"
              style={{ color: '#e52b1a' }}
            >
              При загрузке данных произошла ошибка :(
            </p>
            <p
              className="text text text_type_main-small"
              style={{ color: '#e52b1a' }}
            >
              Пожалуйста, обновите страницу.
            </p>
          </div>
        )}
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
      </main>
    </>
  );
}
