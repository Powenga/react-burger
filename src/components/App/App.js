import { useEffect, useState } from 'react';
import AppHeader from '../AppHeader/AppHeader.js';
import Modal from '../Modal/Modal.js';
import IngredientDetails from '../IngredientDetails/IngredientDetails.js';
import OrderDetails from '../OrderDetails/OrderDetails.js';
import { useDispatch, useSelector } from 'react-redux';
import {
  Switch,
  Route,
  useLocation,
  useHistory,
} from 'react-router-dom';
import {
  ADD_INGREDIENT_INFO,
  checkout,
  getIngredients,
  REMOVE_INGREDIENT_INFO,
} from '../../services/actions/index.js';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute.js';
import { getUser } from '../../services/actions/user';
import {
  ForgotPassword,
  Home,
  Login,
  Register,
  NotFound,
  ResetPassword,
  Ingredient,
  Profile,
} from '../../pages/';

export default function App() {
  const { orderNumber, checkoutRequest, checkoutRequestFailed } = useSelector(
    (store) => store.order
  );
  const currentIngredient = useSelector((store) => store.currentIngredient);
  const { isLoggedIn } = useSelector((store) => store.user);
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

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
    if (!isLoggedIn) {
      history.push({ pathname: '/login', state: { from: location } });
    } else {
      setisIngredientModal(false);
      setIsModalOpen(true);
      dispatch(checkout(data));
    }
  }

  function closeModal() {
    dispatch({ type: REMOVE_INGREDIENT_INFO });
    setIsModalOpen(false);
  }

  return (
    <>
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
        <Route path="/reset-password" exact>
          <ResetPassword />
        </Route>
        <ProtectedRoute path="/profile" exact>
          <Profile />
        </ProtectedRoute>
        <Route path="/ingredients/:id" exact>
          <Ingredient />
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
              <IngredientDetails ingredient={currentIngredient} />
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
    </>
  );
}
