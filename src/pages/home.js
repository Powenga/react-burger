import React from "react";
import BurgerIngredients from '../components/BurgerIngredients/BurgerIngredients.js';
import BurgerConstructor from '../components/BurgerConstructor/BurgerConstructor.js';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';
import styles from '../components/App/App.module.css';

export default function Home({
  handleIngredientClick,
  handleCheckout,
}) {
  const { ingredientsRequest, ingredientsRequestFailed } = useSelector(
    (store) => store.ingredients
  );
  return (
    <main className={`${styles.main} ${styles['main_type_home']} `}>
      {!ingredientsRequest && !ingredientsRequestFailed && (
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients onIngredientClick={handleIngredientClick} />

          <BurgerConstructor onCheckout={handleCheckout} />
        </DndProvider>
      )}
      {ingredientsRequest && (
        <p className="text text text_type_main-small mt-10">
          Загружаем данные ...
        </p>
      )}
      {ingredientsRequestFailed && (
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
    </main>
  );
}
