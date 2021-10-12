import PropTypes from 'prop-types';
import styles from './BurgerIngredients.module.css';
import IngredientsSelector from '../IngredientsSelector/IngredientsSelector';
import IngredientsContainer from '../IngredientsContainer/IngredientsContainer';
import { ingredientPropTypes } from '../../utils/prop-types';

export default function BurgerIngredients({ ingredients, ...props }) {
  return (
    <section className={`${styles.ingredients}`}>
      <h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>
      <IngredientsSelector />
      <div className={styles.container}>
        <IngredientsContainer
          title="Булки"
          ingredients={ingredients.filter(
            (ingredient) => ingredient.type === 'bun'
          )}
        />
        <IngredientsContainer
          title="Соусы"
          ingredients={ingredients.filter(
            (ingredient) => ingredient.type === 'sauce'
          )}
        />
        <IngredientsContainer
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
  ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
};
