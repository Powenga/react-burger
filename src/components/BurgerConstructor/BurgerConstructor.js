import {
  Button,
  CurrencyIcon,
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import styles from './BurgerConstructor.module.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { GET_CONSTRUCTOR_INGREDIENTS } from '../../services/actions';

export default function BurgerConstructor({ onCheckout }) {
  const { bun, toppings } = useSelector(
    (store) => store.burger.constructorIngredients
  );

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(GET_CONSTRUCTOR_INGREDIENTS)
  // }, [dispatch, bun, toppings]);

  // useEffect(() => {
  //   const { bun, toppings } = constructorIngredients.reduce(
  //     (prev, curr) => {
  //       if (curr.type === 'bun') {
  //         console.log(curr);
  //         prev.bun = curr;
  //       } else {
  //         prev.toppings.push(curr);
  //       }
  //       return prev;
  //     },
  //     {
  //       bun: {},
  //       toppings: [],
  //     }
  //   );
  //   console.log(bun);
  // }, [constructorIngredients]);

  function handleCheckout() {
    const ingredients = toppings.map((elem) => elem._id);
    ingredients.push(bun._id);
    onCheckout({ ingredients });
  }

  const [total, setTotal] = useState(0);

  return (
    <section className={styles.constructor}>
      <div className={styles.constructorWrap}>
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
              <li className={styles.ingredientWrap} key={index}>
                <DragIcon type="primary" />
                <ConstructorElement
                  isLocked={false}
                  text={elem.name}
                  price={elem.price}
                  thumbnail={elem.image_mobile}
                />
              </li>
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
