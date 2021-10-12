import React from 'react';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './IngredientCard.module.css'


export default class IngredientCard extends React.Component {
  render() {
    return (
      <li className={styles.card}>
        <img src={this.props.image} alt={this.props.name} className="ml-4 mr-4 mb-1"/>
        <Counter count={1} size="default" />
        <p className="text text_type_digits-default mb-1" style={{textAlign: 'center'}}>
          <span style={{verticalAlign: 'top'}}>{this.props.price}</span> <CurrencyIcon type="primary" />
        </p>
        <p className="text text_type_main-default" style={{textAlign: 'center'}}>{this.props.name}</p>
      </li>
    );
  }
}
