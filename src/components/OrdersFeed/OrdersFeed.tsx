import React, { FC } from 'react';
import styles from './OrdersFeed.module.css';
import { orders } from '../../utils/data';
import OrderCard from '../OrderCard/OrderCard';

const OrdersFeed: FC = () => {
  return (
    <section className={styles.feed}>
      <h2 className="text text_type_main-large mt-10 mb-5">Лента заказов</h2>
      <ul className={styles.container}>
        {orders.map((order) => (
          <OrderCard order={order} />
        ))}
      </ul>
    </section>
  );
};

export default OrdersFeed;
