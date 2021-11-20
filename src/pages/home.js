import React from 'react';
import BurgerIngredients from '../components/BurgerIngredients/BurgerIngredients.js';
import BurgerConstructor from '../components/BurgerConstructor/BurgerConstructor.js';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Preloader from '../components/Preloader/Preloader';
import styles from '../components/App/App.module.css';

export default function Home({ handleIngredientClick, handleCheckout }) {
  const { ingredientsRequest, ingredientsRequestFailed } = useSelector(
    (store) => store.ingredients
  );

  if (ingredientsRequest) {
    return <Preloader />;
  }

  return (
    <>
      <main className={`${styles.main} ${styles['main_type_home']} `}>
        {!ingredientsRequest && !ingredientsRequestFailed && (
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients onIngredientClick={handleIngredientClick} />

            <BurgerConstructor onCheckout={handleCheckout} />
          </DndProvider>
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
    </>
  );
}

Home.propTypes = {
  handleIngredientClick: PropTypes.func.isRequired,
  handleCheckout: PropTypes.func.isRequired,
};