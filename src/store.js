import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import cartReducer from './reducers/cartSlice';

const root = combineReducers({ cart: cartReducer });

const store = createStore(root, composeWithDevTools(applyMiddleware(thunk)));

export default store;
