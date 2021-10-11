import React from 'react';
import IngredientCard from '../IngredientCard/IngredientCard';
import styles from './IngredientsContainer.module.css';

export default class IngredientsContainer extends React.Component {
  render() {
    return (
      <>
        <h3 className="text text_type_main-medium mb-6">{this.props.title}</h3>
        <ul className={`${styles.list} pl-4`}>
          {this.props.ingredients.map((elem) => (
            <li key={elem._id}>
              <IngredientCard {...elem} />
            </li>
          ))}
        </ul>
      </>
    );
  }
}
