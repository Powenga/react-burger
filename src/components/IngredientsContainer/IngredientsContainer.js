import IngredientCard from '../IngredientCard/IngredientCard';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/prop-types';
import styles from './IngredientsContainer.module.css';

export default function IngredientsContainer({
  ingredients,
  title,
  onIngredientClick,
  ...props
}) {
  return (
    <>
      <h3 className="text text_type_main-medium mb-6">{title}</h3>
      <ul className={styles.list}>
        {ingredients.map((elem) => (
          <IngredientCard
            key={elem._id}
            {...elem}
            onIngredientClick={onIngredientClick}
          />
        ))}
      </ul>
    </>
  );
}

IngredientsContainer.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
};
