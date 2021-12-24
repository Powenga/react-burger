import React, { FC } from 'react';
import Preloader from '../components/Preloader/Preloader';
import OrdersFeed from '../components/OrdersFeed/OrdersFeed';
import OrdersInfo from '../components/OrdersInfo/OrdersInfo';
import styles from '../components/App/App.module.css';

const Feed: FC = () => {
  if(0) {
    return <Preloader/>
  }
  return (
    <main className={`${styles.main} ${styles['main_type_home']} `}>
      <OrdersFeed />
      <OrdersInfo/>
    </main>
  )
};

export default Feed;