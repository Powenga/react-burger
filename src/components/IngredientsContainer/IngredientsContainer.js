import React from 'react';
import IngredientCard from '../IngredientCard/IngredientCard';
import styles from './IngredientsContainer.module.css';

export default class IngredientsContainer extends React.Component {
  render() {
    return (
      <>
        <h3 className="text text_type_main-medium mb-6">{this.props.title}</h3>
        <ul className={styles.list}>
          {this.props.ingredients.map((elem) => (
            <IngredientCard key={elem._id} {...elem} />
          ))}
        </ul>
      </>
    );
  }
}
