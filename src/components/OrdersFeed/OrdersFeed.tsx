import React, { FC } from 'react';
import styles from './OrdersFeed.module.css';
import OrderCard from '../OrderCard/OrderCard';
import { TOrder } from '../../utils/types';

type TOrdersFeed = {
  title?: string;
  orders: TOrder[];
};

const OrdersFeed: FC<TOrdersFeed> = ({ title, orders }) => {
  return (
    <section className={styles.feed}>
      {title && (<h2 className="text text_type_main-large mb-5">{title}</h2>)}
      <ul className={styles.container}>
        {orders.map((order) => (
          <OrderCard order={order} />
        ))}
      </ul>
    </section>
  );
};

export default OrdersFeed;
