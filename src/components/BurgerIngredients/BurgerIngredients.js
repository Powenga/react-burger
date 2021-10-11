import React from 'react';
import styles from './BurgerIngredients.module.css';
import IngredientsSelector from '../IngredientsSelector/IngredientsSelector';
import IngredientsContainer from '../IngredientsContainer/IngredientsContainer';

export default class BurgerIngredients extends React.Component {
  render() {
    return (
      <section className={`${styles.ingredients} pt-10`}>
        <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
        <IngredientsSelector />
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
      </section>
    );
  }
}
