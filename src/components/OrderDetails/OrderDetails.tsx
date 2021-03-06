import { FC } from 'react';
import imagePath from '../../images/order-done.svg';

type TOrderDetails = {
  orderNumber: string;
};

const OrderDetails: FC<TOrderDetails> = ({ orderNumber }) => {
  return (
    <>
      <h2
        className="text text_type_digits-large mb-8"
        style={{ textAlign: 'center' }}
      >
        {orderNumber}
      </h2>
      <p
        className="text text_type_main-medium mb-15"
        style={{ textAlign: 'center' }}
      >
        идентификатор заказа
      </p>
      <img
        src={imagePath}
        alt="Заказ принят"
        className="mb-15"
        style={{
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      />
      <p
        className="text text_type_main-default mb-2"
        style={{ textAlign: 'center' }}
      >
        Ваш заказ начали готовить
      </p>
      <p
        className="text text_type_main-default text_color_inactive mb-20"
        style={{ textAlign: 'center' }}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
};

export default OrderDetails;
