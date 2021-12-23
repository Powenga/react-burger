import React, { FC } from 'react';
import styles from './BurgerIngredients.module.css';
import IngredientsSelector from '../IngredientsSelector/IngredientsSelector';
import IngredientsContainer from '../IngredientsContainer/IngredientsContainer';
import { useDispatch, useSelector } from '../../hooks';
import { useCallback, useEffect, useRef } from 'react';
import { SET_CURRENT_TAB } from '../../utils/constants';
import { TIngredient } from '../../utils/types';

type TBurgerIngredients = {
  onIngredientClick: (ingredient: TIngredient) => void;
};

const BurgerIngredients: FC<TBurgerIngredients> = ({ onIngredientClick }) => {
  const { ingredients } = useSelector((store) => store.ingredients);
  const currentTab = useSelector((store) => store.currentTab);
  const constainerRef = useRef<HTMLDivElement>(null);
  const bunsRef = useRef<HTMLHeadingElement>(null);
  const saucesRef = useRef<HTMLHeadingElement>(null);
  const toppingsRef = useRef<HTMLHeadingElement>(null);
  const dispatch = useDispatch();

  const switchTabs = useCallback(() => {
    let containerY: number = 0;
    let bunsRefY: number = 0;
    let saucesRefY: number = 0;
    let toppingsRefY: number = 0;
    if (
      constainerRef.current &&
      bunsRef.current &&
      saucesRef.current &&
      toppingsRef.current
    ) {
      containerY = constainerRef.current.getBoundingClientRect().top;
      bunsRefY = Math.abs(
        bunsRef.current.getBoundingClientRect().top - containerY
      );
      saucesRefY = Math.abs(
        saucesRef.current.getBoundingClientRect().top - containerY
      );
      toppingsRefY = Math.abs(
        toppingsRef.current.getBoundingClientRect().top - containerY
      );
      let newTab = '';
      if (bunsRefY < saucesRefY) {
        newTab = 'buns';
      }
      if (saucesRefY < toppingsRefY && saucesRefY < bunsRefY) {
        newTab = 'sauces';
      }
      if (toppingsRefY < saucesRefY) {
        newTab = 'toppings';
      }
      if (currentTab !== newTab) {
        dispatch({ type: SET_CURRENT_TAB, currentTab: newTab });
      }
    }
  }, [currentTab, dispatch]);

  useEffect(() => {
    const container = constainerRef.current;
    if (container) {
      container.addEventListener('scroll', switchTabs);
    }
    return () => {
      if(container) {
        container.removeEventListener('scroll', switchTabs);
      }
    };
  }, [switchTabs]);

  return (
    <section className={`${styles.ingredients}`}>
      <h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>
      <IngredientsSelector />
      <div ref={constainerRef} className={styles.container}>
        <IngredientsContainer
          ref={bunsRef}
          onIngredientClick={onIngredientClick}
          title="Булки"
          ingredients={ingredients.filter(
            (ingredient: TIngredient) => ingredient.type === 'bun'
          )}
        />
        <IngredientsContainer
          ref={saucesRef}
          onIngredientClick={onIngredientClick}
          title="Соусы"
          ingredients={ingredients.filter(
            (ingredient: TIngredient) => ingredient.type === 'sauce'
          )}
        />
        <IngredientsContainer
          ref={toppingsRef}
          onIngredientClick={onIngredientClick}
          title="Начинки"
          ingredients={ingredients.filter(
            (ingredient: TIngredient) => ingredient.type === 'main'
          )}
        />
      </div>
    </section>
  );
};

export default BurgerIngredients;
