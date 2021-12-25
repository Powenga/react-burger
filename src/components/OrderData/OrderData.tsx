import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../hooks';
import { orderSelectors, ingredientSelectors } from '../../services/selectors';
import { formatOrderDate } from '../../utils/utils';
import styles from './OrderData.module.css';

const OrderData: FC = () => {
  const { id } = useParams<{ id: string }>();
  const order = useSelector(orderSelectors.findById(id));
  const ingredients = useSelector(
    ingredientSelectors.getOrderIngredients(order.ingredients)
  );
  const [price, setPrice] = useState(0);

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
    <div className={styles.orderData}>
      <p className={`text text_type_digits-default mb-10`}>
        {`#${order.number}`}
      </p>
      <h3
        className={`text text_type_main-medium ${styles.name} mb-3`}
        title={order.name}
      >
        {order.name}
      </h3>
      <p
        className={`text text_type_main-default mb-15`}
        style={{ color: order.status === 'done' ? '#00CCCC' : 'inherit' }}
      >
        {order.status === 'done'
          ? 'Выполнен'
          : order.status === 'pending'
          ? 'Готовится'
          : 'Отменен'}
      </p>
      <h4 className={`text text_type_main-medium mb-6`}>Состав:</h4>
      <ul className={styles.ingredients}>
        {ingredients.map((ingredient) => (
          <li className={styles.ingredient}>
            <div className={styles['ingredient__img-wrap']}>
              <div className={styles['ingredient__img-inner']}>
                <img
                  className={styles['ingredient__img']}
                  src={ingredient.image_mobile}
                  alt={ingredient.name}
                />
              </div>
            </div>
            <p
              className="text text_type_main-default ml-auto"
              style={{ marginRight: 'auto' }}
            >
              {ingredient.name}
            </p>
            <p className="text text_type_digits-default ml-4">
              <span style={{ marginRight: 8, verticalAlign: 'top' }}>
                {`${ingredient.type === 'bun' ? '2 x' : ''} ${
                  ingredient.price
                }`}
              </span>
              <CurrencyIcon type="primary" />
            </p>
          </li>
        ))}
      </ul>
      <div className={styles.footer}>
        <p
          className="text text_type_main-default text_color_inactive"
        >
          {formatOrderDate(order.createdAt)}
        </p>
        <p className="text text_type_digits-default">
          <span style={{ marginRight: 8, verticalAlign: 'top' }}>{price}</span>
          <CurrencyIcon type="primary" />
        </p>
      </div>
    </div>
  );
};

export default OrderData;
