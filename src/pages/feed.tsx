import React, { FC } from 'react';
import Preloader from '../components/Preloader/Preloader';
import OrdersFeed from '../components/OrdersFeed/OrdersFeed';
import OrdersInfo from '../components/OrdersInfo/OrdersInfo';
import styles from '../components/App/App.module.css';
import { useSelector } from '../hooks';
import { TOrder } from '../utils/types';

type TFeed = {
  handleOrderClick: (order: TOrder) => void;
};

const Feed: FC<TFeed> = ({ handleOrderClick }) => {
  const { wsConnected, message, error } = useSelector((store) => store.ws);

  if (!wsConnected) {
    return <Preloader />;
  }
  return (
    <main className={`${styles.main} ${styles['main_type_home']} `}>
      {wsConnected && message.success && (
        <>
          <OrdersFeed
            title="Лента заказов"
            orders={message.orders}
            handleOrderClick={handleOrderClick}
          />
          <OrdersInfo
            orders={message.orders}
            total={message.total}
            totalToday={message.totalToday}
          />
        </>
      )}
      {error && (
        <div>
          <p
            className="text text text_type_main-small mt-10"
            style={{ color: '#e52b1a' }}
          >
            При загрузке данных произошла ошибка :(
          </p>
          <p
            className="text text text_type_main-small"
            style={{ color: '#e52b1a' }}
          >
            Пожалуйста, обновите страницу.
          </p>
        </div>
      )}
    </main>
  );
};

export default Feed;
