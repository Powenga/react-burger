import React, { FC } from 'react';
import styles from '../components/App/App.module.css';
import OrderData from '../components/OrderData/OrderData';

const Order: FC = () => {
  return (
      <div className={styles.mainInner}>
        <h1
          className="text text_type_main-large"
          style={{ textAlign: 'center' }}
        >
          Детали заказа
        </h1>
        <OrderData />
      </div>
  );
};

export default Order;
