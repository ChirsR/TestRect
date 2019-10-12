import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer/index';

const initialState = {};
const middleware = [thunk];

const enhancers = [];

if (process.env.NODE_ENV === 'development') {
  enhancers.push(window.devToolsExtension ? window.devToolsExtension() : f => f);
}


const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middleware), ...enhancers),
);

export default store;
