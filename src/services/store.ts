import thunk from 'redux-thunk';
import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers/index';
import { socketMiddleware } from './middleware/socketMiddleware';
import { WS_URL } from '../utils/constants';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(WS_URL)));
export default createStore(rootReducer, enhancer);
