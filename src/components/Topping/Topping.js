import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { MOVE_INGREDIENT } from '../../services/actions';
import styles from './Topping.module.css';

export default function Topping({ elem, index, handleRemove }) {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const [{ isDragging }, drag] = useDrag({
    type: 'topping',
    item: {
      ...elem,
      index,
    },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  const [, drop] = useDrop({
    accept: 'topping',
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      item.index = hoverIndex;
      dispatch({ type: MOVE_INGREDIENT, dragIndex, hoverIndex, item });
    },
  });

  drag(drop(ref));
  return (
    <li
      style={{
        opacity: isDragging ? 0 : 1,
      }}
      ref={ref}
      className={styles.ingredientWrap}
      key={elem.key}
    >
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
