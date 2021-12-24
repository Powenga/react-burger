import React, { FC, useEffect } from 'react';
import Preloader from '../components/Preloader/Preloader';
import OrdersFeed from '../components/OrdersFeed/OrdersFeed';
import OrdersInfo from '../components/OrdersInfo/OrdersInfo';
import styles from '../components/App/App.module.css';
import { useDispatch, useSelector } from '../hooks';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START_ALL } from '../utils/constants';

const Feed: FC = () => {
  const { wsConnected, message }  = useSelector((store) => store.ws);
  console.log(message);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START_ALL });
    return () => {
      dispatch({type: WS_CONNECTION_CLOSED});
    }
  }, [dispatch]);
  if (!wsConnected) {
    return <Preloader />;
  }
  return (
    <main className={`${styles.main} ${styles['main_type_home']} `}>
      <OrdersFeed />
      <OrdersInfo />
    </main>
  );
};

export default Feed;
