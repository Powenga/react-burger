import React, { FC } from 'react';
import { useSelector } from '../hooks';
import Preloader from '../components/Preloader/Preloader';
import styles from '../components/App/App.module.css';
import OrderData from '../components/OrderData/OrderData';

const Order: FC = () => {
  const { wsConnected, message } = useSelector((store) => store.ws);

  if (!wsConnected || !message.orders) {
    return <Preloader />;
  }

  return (
    <main className={styles.main}>
      <div className={styles.mainInner}>
        <h1
          className="text text_type_main-large"
          style={{ textAlign: 'center' }}
        >
          Детали заказа
        </h1>
        <OrderData />
      </div>
    </main>
  );
};

export default Order;
