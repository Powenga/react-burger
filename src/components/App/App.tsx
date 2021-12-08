import { FC, useEffect, useState,  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { checkout, getIngredients } from '../../services/actions/index.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';
import AppHeader from '../AppHeader/AppHeader.js';
import Modal from '../Modal/Modal.js';
import ModalOverlay from '../ModalOverlay/ModalOverlay.js';
import Preloader from '../Preloader/Preloader.js';
import IngredientDetails from '../IngredientDetails/IngredientDetails.js';
import OrderDetails from '../OrderDetails/OrderDetails.js';
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
} from '../../pages';
import { TIngredient, TLocationState } from '../../utils/types.js';

const App: FC = () => {
  // @ts-ignore
  const { orderNumber, checkoutRequest } = useSelector((store) => store.order);
  // @ts-ignore
  const { isLoggedIn, userRequest } = useSelector((store) => store.user);
  const location = useLocation<TLocationState>();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleIngredientClick(ingredient: TIngredient) {
    history.push({
      pathname: `/ingredients/${ingredient._id}`,
      state: { background: { pathname: '/' } },
    });
  }

  function handleCheckout(data: { ingredients: TIngredient[]}) {
    if (!isLoggedIn) {
      history.push({ pathname: '/login', state: { from: location } });
    } else {
      dispatch(
        checkout(data, () => {
          setIsModalOpen(true);
        })
      );
    }
  }

  function closeIngredientModal() {
    history.push('/');
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <AppHeader />
      <Switch location={location.state?.background ?? location}>
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
        <ProtectedRoute path="/profile">
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
        <Route
          path="/ingredients/:id"
          exact
          render={
             ({ location }) => {
               //@ts-ignore
              if (location.state?.background)
                return (
                  <Modal
                    closeModal={closeIngredientModal}
                    title="Детали ингредиента"
                  >
                    <IngredientDetails />
                  </Modal>
                );
            }
        }
        />
        {isModalOpen && (
          <Modal closeModal={closeModal}>
            <OrderDetails orderNumber={orderNumber} />
          </Modal>
        )}
        {(checkoutRequest || userRequest) && (
          <>
            <ModalOverlay closeModal={() => {}} />
            <Preloader />
          </>
        )}
      </div>
    </>
  );
}

export default App;