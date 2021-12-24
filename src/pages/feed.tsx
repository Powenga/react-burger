import React, { FC } from 'react';
import Preloader from '../components/Preloader/Preloader';
import styles from '../components/App/App.module.css';
import OrdersFeed from '../components/OrdersFeed/OrdersFeed';

const Feed: FC = () => {
  if(0) {
    return <Preloader/>
  }
  return (
    <main className={`${styles.main} ${styles['main_type_home']} `}>
      <OrdersFeed />
    </main>
  )
};

export default Feed;