import { useEffect, useState } from 'react';
import AppHeader from '../AppHeader/AppHeader.js';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.js';
import styles from './App.module.css';
import Api from '../../utils/api';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.js';
import Modal from '../Modal/Modal.js';
import ModalOverlay from '../ModalOverlay/ModalOverlay.js';
import IngredientDetails from '../IngredientDetails/IngredientDetails.js';
import OrderDetails from '../OrderDetails/OrderDetails.js';

export default function App() {
  const [isLoading, setIsloading] = useState(true);
  const [isLoadError, setIsLoadError] = useState(false);
  const [ingredients, setIngredients] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIngredientModal, setisIngredientModal] = useState(false);
  const [ingredientModalData, setIngredientModalData] = useState({});

  function handleIngredientClick(ingredient) {
    setIngredientModalData(ingredient);
    setisIngredientModal(true);
    setIsModalOpen(true);
  }

  function handleCheckout() {
    setisIngredientModal(false);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    setIsloading(true);
    Api.getIngredients()
      .then((data) => setIngredients(data))
      .catch(() => setIsLoadError(true))
      .finally(() => setIsloading(false));
  }, []);

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        {!isLoading && !isLoadError && (
          <>
            <BurgerIngredients
              ingredients={ingredients}
              onIngredientClick={handleIngredientClick}
            />
            <BurgerConstructor
              ingredients={ingredients}
              onCheckout={handleCheckout}
            />
          </>
        )}
        {isLoading && (
          <p className="text text text_type_main-small mt-10">
            Загружаем данные ...
          </p>
        )}
        {isLoadError && (
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
          {isModalOpen && (
            <ModalOverlay onOverlayClick={closeModal}>
              <Modal
                onModalClose={closeModal}
                title={isIngredientModal && 'Детали ингредиента'}
              >
                {isIngredientModal ? (
                  <IngredientDetails {...ingredientModalData} />
                ) : (
                  <OrderDetails />
                )}
              </Modal>
            </ModalOverlay>
          )}
        </div>
      </main>
    </>
  );
}
