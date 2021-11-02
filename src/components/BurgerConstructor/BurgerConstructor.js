import {
  Button,
  CurrencyIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import styles from './BurgerConstructor.module.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  ADD_INGREDIENT,
  MOVE_INGREDIENT,
  REMOVE_INGREDIENT,
} from '../../services/actions';
import { useDrop } from 'react-dnd';
import Topping from '../Topping/Topping';

export default function BurgerConstructor({ onCheckout }) {
  const { ingredients, bun, toppings } = useSelector((store) => ({
    ingredients: store.ingredients.ingredients,
    bun: store.burgerConstructor.bun,
    toppings: store.burgerConstructor.toppings,
  }));

  const dispatch = useDispatch();

  function handleCheckout() {
    const ingredients = toppings.map((elem) => elem._id);
    ingredients.push(bun._id);
    onCheckout({ ingredients });
  }

  function handleRemove(event, ingredient) {
    event.preventDefault();
    dispatch({ type: REMOVE_INGREDIENT, ingredient });
  }

  const [total, setTotal] = useState(0);

  const [, dropIngredientsTarget] = useDrop({
    accept: 'ingredient',
    drop(ingredient) {
      dispatch({ type: ADD_INGREDIENT, ingredient });
    },
  });

  // const [, dropToppingsTarget] = useDrop({
  //   accept: 'topping',
  //   drop(ingredient) {
  //     console.log('gthtklgjdfkl');
  //   },
  // });

  return (
    <section className={styles.constructor}>
      <div ref={dropIngredientsTarget} className={styles.constructorWrap}>
        {bun && (
          <div className="mr-4">
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image_mobile}
            />
          </div>
        )}

        <ul className={styles.insideList}>
          {toppings.length ? (
            toppings.map((elem, index) => (
              <Topping
                key={elem.key}
                elem={elem}
                handleRemove={handleRemove}
                index={index}
              />
            ))
          ) : (
            <div className={styles.placeholderWrap}>
              <p className="text text_type_main-small text_color_inactive">
                Добавьте ингредиенты или измените булку!
              </p>
            </div>
          )}
        </ul>

        <div className="mr-4">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image_mobile}
          />
        </div>
      </div>
      <div className={styles.orderWrap}>
        <p className="text text_type_digits-medium mr-10">
          <span style={{ marginRight: 8 }}>{total}</span>
          <CurrencyIcon type="primary" />
        </p>
        <Button type="primary" size="medium" onClick={handleCheckout}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  onCheckout: PropTypes.func.isRequired,
};
