import React from 'react';
import PropTypes from 'prop-types';
import styles from './BurgerIngredients.module.css';
import IngredientsSelector from '../IngredientsSelector/IngredientsSelector';
import IngredientsContainer from '../IngredientsContainer/IngredientsContainer';
import { ingredientPropTypes } from '../../utils/prop-types';

export default class BurgerIngredients extends React.Component {
  render() {
    return (
      <section className={`${styles.ingredients}`}>
        <h2 className="text text_type_main-large mt-10 mb-5">
          Соберите бургер
        </h2>
        <IngredientsSelector />
        <div className={styles.container}>
          <IngredientsContainer
            title="Булки"
            ingredients={this.props.ingredients.filter(
              (ingredient) => ingredient.type === 'bun'
            )}
          />
          <IngredientsContainer
            title="Соусы"
            ingredients={this.props.ingredients.filter(
              (ingredient) => ingredient.type === 'sauce'
            )}
          />
          <IngredientsContainer
            title="Начинки"
            ingredients={this.props.ingredients.filter(
              (ingredient) => ingredient.type === 'main'
            )}
          />
        </div>
      </section>
    );
  }
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired),
};
