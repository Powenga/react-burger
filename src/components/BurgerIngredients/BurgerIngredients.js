import PropTypes from 'prop-types';
import styles from './BurgerIngredients.module.css';
import IngredientsSelector from '../IngredientsSelector/IngredientsSelector';
import IngredientsContainer from '../IngredientsContainer/IngredientsContainer';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function BurgerIngredients({ onIngredientClick }) {
  const { ingredients } = useSelector(
    (store) => store.ingredients
  );

  return (
    <section className={`${styles.ingredients}`}>
      <h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>
      <IngredientsSelector />
      <div className={styles.container}>
        <IngredientsContainer
          onIngredientClick={onIngredientClick}
          title="Булки"
          ingredients={ingredients.filter(
            (ingredient) => ingredient.type === 'bun'
          )}
        />
        <IngredientsContainer
          onIngredientClick={onIngredientClick}
          title="Соусы"
          ingredients={ingredients.filter(
            (ingredient) => ingredient.type === 'sauce'
          )}
        />
        <IngredientsContainer
          onIngredientClick={onIngredientClick}
          title="Начинки"
          ingredients={ingredients.filter(
            (ingredient) => ingredient.type === 'main'
          )}
        />
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  onIngredientClick: PropTypes.func.isRequired,
};
