import { useEffect, useState } from 'react';
import AppHeader from '../AppHeader/AppHeader.js';
import Modal from '../Modal/Modal.js';
import IngredientDetails from '../IngredientDetails/IngredientDetails.js';
import OrderDetails from '../OrderDetails/OrderDetails.js';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  ADD_INGREDIENT_INFO,
  checkout,
  getIngredients,
  REMOVE_INGREDIENT_INFO,
} from '../../services/actions/index.js';
import {
  ForgotPassword,
  Home,
  Login,
  Register,
  NotFound,
  ResetPassword,
} from '../../pages/';

export default function App() {
  const { orderNumber, checkoutRequest, checkoutRequestFailed } = useSelector(
    (store) => store.order
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIngredientModal, setisIngredientModal] = useState(false);

  function handleIngredientClick(ingredient) {
    dispatch({ type: ADD_INGREDIENT_INFO, ingredient });
    setisIngredientModal(true);
    setIsModalOpen(true);
  }

  function handleCheckout(data) {
    setisIngredientModal(false);
    setIsModalOpen(true);
    dispatch(checkout(data));
  }

  function closeModal() {
    dispatch({ type: REMOVE_INGREDIENT_INFO });
    setIsModalOpen(false);
  }

  return (
    <Router>
      <AppHeader />

      <Switch>
        <Route path="/" exact>
          <Home
            handleIngredientClick={handleIngredientClick}
            handleCheckout={handleCheckout}
          />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Route path="/forgot-password" exact>
          <ForgotPassword />
        </Route>
        <Route path="/reset" exact>
          <ResetPassword />
        </Route>
        <Route path="/profile" exact>
          <Home
            handleIngredientClick={handleIngredientClick}
            handleCheckout={handleCheckout}
          />
        </Route>
        <Route path="/ingredients/:id" exact>
          <Home
            handleIngredientClick={handleIngredientClick}
            handleCheckout={handleCheckout}
          />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>

      <div style={{ overflow: 'hidden' }}>
        {isModalOpen &&
          (isIngredientModal ? (
            <Modal
              closeModal={closeModal}
              title={isIngredientModal && 'Детали ингредиента'}
            >
              <IngredientDetails />
            </Modal>
          ) : (
            <Modal closeModal={closeModal}>
              <OrderDetails
                orderNumber={orderNumber}
                isOrdering={checkoutRequest}
                isOrderFailed={checkoutRequestFailed}
              />
            </Modal>
          ))}
      </div>
    </Router>
  );
}
