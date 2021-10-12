import {
  Button,
  CurrencyIcon,
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientPropTypes } from '../../utils/prop-types';
import styles from './BurgerConstructor.module.css';

export default function BurgerConstructor({ ingredients, ...props }) {
  const bunImage = ingredients.find((elem) => elem.type === 'bun').image_mobile;
  const insideList = ingredients.filter((elem) => elem.type !== 'bun');
  return (
    <section className={styles.constructor}>
      <div className={styles.constructorWrap}>
        <div className="mr-4">
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={bunImage}
          />
        </div>

        <ul className={styles.insideList}>
          {insideList.map((elem) => (
            <li className={styles.ingredientWrap} key={elem._id}>
              <DragIcon type="primary" />
              <ConstructorElement
                isLocked={false}
                text={elem.name}
                price={200}
                thumbnail={elem.image_mobile}
              />
            </li>
          ))}
        </ul>
        <div className="mr-4">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={bunImage}
          />
        </div>
      </div>
      <div className={styles.orderWrap}>
        <p className="text text_type_digits-medium mr-10">
          <span style={{ marginRight: 8 }}>610</span>
          <CurrencyIcon type="primary" />
        </p>
        <Button type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
};
