import React, { FC, useEffect, useState } from 'react';
import { TOrder, TStyle } from '../../utils/types';
import styles from './OrdersInfo.module.css';

const readyOrderStyle: TStyle = {
  color: '#00cccc',
};

type TOrdersInfo = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

const OrdersInfo: FC<TOrdersInfo> = ({ orders, total, totalToday }) => {
  const [ordersObj, setOrdersObj] = useState<{
    done: TOrder[];
    pending: TOrder[];
  }>({
    done: [],
    pending: [],
  });

  useEffect(() => {
    setOrdersObj(() => {
      return orders.reduce(
        (acc, curr) => {
          if (curr.status === 'done') {
            acc.done.push(curr);
          }
          if (curr.status === 'pending') {
            acc.pending.push(curr);
          }
          return acc;
        },
        { done: [] as TOrder[], pending: [] as TOrder[] }
      );
    });
  }, [orders]);

  return (
    <section className={styles.orderInfo}>
      <div className={`${styles.status} mb-15`}>
        <div className={`${styles.col} mr-9`}>
          <h2
            className={`${styles['info-title']} text text_type_main-medium mb-6`}
          >
            Готовы:
          </h2>
          <ul className={styles.list}>
            {ordersObj.done.slice(0, 10).map((elem) => (
              <li key={elem._id}>
                <p
                  className="text text_type_digits-default mb-2"
                  style={readyOrderStyle}
                >
                  {elem.number}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className={`${styles.col}`}>
          <h2
            className={`${styles['info-title']} text text_type_main-medium mb-6`}
          >
            В работе:
          </h2>
          <ul className={styles.list}>
            {ordersObj.pending.slice(0, 10).map((elem) => (
              <li key={elem._id}>
                <p className="text text_type_digits-default mb-2">
                  {elem.number}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={`${styles.info} mb-15`}>
        <h2 className={`${styles['info-title']} text text_type_main-medium`}>
          Выполнено за все время:
        </h2>
        <p className={`${styles['info-content']} text text_type_digits-large`}>
          {total}
        </p>
      </div>
      <div className={`${styles.info} mb-15`}>
        <h2 className={`${styles['info-title']} text text_type_main-medium`}>
          Выполнено за сегодня:
        </h2>
        <p className={`${styles['info-content']} text text_type_digits-large`}>
          {totalToday}
        </p>
      </div>
    </section>
  );
};

export default OrdersInfo;
