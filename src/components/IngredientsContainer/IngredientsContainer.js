import IngredientCard from '../IngredientCard/IngredientCard';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/prop-types';
import styles from './IngredientsContainer.module.css';
import { forwardRef } from 'react';

const IngredientsContainer = forwardRef(
  ({ ingredients, title, onIngredientClick }, ref) => {
    return (
      <>
        <h3
          ref={ref}
          className="text text_type_main-medium mb-6 ingredients_container-title"
        >
          {title}
        </h3>
        <ul className={styles.list}>
          {ingredients.map((elem) => (
            <IngredientCard
              key={elem._id}
              ingredient={elem}
              onIngredientClick={onIngredientClick}
            />
          ))}
        </ul>
      </>
    );
  }
);

IngredientsContainer.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
  onIngredientClick: PropTypes.func.isRequired,
};

export default IngredientsContainer;
