import {
  Button,
  CurrencyIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import styles from './BurgerConstructor.module.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_INGREDIENT, REMOVE_INGREDIENT } from '../../services/actions';
import { useDrop } from 'react-dnd';
import Topping from '../Topping/Topping';

export default function BurgerConstructor({ onCheckout }) {
  const dispatch = useDispatch();
  const { bun, toppings } = useSelector((store) => store.burgerConstructor);

  const [total, setTotal] = useState(0);

  const [, dropIngredientsTarget] = useDrop({
    accept: 'ingredient',
    drop(ingredient) {
      dispatch({ type: ADD_INGREDIENT, ingredient });
    },
  });

  useEffect(() => {
    if (bun.price) {
      setTotal(
        bun.price * 2 + toppings.reduce((acc, curr) => acc + curr.price, 0)
      );
    }
  }, [bun, toppings]);

  function handleCheckout() {
    const ingredients = toppings.map((elem) => elem._id);
    ingredients.push(bun._id);
    onCheckout({ ingredients });
  }

  function handleRemove(event, ingredient) {
    event.preventDefault();
    dispatch({ type: REMOVE_INGREDIENT, ingredient });
  }
  console.log({bun, length: Object.keys(bun).length });

  return (
    <section className={styles.constructor}>
      <div ref={dropIngredientsTarget} className={styles.constructorWrap}>
        {bun && Object.keys(bun).length !== 0 && (
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
                {bun && Object.keys(bun).length !== 0 ? (
                  'Добавьте ингредиенты'
                ) : (
                  'Перенесите сюда булку, чтобы начать собирать заказ'
                )}

              </p>
            </div>
          )}
        </ul>

        {bun && Object.keys(bun).length !== 0 && (
          <div className="mr-4">
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image_mobile}
            />
          </div>
        )}

      </div>
      <div className={styles.orderWrap}>
        <p className="text text_type_digits-medium mr-10">
          <span style={{ marginRight: 8 }}>{total}</span>
          <CurrencyIcon type="primary" />
        </p>
        <Button
          type="primary"
          size="medium"
          onClick={handleCheckout}
          disabled={!bun || Object.keys(bun).length === 0}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  onCheckout: PropTypes.func.isRequired,
};
