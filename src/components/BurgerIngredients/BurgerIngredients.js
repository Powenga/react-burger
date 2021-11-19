import PropTypes from 'prop-types';
import styles from './BurgerIngredients.module.css';
import IngredientsSelector from '../IngredientsSelector/IngredientsSelector';
import IngredientsContainer from '../IngredientsContainer/IngredientsContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useRef } from 'react';
import { SET_CURRENT_TAB } from '../../services/actions';

export default function BurgerIngredients({ onIngredientClick }) {
  const { ingredients } = useSelector((store) => store.ingredients);
  const currentTab = useSelector((store) => store.currentTab);
  const constainerRef = useRef(null);
  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const toppingsRef = useRef(null);
  const dispatch = useDispatch();

  const  switchTabs = useCallback(() => {
    const containerY = constainerRef.current.getBoundingClientRect().top;
    const bunsRefY = Math.abs(
      bunsRef.current.getBoundingClientRect().top - containerY
    );
    const saucesRefY = Math.abs(
      saucesRef.current.getBoundingClientRect().top - containerY
    );
    const toppingsRefY = Math.abs(
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
  }, [currentTab, dispatch])

  useEffect(() => {
    const container = constainerRef.current;
    if (container) {
      container.addEventListener('scroll', switchTabs);
    }
    return () => {
      container.removeEventListener('scroll', switchTabs);
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
            (ingredient) => ingredient.type === 'bun'
          )}
        />
        <IngredientsContainer
          ref={saucesRef}
          onIngredientClick={onIngredientClick}
          title="Соусы"
          ingredients={ingredients.filter(
            (ingredient) => ingredient.type === 'sauce'
          )}
        />
        <IngredientsContainer
          ref={toppingsRef}
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
