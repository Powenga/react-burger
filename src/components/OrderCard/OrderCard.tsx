import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC, useEffect, useState } from 'react';
import { useSelector } from '../../hooks';
import { ingredientSelectors } from '../../services/selectors';
import { TOrder } from '../../utils/types';
import { formatOrderDate } from '../../utils/utils';
import styles from './OrderCard.module.css';

type TOrderCard = {
  order: TOrder;
  onClick: (order: TOrder) => void;
};

const OrderCard: FC<TOrderCard> = ({ order, onClick }) => {
  const [price, setPrice] = useState(0);
  const ingredients = useSelector(
    ingredientSelectors.getOrderIngredients(order.ingredients)
  );

  function handleClick() {
    onClick(order);
  }

  useEffect(() => {
    setPrice(() => {
      return ingredients.reduce((acc, curr) => {
        let itemPrice;
        if (curr.type === 'bun') {
          itemPrice = curr.price * 2;
        } else {
          itemPrice = curr.price;
        }
        return acc + itemPrice;
      }, 0);
    });
  }, [ingredients]);

  return (
    <li
      key={order._id}
      className={`${styles.order} mb-4 mr-2 p-6`}
      onClick={handleClick}
    >
      <div className={`${styles.header} mb-6`}>
        <p className={`text text_type_digits-default ${styles.number}`}>
          {`#${order.number}`}
        </p>
        <p
          className={`text text_type_main-default text_color_inactive ${styles.date}`}
        >
          {formatOrderDate(order.createdAt)}
        </p>
      </div>
      <h3
        className={`text text_type_main-medium ${styles.name} mb-6`}
        title={order.name}
      >
        {order.name}
      </h3>
      <div className={styles.footer}>
        <div className={styles.ingredients}>
          {ingredients
            .slice(0, 5)
            .reverse()
            .map((ingredient, index) => (
              <div key={index} className={styles['ingredient-card']}>
                <div className={styles['ingredient-card-inner']}>
                  <img
                    className={styles[`ingredient-img`]}
                    src={ingredient.image_mobile}
                    alt={ingredient.name}
                  />
                  {index === 0 && ingredients.length > 5 && (
                    <div className={styles['ingredient-cover']}>
                      <span
                        className={`${styles['ingredient-count']} text text_type_main-default `}
                      >
                        {`+${order.ingredients.length - 5}`}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
        <p className="text text_type_digits-medium">
          <span style={{ marginRight: 8 }}>{price}</span>
          <CurrencyIcon type="primary" />
        </p>
      </div>
    </li>
  );
};
export default OrderCard;
