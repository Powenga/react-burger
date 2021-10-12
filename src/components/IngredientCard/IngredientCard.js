import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './IngredientCard.module.css';

export default function IngredientCard({ price, name, image }) {
  return (
    <li className={styles.card}>
      <img src={image} alt={name} className="ml-4 mr-4 mb-1" />
      <Counter count={1} size="default" />
      <p
        className="text text_type_digits-default mb-1"
        style={{ textAlign: 'center' }}
      >
        <span style={{ verticalAlign: 'top' }}>{price}</span>{' '}
        <CurrencyIcon type="primary" />
      </p>
      <p
        className="text text_type_main-default"
        style={{ textAlign: 'center' }}
      >
        {name}
      </p>
    </li>
  );
}

IngredientCard.propTypes = {
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
