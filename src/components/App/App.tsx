import React from 'react';
import AppHeader from '../AppHeader/AppHeader.js';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients.js';
import styles from './App.module.css';
import { ingredients } from '../../utils/data.js';


export default class App extends React.Component {

  render() {
    return (
      <>
        <AppHeader />
        <main className={styles.main}>
          <BurgerIngredients ingredients={ingredients}/>
        </main>
      </>
    );
  }
}
