import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import styles from './Topping.module.css';

export default function Topping({elem, handleRemove}) {

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: elem
  })

  return (
    <li ref={dragRef} className={styles.ingredientWrap} key={elem.key}>
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={false}
        text={elem.name}
        price={elem.price}
        thumbnail={elem.image_mobile}
        handleClose={(event) => {
          handleRemove(event, elem);
        }}
      />
    </li>
  );
}
