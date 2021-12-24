import React, { FC } from 'react';
import { TStyle } from '../../utils/types';
import styles from './OrdersInfo.module.css';

const readyOrderStyle: TStyle = {
  color: '#00cccc',
};

const orders = [
  '034533',
  '034533',
  '034533',
  '034533',
  '034533',
  '034533',
  '034533',
  '034533',
  '034533',
  '034533',
];

const OrdersInfo: FC = () => {
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
            {orders.map((elem) => (
              <li>
                <p
                  className="text text_type_digits-default mb-2"
                  style={readyOrderStyle}
                >
                  {elem}
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
            {orders.map((elem) => (
              <li>
                <p
                  className="text text_type_digits-default mb-2"
                >
                  {elem}
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
          28 752
        </p>
      </div>
      <div className={`${styles.info} mb-15`}>
        <h2 className={`${styles['info-title']} text text_type_main-medium`}>
          Выполнено за сегодня:
        </h2>
        <p className={`${styles['info-content']} text text_type_digits-large`}>
          28 752
        </p>
      </div>
    </section>
  );
};

export default OrdersInfo;
