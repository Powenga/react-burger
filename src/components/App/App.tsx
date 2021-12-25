import { FC, ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../hooks';
import {
  Switch,
  Route,
  useLocation,
  useHistory,
  RouteComponentProps,
} from 'react-router-dom';
import { checkout, getIngredients } from '../../services/actions/index';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AppHeader from '../AppHeader/AppHeader';
import Modal from '../Modal/Modal';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import Preloader from '../Preloader/Preloader';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
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
import { TIngredient, TLocationState, TOrder } from '../../utils/types.js';
import Feed from '../../pages/feed';
import OrderData from '../OrderData/OrderData';

const App: FC = () => {
  const { orderNumber, checkoutRequest } = useSelector((store) => store.order);
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

  function handleIngredientClick(ingredient: TIngredient): void {
    history.push({
      pathname: `/ingredients/${ingredient._id}`,
      state: { background: { pathname: location.pathname } },
    });
  }

  function handleOrderClick(order: TOrder): void {
    history.push({
      pathname: `${location.pathname}/${order._id}`,
      state: { background: { pathname: location.pathname } },
    });
  }

  function handleCheckout(data: { ingredients: string[] }): void {
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
    history.push({
      pathname: location.state?.background?.pathname,
    });
  }

  function closeModal(): void {
    setIsModalOpen(false);
  }

  return (
    <>
      <AppHeader />
      <Switch
        location={
          location.state?.background && history.action !== 'POP'
            ? location.state?.background
            : location
        }
      >
        <Route path="/" exact>
          <Home
            handleIngredientClick={handleIngredientClick}
            handleCheckout={handleCheckout}
          />
        </Route>
        <Route path="/feed">
          <Feed handleOrderClick={handleOrderClick} />
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
          <Profile handleOrderClick={handleOrderClick} />
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
          render={(
            props: RouteComponentProps<
              {
                id: string;
              },
              any,
              any
            >
          ): ReactNode => {
            if (
              props.location?.state?.background &&
              props.history.action !== 'POP'
            )
              return (
                <Modal
                  closeModal={closeIngredientModal}
                  title="Детали ингредиента"
                >
                  <IngredientDetails />
                </Modal>
              );
          }}
        />
        <Route
          path={['/feed/:id', '/profile/orders/:id']}
          exact
          render={(
            props: RouteComponentProps<
              {
                id: string;
              },
              any,
              any
            >
          ) => {
            if (
              props.location?.state?.background &&
              props.history.action !== 'POP'
            ) {
              return (
                <Modal closeModal={closeIngredientModal} title="Детали заказа">
                  <OrderData />
                </Modal>
              );
            }
          }}
        ></Route>
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
};

export default App;
