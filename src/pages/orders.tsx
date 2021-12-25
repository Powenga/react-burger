import React, { FC, useEffect } from 'react';
import Preloader from '../components/Preloader/Preloader';
import OrdersFeed from '../components/OrdersFeed/OrdersFeed';
import styles from '../components/App/App.module.css';
import { useDispatch, useSelector } from '../hooks';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START_PERSON,
} from '../utils/constants';
import { getCookie } from '../utils/utils';

const Orders: FC = () => {
  const { wsConnected, message, error } = useSelector((store) => store.ws);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START_PERSON, payload: getCookie('accessToken') });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  if (!wsConnected) {
    return <Preloader />;
  }
  return (
    <main className={`${styles.main} ${styles['main_type_home']} `}>
      {wsConnected && message.success && <OrdersFeed orders={message.orders} />}
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

export default Orders;
