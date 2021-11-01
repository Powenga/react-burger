import {
  Button,
  CurrencyIcon,
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import styles from './BurgerConstructor.module.css';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export default function BurgerConstructor({ onCheckout }) {
  const { constructorIngredients } = useSelector((store) => store.burger);

  const { buns, toppings } = constructorIngredients.reduce(
    (prev, curr) => {
      if (curr.type === 'bun') {
        prev.buns.push(curr);
      } else {
        prev.toppings.push(curr);
      }
      return prev;
    },
    {
      buns: [],
      toppings: [],
    }
  );

  function handleCheckout() {
    const ingredients = toppingList.map((elem) => elem._id);
    ingredients.push(bun._id);
    onCheckout({ ingredients });
  }

  const [bun, setBun] = useState(buns[0]);
  const [toppingList, setToppingList] = useState(toppings);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (bun) {
      const total =
        bun.price * 2 +
        toppingList.reduce((prev, curr) => prev + curr.price, 0);
      setTotal(total);
    }
  }, [bun, toppingList]);

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
          {toppingList.map((elem, index) => (
            <li className={styles.ingredientWrap} key={index}>
              <DragIcon type="primary" />
              <ConstructorElement
                isLocked={false}
                text={elem.name}
                price={elem.price}
                thumbnail={elem.image_mobile}
              />
            </li>
          ))}
        </ul>

        {bun && (
          <div className="mr-4">
            <ConstructorElement
              type="down"
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
