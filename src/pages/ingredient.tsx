import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import IngredientDetails from '../components/IngredientDetails/IngredientDetails';
import Preloader from '../components/Preloader/Preloader';
import styles from '../components/App/App.module.css';

const Ingredient: FC = () => {
  const { ingredientsRequest } = useSelector(
    // @ts-ignore
    (store) => store.ingredients
  );

  if (ingredientsRequest) {
    return <Preloader />;
  }

  return (
    <main className={styles.main}>
      <div className={styles.mainInner}>
        <h1
          className="text text_type_main-large"
          style={{ textAlign: 'center' }}
        >
          Детали ингредиента
        </h1>
        <IngredientDetails />
      </div>
    </main>
  );
}

export default Ingredient;
