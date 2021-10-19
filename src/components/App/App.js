import { useEffect, useState } from 'react';
import AppHeader from '../AppHeader/AppHeader.js';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.js';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor.js';
import Modal from '../Modal/Modal.js';
import IngredientDetails from '../IngredientDetails/IngredientDetails.js';
import OrderDetails from '../OrderDetails/OrderDetails.js';
import Api from '../../utils/api';
import { IngredientsContext } from '../../contexts/ingredients-context';
import styles from './App.module.css';

export default function App() {
  const [isLoading, setIsloading] = useState(true);
  const [isLoadError, setIsLoadError] = useState(false);
  const [ingredients, setIngredients] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIngredientModal, setisIngredientModal] = useState(false);
  const [ingredientModalData, setIngredientModalData] = useState({});
  const [orderNumber, setOrderNumber] = useState(0);

  function handleIngredientClick(ingredient) {
    setIngredientModalData(ingredient);
    setisIngredientModal(true);
    setIsModalOpen(true);
  }

  function handleCheckout(data) {
    Api.checkout(data)
      .then(data => {
        setOrderNumber(data.order.number)
        setisIngredientModal(false);
        setIsModalOpen(true);
      })
      .catch(() => setIsLoadError(true))
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    setIsloading(true);
    Api.getIngredients()
      .then((data) => setIngredients(data.data))
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
            <IngredientsContext.Provider value={ingredients}>
              <BurgerConstructor
                ingredients={ingredients}
                onCheckout={handleCheckout}
              />
            </IngredientsContext.Provider>
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
          {isModalOpen &&
            (isIngredientModal ? (
              <Modal
                closeModal={closeModal}
                title={isIngredientModal && 'Детали ингредиента'}
              >
                <IngredientDetails data={ingredientModalData} />
              </Modal>
            ) : (
              <Modal closeModal={closeModal}>
                <OrderDetails orderNumber={orderNumber}/>
              </Modal>
            ))}
        </div>
      </main>
    </>
  );
}
