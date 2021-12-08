import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { TIngredient } from '../../utils/types';
import styles from './IngredientCard.module.css';

type TIngredientCard = {
  ingredient: TIngredient;
  onIngredientClick: (ingredient: TIngredient) => void;
}

const IngredientCard: FC<TIngredientCard> = ({ ingredient, onIngredientClick }) => {
  const { price, name, image, _id } = ingredient;
  const [qty, setQty] = useState(0);
  const constructorIngredients = useSelector((store) => [
    //@ts-ignore
    store.burgerConstructor.bun,
    //@ts-ignore
    store.burgerConstructor.bun,
    //@ts-ignore
    ...store.burgerConstructor.toppings,
  ]);

  useEffect(() => {
    setQty(constructorIngredients.filter((elem) => elem._id === _id).length);
  }, [_id, constructorIngredients]);

  function handleClick() {
    onIngredientClick(ingredient);
  }

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
  });

  return (
    <li ref={dragRef} onClick={handleClick} className={styles.card}>
      <img src={image} alt={name} className="ml-4 mr-4 mb-1" />
      {qty !== 0 && <Counter count={qty} size="default" />}
      <p
        className="text text_type_digits-default mb-1"
        style={{ textAlign: 'center' }}
      >
        <span style={{ verticalAlign: 'top' }}>{price}</span>{' '}
        <CurrencyIcon type="primary" />
      </p>
      <p
        className="text text_type_main-default"
        style={{ textAlign: 'center' }}
      >
        {name}
      </p>
    </li>
  );
}

export default IngredientCard;
