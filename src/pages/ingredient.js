import React from 'react';
import IngredientDetails from '../components/IngredientDetails/IngredientDetails';

import styles from '../components/App/App.module.css';

export default function Ingredient() {

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
