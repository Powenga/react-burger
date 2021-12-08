import React, { FC } from 'react';
import BurgerIngredients from '../components/BurgerIngredients/BurgerIngredients.js';
import BurgerConstructor from '../components/BurgerConstructor/BurgerConstructor.js';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';
import Preloader from '../components/Preloader/Preloader';
import styles from '../components/App/App.module.css';
import { TIngredient } from '../utils/types.js';

type THome = {
  handleIngredientClick: (ingredient: TIngredient) => void;
  handleCheckout: (data: { ingredients: TIngredient[] }) => void;
};

const Home: FC<THome> = ({ handleIngredientClick, handleCheckout }) => {
  const { ingredientsRequest, ingredientsRequestFailed } = useSelector(
    // @ts-ignore
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
};

export default Home;
