import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import IngredientDetails from '../components/IngredientDetails/IngredientDetails';
import { ingredientSelectors } from '../services/selectors/ingredient-selectors';
import styles from '../components/App/App.module.css';

export default function Ingredient() {
  const { ingredientsRequest, ingredientsRequestFailed } = useSelector(
    (store) => store.ingredients
  );
  const { id } = useParams();
  const ingredient = useSelector(ingredientSelectors.findById(id));
  const history = useHistory()

  useEffect(() => {
    if (!ingredient && !ingredientsRequest) {
      history.replace('/404');
    }
  }, [ingredient, history, ingredientsRequest]);

  return (
    <main className={styles.main}>
      {!ingredientsRequest && !ingredientsRequestFailed && (
      <div className={styles.mainInner}>
        <h1
          className="text text_type_main-large"
          style={{ textAlign: 'center' }}
        >
          Детали ингредиента
        </h1>
        <IngredientDetails ingredient={ingredient} />
      </div>)}
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
