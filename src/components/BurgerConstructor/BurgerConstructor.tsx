import {
  Button,
  CurrencyIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useEffect, useState } from 'react';
import styles from './BurgerConstructor.module.css';
import { useDispatch, useSelector } from '../../hooks';
import { ADD_INGREDIENT, REMOVE_INGREDIENT } from '../../utils/constants';
import { useDrop } from 'react-dnd';
import Topping from '../Topping/Topping';
import { TIngredient } from '../../utils/types';

type TBurgerConstructor = {
  onCheckout: (data: { ingredients: string[] }) => void;
};

const BurgerConstructor: FC<TBurgerConstructor> = ({ onCheckout }) => {
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
    setTotal(() => {
      if (bun && Object.keys(bun).length !== 0) {
        return (
          bun.price * 2 +
          toppings.reduce(
            (acc: number, curr: { price: number }) => acc + curr.price,
            0
          )
        );
      }
      return 0;
    });
  }, [bun, toppings]);

  function handleCheckout() {
    const ingredients = toppings.map((elem: TIngredient) => elem._id);
    ingredients.push(bun._id);
    onCheckout({ ingredients });
  }

  function handleRemove(ingredient: TIngredient) {
    dispatch({ type: REMOVE_INGREDIENT, ingredient });
  }

  return (
    <section className={styles.constructorBlock}>
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
            toppings.map((elem: TIngredient, index: number) => (
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
                {bun && Object.keys(bun).length !== 0
                  ? 'Добавьте ингредиенты'
                  : 'Перенесите сюда булку, чтобы начать собирать заказ'}
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
          onClick={
            bun && Object.keys(bun).length !== 0 ? handleCheckout : undefined
          }
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
