import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../components/App/App.module.css';

export default function NotFound() {
  return (
    <main className={styles.main}>
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p
          className="text text_type_main-large mb-10"
          style={{ fontSize: 120 }}
        >
          404
        </p>
        <p className="text text_type_main-large mb-10">
          Страница не найдена :(
        </p>
        <Link
          className="text text_type_main-medium text_color_inactive"
          style={{ textDecoration: 'none' }}
          to="/"
        >
          На главную
        </Link>
      </div>
    </main>
  );
}
