import React from 'react';
import IngredientCard from '../IngredientCard/IngredientCard';
import styles from './IngredientsContainer.module.css';
import { forwardRef } from 'react';
import { TIngredient } from '../../utils/types';

type TIngredientsContainer = {
  ingredients: TIngredient[];
  title: string;
  onIngredientClick: (ingredient: TIngredient) => void;
};

const IngredientsContainer = forwardRef<
  HTMLHeadingElement,
  TIngredientsContainer
>(({ ingredients, title, onIngredientClick }, ref) => {
  return (
    <>
      <h3
        ref={ref}
        className="text text_type_main-medium mb-6 ingredients_container-title"
      >
        {title}
      </h3>
      <ul className={styles.list}>
        {ingredients.map((elem: TIngredient) => (
          <IngredientCard
            key={elem._id}
            ingredient={elem}
            onIngredientClick={onIngredientClick}
          />
        ))}
      </ul>
    </>
  );
});

export default IngredientsContainer;
