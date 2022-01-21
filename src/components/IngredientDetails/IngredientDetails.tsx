import React, { FC } from 'react';
import { useSelector } from '../../hooks';
import { useParams, useHistory } from 'react-router-dom';
import { ingredientSelectors } from '../../services/selectors';
import styles from './IngredientDetails.module.css';

const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const ingredient = useSelector(ingredientSelectors.findById(id));
  const history = useHistory();

  if (!ingredient) {
    history.replace('/404');
  }

  if (!ingredient) {
    return null;
  }

  const { image_large, name, calories, proteins, fat, carbohydrates } =
    ingredient;

  return (
    <>
      <img
        src={image_large}
        alt="name"
        className="mb-4"
        style={{
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      />
      <h3
        className="text text_type_main-medium mb-8"
        style={{ textAlign: 'center' }}
      >
        {name}
      </h3>
      <ul className={styles.content}>
        <li>
          <h4 className="text text_type_main-default text_color_inactive">
            Калории, ккал
          </h4>
          <p className="text text_type_digits-default text_color_inactive">
            {calories}
          </p>
        </li>
        <li>
          <h4 className="text text_type_main-default text_color_inactive">
            Белки, г
          </h4>
          <p className="text text_type_digits-default text_color_inactive">
            {proteins}
          </p>
        </li>
        <li>
          <h4 className="text text_type_main-default text_color_inactive">
            Жиры, г
          </h4>
          <p className="text text_type_digits-default text_color_inactive">
            {fat}
          </p>
        </li>
        <li>
          <h4 className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </h4>
          <p className="text text_type_digits-default text_color_inactive">
            {carbohydrates}
          </p>
        </li>
      </ul>
    </>
  );
};

export default IngredientDetails;
